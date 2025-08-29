<?php

use App\Http\Controllers\API\AuthController;
use App\Http\Controllers\API\UserController;
use Illuminate\Support\Facades\Route;

Route::prefix('/public')->group(function () {
    Route::prefix('/auth')->group(function () {
        Route::post('/login', [AuthController::class, 'login']);
        Route::post('/logout', [AuthController::class, 'logout']);
        Route::post('/verify', [AuthController::class, 'verify']);
        Route::post('/register', [UserController::class, 'store']);
    });
});

Route::middleware(['authenticate'])->prefix('/private')->group(function () {
    Route::apiResource('user', UserController::class);

    Route::prefix('/manage')->group(function () {});
});
