<?php
// routes/api.php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::prefix('v1')->group(function () {
    // Contact routes
    Route::post('/createcontact', [App\Http\Controllers\Api\ContactController::class, 'store']);
    Route::get('/contact', [App\Http\Controllers\Api\ContactController::class, 'index']);
});