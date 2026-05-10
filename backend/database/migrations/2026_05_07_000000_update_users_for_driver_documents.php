<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        DB::statement("ALTER TABLE users MODIFY role ENUM('user','driver','admin') NOT NULL DEFAULT 'user'");

        Schema::table('users', function (Blueprint $table) {
            $table->enum('status', ['pending', 'approved', 'rejected'])->default('approved')->after('role');
            $table->string('address')->nullable()->after('status');
            $table->string('vehicle_number', 50)->nullable()->after('address');
            $table->string('license_number', 80)->nullable()->after('vehicle_number');
            $table->string('document_front')->nullable()->after('license_number');
            $table->string('document_back')->nullable()->after('document_front');
            $table->string('toktok_photo')->nullable()->after('document_back');
            $table->double('driver_lat')->nullable()->after('toktok_photo');
            $table->double('driver_lng')->nullable()->after('driver_lat');
            $table->timestamp('approved_at')->nullable()->after('driver_lng');
        });

        if (!DB::table('users')->where('phone', '01000000000')->exists()) {
            DB::table('users')->insert([
                'name' => 'Admin Toktok',
                'phone' => '01000000000',
                'password' => Hash::make('admin123'),
                'role' => 'admin',
                'status' => 'approved',
                'api_token' => Str::random(60),
                'created_at' => now(),
                'updated_at' => now(),
                'approved_at' => now(),
            ]);
        }
    }

    public function down(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $table->dropColumn(['status', 'address', 'vehicle_number', 'license_number', 'document_front', 'document_back', 'toktok_photo', 'driver_lat', 'driver_lng', 'approved_at']);
        });

        DB::statement("ALTER TABLE users MODIFY role ENUM('user','driver') NOT NULL DEFAULT 'user'");

        DB::table('users')->where('phone', '01000000000')->delete();
    }
};
