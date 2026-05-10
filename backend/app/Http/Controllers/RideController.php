<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class RideController extends Controller
{
    public function createRequest(Request $request)
    {
        $authUser = $request->attributes->get('auth_user');

        if ($authUser->role !== 'user') {
            return response()->json(['error' => 'غير مصرح بإنشاء طلب من هذا الحساب'], 403);
        }

        $request->validate([
            'from_address' => 'required|string|max:255',
            'to_address' => 'required|string|max:255',
            'from_lat' => 'required|numeric',
            'from_lng' => 'required|numeric',
            'to_lat' => 'required|numeric',
            'to_lng' => 'required|numeric',
            'suggested_price' => 'required|numeric|min:0',
            'route_distance_km' => 'nullable|numeric|min:0',
            'route_duration_minutes' => 'nullable|integer|min:0',
            'estimated_fare' => 'nullable|numeric|min:0',
        ]);

        $distanceKm = $request->input('route_distance_km', 0);
        $estimatedFare = $request->input('estimated_fare', max(25, round($distanceKm * 9 + 5)));

        $requestId = DB::table('ride_requests')->insertGetId([
            'user_id' => $authUser->id,
            'from_address' => $request->from_address,
            'to_address' => $request->to_address,
            'from_lat' => $request->from_lat,
            'from_lng' => $request->from_lng,
            'to_lat' => $request->to_lat,
            'to_lng' => $request->to_lng,
            'suggested_price' => $request->suggested_price,
            'route_distance_km' => $distanceKm,
            'route_duration_minutes' => $request->input('route_duration_minutes'),
            'estimated_fare' => $estimatedFare,
            'status' => 'waiting',
            'created_at' => now(),
            'updated_at' => now(),
        ]);

        return response()->json([
            'request_id' => $requestId,
            'message' => 'تم إنشاء الطلب',
            'estimated_price' => round($estimatedFare),
        ]);
    }

    public function getOffers($requestId)
    {
        $offers = DB::table('offers')
            ->join('users', 'offers.driver_id', '=', 'users.id')
            ->where('offers.request_id', $requestId)
            ->orderBy('offers.price')
            ->get([
                'offers.id',
                'offers.request_id',
                'offers.driver_id',
                'offers.price',
                'offers.status',
                'offers.created_at',
                'users.name as driver_name',
                'users.vehicle_number',
                'users.license_number',
            ]);

        return response()->json($offers);
    }

    public function createOffer(Request $request)
    {
        $authUser = $request->attributes->get('auth_user');

        if ($authUser->role !== 'driver' || $authUser->status !== 'approved') {
            return response()->json(['error' => 'غير مصرح بإرسال العرض'], 403);
        }

        $request->validate([
            'request_id' => 'required|integer|exists:ride_requests,id',
            'driver_id' => 'required|integer|exists:users,id',
            'price' => 'required|numeric|min:1',
        ]);

        $exists = DB::table('offers')
            ->where('request_id', $request->request_id)
            ->where('driver_id', $request->driver_id)
            ->exists();

        if ($exists) {
            return response()->json(['error' => 'عرض موجود بالفعل'], 409);
        }

        DB::table('offers')->insert([
            'request_id' => $request->request_id,
            'driver_id' => $request->driver_id,
            'price' => $request->price,
            'status' => 'pending',
            'created_at' => now(),
            'updated_at' => now(),
        ]);

        return response()->json(['message' => 'تم إرسال العرض']);
    }

    public function acceptOffer(Request $request)
    {
        $authUser = $request->attributes->get('auth_user');

        $request->validate([
            'offer_id' => 'required|integer|exists:offers,id',
        ]);

        $offer = DB::table('offers')->where('id', $request->offer_id)->first();

        if (!$offer) {
            return response()->json(['error' => 'العرض غير موجود'], 404);
        }

        $ride = DB::table('ride_requests')->where('id', $offer->request_id)->first();

        if (!$ride || $ride->user_id !== $authUser->id) {
            return response()->json(['error' => 'غير مصرح بقبول هذا العرض'], 403);
        }

        DB::table('offers')->where('request_id', $offer->request_id)->update(['status' => 'rejected']);
        DB::table('offers')->where('id', $offer->id)->update(['status' => 'accepted']);
        DB::table('ride_requests')->where('id', $offer->request_id)->update(['status' => 'accepted', 'driver_id' => $offer->driver_id]);

        return response()->json(['message' => 'تم اختيار السائق']);
    }

    public function driverRequests(Request $request)
    {
        $authUser = $request->attributes->get('auth_user');

        if ($authUser->role !== 'driver' || $authUser->status !== 'approved') {
            return response()->json(['error' => 'غير مصرح بعرض الطلبات'], 403);
        }

        $requests = DB::table('ride_requests')
            ->where('status', 'waiting')
            ->orderBy('created_at', 'asc')
            ->limit(20)
            ->get();

        if ($authUser->driver_lat && $authUser->driver_lng) {
            $requests->transform(function ($item) use ($authUser) {
                $item->distance = $this->calculateDistance($authUser->driver_lat, $authUser->driver_lng, $item->from_lat, $item->from_lng);
                return $item;
            });
        }

        return response()->json($requests);
    }

    public function updateLocation(Request $request)
    {
        $authUser = $request->attributes->get('auth_user');

        if ($authUser->role !== 'driver' || $authUser->status !== 'approved') {
            return response()->json(['error' => 'غير مصرح بتحديث الموقع'], 403);
        }

        $request->validate([
            'lat' => 'required|numeric',
            'lng' => 'required|numeric',
        ]);

        DB::table('users')->where('id', $authUser->id)->update([
            'driver_lat' => $request->lat,
            'driver_lng' => $request->lng,
            'updated_at' => now(),
        ]);

        return response()->json(['message' => 'تم تحديث الموقع']);
    }

    public function getRequest($id)
    {
        $ride = DB::table('ride_requests')->where('id', $id)->first();

        if (!$ride) {
            return response()->json(['error' => 'الطلب غير موجود'], 404);
        }

        return response()->json($ride);
    }

    public function finishRequest(Request $request)
    {
        $authUser = $request->attributes->get('auth_user');

        $request->validate([
            'request_id' => 'required|integer|exists:ride_requests,id',
        ]);

        $ride = DB::table('ride_requests')->where('id', $request->request_id)->first();

        if (!$ride || $ride->driver_id !== $authUser->id) {
            return response()->json(['error' => 'غير مصرح بإنهاء هذه الرحلة'], 403);
        }

        DB::table('ride_requests')->where('id', $request->request_id)->update(['status' => 'finished', 'updated_at' => now()]);

        return response()->json(['message' => 'تم إنهاء الرحلة']);
    }

    private function calculateDistance($lat1, $lng1, $lat2, $lng2)
    {
        $earthRadius = 6371;
        $latFrom = deg2rad($lat1);
        $lngFrom = deg2rad($lng1);
        $latTo = deg2rad($lat2);
        $lngTo = deg2rad($lng2);

        $latDelta = $latTo - $latFrom;
        $lngDelta = $lngTo - $lngFrom;

        $angle = 2 * asin(sqrt(pow(sin($latDelta / 2), 2) + cos($latFrom) * cos($latTo) * pow(sin($lngDelta / 2), 2)));

        return round($earthRadius * $angle, 1);
    }
}
