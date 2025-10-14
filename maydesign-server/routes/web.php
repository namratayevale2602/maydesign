<?php
// routes/api.php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\BlogController;
use App\Http\Controllers\Api\HeroProjectController;
use App\Http\Controllers\Api\StatController;
use App\Http\Controllers\Api\AboutSectionController;
use App\Http\Controllers\Api\TestimonialController;


Route::prefix('api')->group(function () {
    Route::get('/blogs', [BlogController::class, 'index']);
    Route::get('/blogs/categories', [BlogController::class, 'categories']);
    Route::get('/blogs/{slug}', [BlogController::class, 'show']);
    Route::get('/blogs/{slug}/recent', [BlogController::class, 'recentPosts']);
    Route::get('/hero-projects', [HeroProjectController::class, 'index']);
    Route::get('/hero-projects/{heroProject}', [HeroProjectController::class, 'show']);
    Route::get('/stats', [StatController::class, 'index']);
    Route::get('/stats/{stat}', [StatController::class, 'show']);
    Route::get('/about-section', [AboutSectionController::class, 'index']);

    Route::get('/testimonials', [TestimonialController::class, 'index']);
    Route::get('/featured', [TestimonialController::class, 'featured']);
});