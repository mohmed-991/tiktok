<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;

class EnsureRole
{
    public function handle(Request $request, Closure $next, string $role)
    {
        $user = $request->get('auth_user');

        if (!$user || $user->role !== $role) {
            return response()->json(['error' => 'ليس لديك صلاحية الوصول'], 403);
        }

        return $next($request);
    }
}
