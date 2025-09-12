<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\DudiController;

Route::post('/login', [AuthController::class, 'login']);
Route::post('/register', [AuthController::class, 'register']);

Route::middleware('auth:sanctum')->group(function () {
    Route::post('verify-token', [AuthController::class, 'verifyToken']);
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::get('/user', function (Request $request) {
        return response()->json([
            'user' => $request->user(),
        ]);
            
    });
    Route::get('/dashboard', [DashboardController::class, 'index']);

    Route::apiResource('/dudi', DudiController::class);
    // Route::get('/dudi', [DudiController::class, 'index']);
});