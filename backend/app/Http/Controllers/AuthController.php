<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

class AuthController extends Controller
{
    public function register(Request $request)
    {
        $rules = [
            'name' => 'required|string|max:100',
            'phone' => 'required|string|max:20|unique:users,phone',
            'password' => 'required|string|min:6',
            'role' => 'required|in:user,driver',
        ];

        if ($request->input('role') === 'driver') {
            $rules = array_merge($rules, [
                'vehicle_number' => 'required|string|max:50',
                'license_number' => 'required|string|max:80',
                'driver_address' => 'required|string|max:255',
                'document_front' => 'required|file|image|max:5120',
                'document_back' => 'required|file|image|max:5120',
                'toktok_photo' => 'required|file|image|max:5120',
            ]);
        }

        $validated = $request->validate($rules);
        $status = 'pending';

        $documentFront = $request->hasFile('document_front') ? $request->file('document_front')->store('driver_docs', 'public') : null;
        $documentBack = $request->hasFile('document_back') ? $request->file('document_back')->store('driver_docs', 'public') : null;
        $toktokPhoto = $request->hasFile('toktok_photo') ? $request->file('toktok_photo')->store('driver_docs', 'public') : null;

        $id = DB::table('users')->insertGetId([
            'name' => $validated['name'],
            'phone' => $validated['phone'],
            'password' => Hash::make($validated['password']),
            'role' => $validated['role'],
            'status' => $status,
            'address' => $validated['role'] === 'driver' ? $validated['driver_address'] : null,
            'vehicle_number' => $validated['role'] === 'driver' ? $validated['vehicle_number'] : null,
            'license_number' => $validated['role'] === 'driver' ? $validated['license_number'] : null,
            'document_front' => $documentFront,
            'document_back' => $documentBack,
            'toktok_photo' => $toktokPhoto,
            'api_token' => Str::random(60),
            'created_at' => now(),
            'updated_at' => now(),
            'approved_at' => null,
        ]);

        $user = DB::table('users')->where('id', $id)->first();

        return response()->json([
            'id' => $user->id,
            'name' => $user->name,
            'role' => $user->role,
            'status' => $user->status,
            'api_token' => $user->api_token,
            'message' => 'تم استقبال بياناتك وسيتم مراجعتها من الإدارة، وسنرسل لك رسالة تأكيد بعد المراجعة.',
        ]);
    }

    public function login(Request $request)
    {
        $request->validate([
            'phone' => 'required|string|max:20',
            'password' => 'required|string',
        ]);

        $user = DB::table('users')->where('phone', $request->phone)->first();

        if (!$user || !Hash::check($request->password, $user->password)) {
            return response()->json(['error' => 'رقم الموبايل أو كلمة المرور غير صحيحة'], 401);
        }

        if ($user->status !== 'approved') {
            return response()->json([
                'id' => $user->id,
                'name' => $user->name,
                'role' => $user->role,
                'status' => $user->status,
                'api_token' => $user->api_token,
                'message' => 'حسابك تحت المراجعة. سوف يتم تفعيله حال الموافقة من الإدارة.',
            ]);
        }

        return response()->json([
            'id' => $user->id,
            'name' => $user->name,
            'role' => $user->role,
            'status' => $user->status,
            'api_token' => $user->api_token,
            'driver_lat' => $user->driver_lat,
            'driver_lng' => $user->driver_lng,
        ]);
    }
}
