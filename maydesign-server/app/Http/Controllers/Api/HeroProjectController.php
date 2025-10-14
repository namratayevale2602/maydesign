<?php
// app/Http/Controllers/Api/HeroProjectController.php

namespace App\Http\Controllers\Api;

use App\Models\HeroProject;
use App\Http\Controllers\Controller;
use Illuminate\Http\JsonResponse;

class HeroProjectController extends Controller
{
    public function index(): JsonResponse
    {
        $projects = HeroProject::active()
            ->ordered()
            ->get()
            ->map(function ($project) {
                return [
                    'id' => $project->id,
                    'title' => $project->title,
                    'subtitle' => $project->subtitle,
                    'description' => $project->description,
                    'image' => asset('uploads/' . $project->image),
                    'thumbnail' => asset('uploads/' . $project->thumbnail),
                    'service' => $project->service,
                    'year' => $project->year,
                    'order' => $project->order,
                ];
            });

        return response()->json([
            'success' => true,
            'data' => $projects,
            'message' => 'Hero projects retrieved successfully'
        ]);
    }

    public function show(HeroProject $heroProject): JsonResponse
    {
        return response()->json([
            'success' => true,
            'data' => [
                'id' => $heroProject->id,
                'title' => $heroProject->title,
                'subtitle' => $heroProject->subtitle,
                'description' => $heroProject->description,
                'image' => asset('uploads/' . $heroProject->image),
                'thumbnail' => asset('uploads/' . $heroProject->thumbnail),
                'service' => $heroProject->service,
                'year' => $heroProject->year,
            ],
            'message' => 'Hero project retrieved successfully'
        ]);
    }
}