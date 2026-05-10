<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\RideController;
use App\Http\Controllers\AdminController;
use App\Http\Controllers\LocationController;

Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);
Route::post('/location/calculate-fare', [LocationController::class, 'calculateFare']);

Route::middleware(['api_token'])->group(function () {
    Route::post('/request', [RideController::class, 'createRequest']);
    Route::get('/offers/{requestId}', [RideController::class, 'getOffers']);
    Route::post('/offer', [RideController::class, 'createOffer']);
    Route::post('/accept-offer', [RideController::class, 'acceptOffer']);
    Route::get('/driver/requests', [RideController::class, 'driverRequests']);
    Route::post('/driver/location', [RideController::class, 'updateLocation']);
    Route::post('/request/finish', [RideController::class, 'finishRequest']);
    Route::get('/request/{id}', [RideController::class, 'getRequest']);

    Route::get('/admin/pending-accounts', [AdminController::class, 'pendingAccounts']);
    Route::post('/admin/approve-account', [AdminController::class, 'approveAccount']);
});
