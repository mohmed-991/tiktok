<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class AdminController extends Controller
{
    public function pendingAccounts(Request $request)
    {
        $authUser = $request->attributes->get('auth_user');

        if ($authUser->role !== 'admin') {
            return response()->json(['error' => 'غير مصرح بالوصول'], 403);
        }

        $accounts = DB::table('users')
            ->where('status', 'pending')
            ->orderBy('created_at', 'asc')
            ->get([
                'id',
                'name',
                'phone',
                'role',
                'address',
                'vehicle_number',
                'license_number',
                'document_front',
                'document_back',
                'toktok_photo',
                'created_at',
            ]);

        return response()->json($accounts);
    }

    public function approveAccount(Request $request)
    {
        $authUser = $request->attributes->get('auth_user');

        if ($authUser->role !== 'admin') {
            return response()->json(['error' => 'غير مصرح بالوصول'], 403);
        }

        $request->validate([
            'account_id' => 'required|integer|exists:users,id',
        ]);

        $account = DB::table('users')->where('id', $request->account_id)->first();

        if (!$account) {
            return response()->json(['error' => 'الحساب غير موجود'], 404);
        }

        DB::table('users')->where('id', $request->account_id)->update([
            'status' => 'approved',
            'approved_at' => now(),
            'updated_at' => now(),
        ]);

        return response()->json(['message' => 'تم تفعيل الحساب وسيتم إرسال إشعار للمستخدم بعد المراجعة']);
    }
}
