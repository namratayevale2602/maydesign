<?php
// routes/api.php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\BlogController;
use App\Http\Controllers\Api\HeroProjectController;
use App\Http\Controllers\Api\StatController;
use App\Http\Controllers\Api\AboutSectionController;
use App\Http\Controllers\Api\TestimonialController;
use App\Http\Controllers\Api\PressController;
use App\Http\Controllers\Api\AwardController;
use App\Http\Controllers\Api\ProjectController;
use App\Http\Controllers\Api\AboutUsController;


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
    Route::get('/press', [PressController::class, 'index']);
    Route::get('/press/featured', [PressController::class, 'featured']);
    Route::get('/press/{id}', [PressController::class, 'show']);
    Route::get('/awards', [AwardController::class, 'index']);
    Route::get('/awards/featured', [AwardController::class, 'featured']);
    Route::get('/awards/years', [AwardController::class, 'years']);
    Route::get('/awards/{id}', [AwardController::class, 'show']);
   // Projects routes
    Route::get('/projects', [ProjectController::class, 'index']);
    Route::get('/projects/featured', [ProjectController::class, 'featured']);
    Route::get('/projects/categories', [ProjectController::class, 'categories']);
    Route::get('/projects/years', [ProjectController::class, 'years']);
    Route::get('/projects/{id}', [ProjectController::class, 'show']);
    Route::get('/projects/slug/{slug}', [ProjectController::class, 'showBySlug']);
    Route::get('/projects/{id}/similar', [ProjectController::class, 'similar']);
    Route::get('/projects/category/{category}', [ProjectController::class, 'byCategory']);
    Route::get('/projects/stats', [ProjectController::class, 'stats']);
    
    Route::get('about-us/mission-vision', [AboutUsController::class, 'missionVision']);
    Route::get('about-us/team', [AboutUsController::class, 'team']);
    Route::get('about-us/values', [AboutUsController::class, 'values']);
    Route::get('about-us/timeline', [AboutUsController::class, 'timeline']);
    Route::get('about-us/all', [AboutUsController::class, 'allSections']);

});