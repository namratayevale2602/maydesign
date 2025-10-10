<?php
// routes/api.php

use App\Http\Controllers\Api\BlogController;
use Illuminate\Support\Facades\Route;

Route::prefix('api')->group(function () {
    Route::get('/blogs', [BlogController::class, 'index']);
    Route::get('/blogs/categories', [BlogController::class, 'categories']);
    Route::get('/blogs/{slug}', [BlogController::class, 'show']);
    Route::get('/blogs/{slug}/recent', [BlogController::class, 'recentPosts']);
});