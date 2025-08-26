<?php

use Illuminate\Support\Facades\Route;

// Exclude API routes from the wildcard route
Route::get('/{any}', function () {
    return view('app');
})->where("any", "^(?!api|public).*$");