<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('ride_requests', function (Blueprint $table) {
            $table->decimal('route_distance_km', 8, 2)->nullable()->after('suggested_price');
            $table->integer('route_duration_minutes')->nullable()->after('route_distance_km');
            $table->decimal('estimated_fare', 10, 2)->nullable()->after('route_duration_minutes');
            $table->string('route_polyline', 5000)->nullable()->after('estimated_fare');
            $table->text('directions_json')->nullable()->after('route_polyline');
        });
    }

    public function down(): void
    {
        Schema::table('ride_requests', function (Blueprint $table) {
            $table->dropColumn([
                'route_distance_km',
                'route_duration_minutes',
                'estimated_fare',
                'route_polyline',
                'directions_json',
            ]);
        });
    }
};
