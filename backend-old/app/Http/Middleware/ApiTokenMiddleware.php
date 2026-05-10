<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class ApiTokenMiddleware
{
    public function handle(Request $request, Closure $next)
    {
        $authorization = $request->header('Authorization');

        if (!$authorization || !str_starts_with($authorization, 'Bearer ')) {
            return response()->json(['error' => 'توكن غير صالح'], 401);
        }

        $token = substr($authorization, 7);
        $user = DB::table('users')->where('api_token', $token)->first();

        if (!$user) {
            return response()->json(['error' => 'توكن غير صالح'], 401);
        }

        $request->attributes->set('auth_user', $user);
        return $next($request);
    }
}
