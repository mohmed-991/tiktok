<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class LocationController extends Controller
{
    const BASE_PRICE = 25;
    const PRICE_PER_KM = 9;
    const PRICE_PER_MINUTE = 0.5;

    public function calculateFare(Request $request)
    {
        $request->validate([
            'distance_km' => 'required|numeric|min:0',
            'duration_minutes' => 'required|integer|min:0',
        ]);

        $distanceKm = $request->distance_km;
        $durationMinutes = $request->duration_minutes;

        $distanceFare = $distanceKm * self::PRICE_PER_KM;
        $durationFare = $durationMinutes * self::PRICE_PER_MINUTE;
        $baseFare = self::BASE_PRICE;

        $totalFare = max(self::BASE_PRICE, round($baseFare + $distanceFare + $durationFare, 2));

        return response()->json([
            'base_fare' => self::BASE_PRICE,
            'distance_fare' => round($distanceFare, 2),
            'duration_fare' => round($durationFare, 2),
            'total_fare' => $totalFare,
            'currency' => 'EGP',
        ]);
    }
}
