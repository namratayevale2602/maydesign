<?php
// app/Http/Controllers/API/ProjectController.php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Project;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class ProjectController extends Controller
{
    public function index(Request $request): JsonResponse
    {
        try {
            $category = $request->get('category', 'all');
            $subCategory = $request->get('sub_category', 'all');
            $type = $request->get('type', 'all');
            $style = $request->get('style', 'all');
            $search = $request->get('search');
            $sort = $request->get('sort', 'newest');
            $perPage = $request->get('per_page', 12);

            $projects = Project::published()
                ->byCategory($category)
                ->bySubCategory($subCategory)
                ->byType($type)
                ->byStyle($style)
                ->search($search)
                ->when($sort, function ($query, $sort) {
                    switch ($sort) {
                        case 'newest':
                            return $query->orderBy('year', 'desc')->orderBy('created_at', 'desc');
                        case 'oldest':
                            return $query->orderBy('year', 'asc')->orderBy('created_at', 'asc');
                        case 'name':
                            return $query->orderBy('name', 'asc');
                        default:
                            return $query->orderBy('order_column')->orderBy('created_at', 'desc');
                    }
                })
                ->paginate($perPage);

            return response()->json([
                'success' => true,
                'data' => $projects,
                'message' => 'Projects fetched successfully'
            ]);

        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to fetch projects',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    public function show($id): JsonResponse
    {
        try {
            $project = Project::published()->findOrFail($id);

            return response()->json([
                'success' => true,
                'data' => $project,
                'message' => 'Project fetched successfully'
            ]);

        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Project not found',
                'error' => $e->getMessage()
            ], 404);
        }
    }

    public function showBySlug($slug): JsonResponse
    {
        try {
            $project = Project::published()
                ->where('slug', $slug)
                ->firstOrFail();

            return response()->json([
                'success' => true,
                'data' => $project,
                'message' => 'Project fetched successfully'
            ]);

        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Project not found',
                'error' => $e->getMessage()
            ], 404);
        }
    }

    public function featured(): JsonResponse
    {
        try {
            $featuredProjects = Project::published()
                ->featured()
                ->orderBy('order_column')
                ->orderBy('created_at', 'desc')
                ->get();

            return response()->json([
                'success' => true,
                'data' => $featuredProjects,
                'message' => 'Featured projects fetched successfully'
            ]);

        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to fetch featured projects',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    public function awards(): JsonResponse
    {
        try {
            // Get all projects that have awards
            $awardedProjects = Project::published()
                ->hasAwards()
                ->orderBy('year', 'desc')
                ->orderBy('order_column')
                ->get();

            // Extract and format awards from all projects
            $allAwards = collect();
            
            foreach ($awardedProjects as $project) {
                foreach ($project->awards as $award) {
                    $allAwards->push([
                        'id' => $project->id . '-' . ($award['name'] ?? ''),
                        'name' => $award['name'] ?? '',
                        'organization' => $award['organization'] ?? '',
                        'year' => $award['year'] ?? $project->year,
                        'description' => $award['description'] ?? '',
                        'project_name' => $project->name,
                        'project_slug' => $project->slug,
                        'project_category' => $project->category,
                        'featured' => $award['featured'] ?? false,
                    ]);
                }
            }

            // Sort by year descending
            $sortedAwards = $allAwards->sortByDesc('year')->values();

            return response()->json([
                'success' => true,
                'data' => $sortedAwards,
                'message' => 'Awards fetched successfully'
            ]);

        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to fetch awards',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    public function awardYears(): JsonResponse
    {
        try {
            $years = Project::published()
                ->hasAwards()
                ->select('year')
                ->distinct()
                ->orderBy('year', 'desc')
                ->pluck('year');

            return response()->json([
                'success' => true,
                'data' => $years,
                'message' => 'Award years fetched successfully'
            ]);

        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to fetch award years',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    public function featuredAwards(): JsonResponse
    {
        try {
            // Get projects with featured awards
            $projectsWithFeaturedAwards = Project::published()
                ->hasAwards()
                ->orderBy('year', 'desc')
                ->orderBy('order_column')
                ->get();

            // Extract only featured awards
            $featuredAwards = collect();
            
            foreach ($projectsWithFeaturedAwards as $project) {
                foreach ($project->awards as $award) {
                    if ($award['featured'] ?? false) {
                        $featuredAwards->push([
                            'id' => $project->id . '-' . ($award['name'] ?? ''),
                            'name' => $award['name'] ?? '',
                            'organization' => $award['organization'] ?? '',
                            'year' => $award['year'] ?? $project->year,
                            'description' => $award['description'] ?? '',
                            'project_name' => $project->name,
                            'project_slug' => $project->slug,
                            'project_category' => $project->category,
                            'project_image' => $project->images[0] ?? null,
                        ]);
                    }
                }
            }

            // Sort by year descending and limit to featured ones
            $sortedFeaturedAwards = $featuredAwards->sortByDesc('year')->values();

            return response()->json([
                'success' => true,
                'data' => $sortedFeaturedAwards,
                'message' => 'Featured awards fetched successfully'
            ]);

        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to fetch featured awards',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    public function categories(): JsonResponse
    {
        try {
            $categories = Project::published()
                ->select('category')
                ->distinct()
                ->pluck('category');

            return response()->json([
                'success' => true,
                'data' => $categories,
                'message' => 'Project categories fetched successfully'
            ]);

        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to fetch project categories',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    public function years(): JsonResponse
    {
        try {
            $years = Project::published()
                ->select('year')
                ->distinct()
                ->orderBy('year', 'desc')
                ->pluck('year');

            return response()->json([
                'success' => true,
                'data' => $years,
                'message' => 'Project years fetched successfully'
            ]);

        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to fetch project years',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    public function similar($id): JsonResponse
    {
        try {
            $project = Project::published()->findOrFail($id);

            $similarProjects = Project::published()
                ->where('id', '!=', $id)
                ->where('category', $project->category)
                ->orderBy('order_column')
                ->limit(4)
                ->get();

            return response()->json([
                'success' => true,
                'data' => $similarProjects,
                'message' => 'Similar projects fetched successfully'
            ]);

        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to fetch similar projects',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    public function byCategory($category): JsonResponse
    {
        try {
            $projects = Project::published()
                ->where('category', $category)
                ->orderBy('order_column')
                ->orderBy('created_at', 'desc')
                ->get();

            return response()->json([
                'success' => true,
                'data' => $projects,
                'message' => "{$category} projects fetched successfully"
            ]);

        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to fetch projects',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    public function stats(): JsonResponse
    {
        try {
            $stats = [
                'total_projects' => Project::published()->count(),
                'architecture_count' => Project::published()->where('category', 'architecture')->count(),
                'interior_count' => Project::published()->where('category', 'interior')->count(),
                'landscape_count' => Project::published()->where('category', 'landscape')->count(),
                'featured_count' => Project::published()->where('is_featured', true)->count(),
                'awarded_count' => Project::published()->hasAwards()->count(),
                'total_awards' => Project::published()->hasAwards()->get()->sum(function ($project) {
                    return count($project->awards);
                }),
                'years_experience' => 15, // Can be calculated dynamically
            ];

            return response()->json([
                'success' => true,
                'data' => $stats,
                'message' => 'Project stats fetched successfully'
            ]);

        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to fetch project stats',
                'error' => $e->getMessage()
            ], 500);
        }
    }
}