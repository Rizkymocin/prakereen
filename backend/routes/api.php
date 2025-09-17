<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\DudiController;
use App\Http\Controllers\LogbookController;
use App\Http\Controllers\MagangController;
use App\Http\Controllers\SiswaController;

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
    Route::get('/dudi/with-magang', [DudiController::class, 'getWithMagang']);
    Route::apiResource('/magang', MagangController::class);
    Route::apiResource('/logbook', LogbookController::class);
    Route::get('siswa', [SiswaController::class, 'index']);
    Route::get('siswa_by_user/{id}', [SiswaController::class, 'getByUser']);
    Route::get('siswa/magang', [SiswaController::class, 'getMagang']);
    Route::post('siswa/daftar-dudi', [SiswaController::class, 'daftarDudi']);
    // Route::get('/dudi', [DudiController::class, 'index']);
});