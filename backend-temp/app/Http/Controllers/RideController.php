<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class RideController extends Controller
{
    public function createRequest(Request $request)
    {
        $request->validate([
            'user_id' => 'required|integer|exists:users,id',
            'from_lat' => 'required|numeric',
            'from_lng' => 'required|numeric',
            'to_lat' => 'required|numeric',
            'to_lng' => 'required|numeric',
        ]);

        $requestId = DB::table('ride_requests')->insertGetId([
            'user_id' => $request->user_id,
            'from_lat' => $request->from_lat,
            'from_lng' => $request->from_lng,
            'to_lat' => $request->to_lat,
            'to_lng' => $request->to_lng,
            'status' => 'waiting',
            'created_at' => now(),
            'updated_at' => now(),
        ]);

        return response()->json(['request_id' => $requestId, 'message' => 'تم إنشاء الطلب']);
    }

    public function getOffers($requestId)
    {
        $offers = DB::table('offers')
            ->where('request_id', $requestId)
            ->orderBy('price')
            ->get();

        return response()->json($offers);
    }

    public function createOffer(Request $request)
    {
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
        $request->validate([
            'offer_id' => 'required|integer|exists:offers,id',
        ]);

        $offer = DB::table('offers')->where('id', $request->offer_id)->first();

        if (!$offer) {
            return response()->json(['error' => 'العرض غير موجود'], 404);
        }

        DB::table('offers')->where('request_id', $offer->request_id)->update(['status' => 'rejected']);
        DB::table('offers')->where('id', $offer->id)->update(['status' => 'accepted']);
        DB::table('ride_requests')->where('id', $offer->request_id)->update(['status' => 'accepted', 'driver_id' => $offer->driver_id]);

        return response()->json(['message' => 'تم اختيار السائق']);
    }

    public function driverRequests(Request $request)
    {
        $requests = DB::table('ride_requests')
            ->where('status', 'waiting')
            ->orderBy('created_at', 'asc')
            ->limit(20)
            ->get();

        return response()->json($requests);
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
        $request->validate([
            'request_id' => 'required|integer|exists:ride_requests,id',
        ]);

        DB::table('ride_requests')->where('id', $request->request_id)->update(['status' => 'finished', 'updated_at' => now()]);

        return response()->json(['message' => 'تم إنهاء الرحلة']);
    }
}
