<?php

use App\Http\Controllers\API\AuthController;
use Illuminate\Support\Facades\Route;

Route::prefix('/public')->group(function(){
    Route::prefix('/auth')->group(function(){
       Route::post('/login', [AuthController::class, 'login']);
       Route::post('/logout', [AuthController::class, 'logout']);
       Route::post('/verify', [AuthController::class, 'verify']);
       Route::post('/register', [AuthController::class, 'register']);
    });
});

Route::middleware(['authenticate'])->prefix('/private')->group(function(){
   Route::prefix('/user')->group(function(){
        
   }); 
   
   Route::prefix('/manage')->group(function(){
    
   });
});