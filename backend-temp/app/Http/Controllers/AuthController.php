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
        $request->validate([
            'name' => 'required|string|max:100',
            'phone' => 'required|string|max:20|unique:users,phone',
            'password' => 'required|string|min:6',
            'role' => 'required|in:user,driver',
        ]);

        $id = DB::table('users')->insertGetId([
            'name' => $request->name,
            'phone' => $request->phone,
            'password' => Hash::make($request->password),
            'role' => $request->role,
            'api_token' => Str::random(60),
            'created_at' => now(),
            'updated_at' => now(),
        ]);

        return response()->json(['id' => $id, 'api_token' => DB::table('users')->where('id', $id)->value('api_token')]);
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

        return response()->json([
            'id' => $user->id,
            'name' => $user->name,
            'role' => $user->role,
            'api_token' => $user->api_token,
        ]);
    }
}
