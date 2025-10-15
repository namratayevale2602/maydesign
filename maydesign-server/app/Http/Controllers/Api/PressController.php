<?php
// app/Http/Controllers/Api/PressController.php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\PressArticle;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class PressController extends Controller
{
    public function index(Request $request): JsonResponse
    {
        try {
            $pressArticles = PressArticle::active()
                ->latestFirst()
                ->get()
                ->map(function ($article) {
                    return [
                        'id' => $article->id,
                        'publication' => $article->publication,
                        'title' => $article->title,
                        'date' => $article->date->format('F Y'),
                        'excerpt' => $article->excerpt,
                        'image' => $article->image ? asset($article->image) : null,
                        'category' => $article->category,
                        'featured' => (bool) $article->featured,
                        'details' => [
                            'fullArticle' => $article->full_article,
                            'publicationDetails' => $article->publication_details ?? [],
                            'keyQuotes' => $article->key_quotes ?? [],
                            'projectTeam' => $article->project_team ?? [],
                            'additionalImages' => collect($article->additional_images ?? [])
                                ->map(fn($image) => asset($image))
                                ->toArray(),
                            'videoInterview' => $article->video_interview,
                        ],
                    ];
                });

            return response()->json([
                'success' => true,
                'data' => $pressArticles,
                'message' => 'Press articles retrieved successfully.',
            ]);

        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to retrieve press articles.',
                'error' => config('app.debug') ? $e->getMessage() : null,
            ], 500);
        }
    }

    public function show($id): JsonResponse
    {
        try {
            $article = PressArticle::active()->findOrFail($id);

            $data = [
                'id' => $article->id,
                'publication' => $article->publication,
                'title' => $article->title,
                'date' => $article->date->format('F Y'),
                'excerpt' => $article->excerpt,
                'image' => $article->image ? asset($article->image) : null,
                'category' => $article->category,
                'featured' => (bool) $article->featured,
                'details' => [
                    'fullArticle' => $article->full_article,
                    'publicationDetails' => $article->publication_details ?? [],
                    'keyQuotes' => $article->key_quotes ?? [],
                    'projectTeam' => $article->project_team ?? [],
                    'additionalImages' => collect($article->additional_images ?? [])
                        ->map(fn($image) => asset($image))
                        ->toArray(),
                    'videoInterview' => $article->video_interview,
                ],
            ];

            return response()->json([
                'success' => true,
                'data' => $data,
                'message' => 'Press article retrieved successfully.',
            ]);

        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Press article not found.',
                'error' => config('app.debug') ? $e->getMessage() : null,
            ], 404);
        }
    }

    public function featured(): JsonResponse
    {
        try {
            $featuredArticles = PressArticle::active()
                ->featured()
                ->latestFirst()
                ->limit(3)
                ->get()
                ->map(function ($article) {
                    return [
                        'id' => $article->id,
                        'publication' => $article->publication,
                        'title' => $article->title,
                        'date' => $article->date->format('F Y'),
                        'excerpt' => $article->excerpt,
                        'image' => $article->image ? asset($article->image) : null,
                        'category' => $article->category,
                        'featured' => (bool) $article->featured,
                    ];
                });

            return response()->json([
                'success' => true,
                'data' => $featuredArticles,
                'message' => 'Featured press articles retrieved successfully.',
            ]);

        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to retrieve featured press articles.',
                'error' => config('app.debug') ? $e->getMessage() : null,
            ], 500);
        }
    }
}