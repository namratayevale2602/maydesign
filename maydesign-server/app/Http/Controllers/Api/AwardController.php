<?php
// app/Http/Controllers/Api/AwardController.php

namespace App\Http\Controllers\Api;

use App\Models\Award;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class AwardController extends Controller
{
    public function index(Request $request)
    {
        try {
            $year = $request->get('year', 'all');
            
            $awards = Award::active()
                ->byYear($year)
                ->ordered()
                ->get()
                ->map(function ($award) {
                    return $this->transformAward($award);
                });

            return response()->json([
                'success' => true,
                'data' => $awards,
                'message' => 'Awards retrieved successfully'
            ]);

        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to retrieve awards',
                'error' => config('app.debug') ? $e->getMessage() : null
            ], 500);
        }
    }

    public function featured()
    {
        try {
            $featuredAwards = Award::active()
                ->featured()
                ->ordered()
                ->get()
                ->map(function ($award) {
                    return $this->transformAward($award);
                });

            return response()->json([
                'success' => true,
                'data' => $featuredAwards,
                'message' => 'Featured awards retrieved successfully'
            ]);

        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to retrieve featured awards',
                'error' => config('app.debug') ? $e->getMessage() : null
            ], 500);
        }
    }

    public function show($id)
    {
        try {
            $award = Award::active()->findOrFail($id);

            return response()->json([
                'success' => true,
                'data' => $this->transformAward($award),
                'message' => 'Award retrieved successfully'
            ]);

        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Award not found',
                'error' => config('app.debug') ? $e->getMessage() : null
            ], 404);
        }
    }

    public function years()
    {
        try {
            $years = Award::active()
                ->select('year')
                ->distinct()
                ->orderBy('year', 'desc')
                ->pluck('year');

            return response()->json([
                'success' => true,
                'data' => $years,
                'message' => 'Award years retrieved successfully'
            ]);

        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to retrieve award years',
                'error' => config('app.debug') ? $e->getMessage() : null
            ], 500);
        }
    }

    private function transformAward(Award $award): array
    {
        return [
            'id' => $award->id,
            'title' => $award->title,
            'organization' => $award->organization,
            'year' => $award->year,
            'category' => $award->category,
            'description' => $award->description,
            'image' => $award->image ? asset('storage/' . $award->image) : null,
            'featured' => (bool)$award->featured,
            'details' => $award->details ?? [
                'fullDescription' => '',
                'projectTeam' => [],
                'location' => '',
                'completionDate' => '',
                'awardSignificance' => '',
            ],
            'photos' => collect($award->photos ?? [])->map(function ($photo) {
                return asset('storage/' . $photo);
            })->toArray(),
            'video' => $award->video,
            'created_at' => $award->created_at,
            'updated_at' => $award->updated_at,
        ];
    }
}