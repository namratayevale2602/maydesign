<?php
// app/Http/Controllers/Api/ProjectCategoryController.php

namespace App\Http\Controllers\Api;

use App\Models\Project;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class ProjectCategoryController extends Controller
{
    public function byCategory($category)
    {
        try {
            $validCategories = ['architecture', 'interior', 'landscape'];
            
            if (!in_array($category, $validCategories)) {
                return response()->json([
                    'success' => false,
                    'message' => 'Invalid category'
                ], 404);
            }

            $projects = Project::active()
                ->where('category', $category)
                ->ordered()
                ->get()
                ->map(function ($project) {
                    return $this->transformProject($project);
                });

            $categoryName = $this->getCategoryDisplayName($category);

            return response()->json([
                'success' => true,
                'data' => [
                    'category' => $category,
                    'category_name' => $categoryName,
                    'projects' => $projects,
                    'stats' => $this->getCategoryStats($category)
                ],
                'message' => "{$categoryName} projects retrieved successfully"
            ]);

        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to retrieve category projects',
                'error' => config('app.debug') ? $e->getMessage() : null
            ], 500);
        }
    }

    public function categoryTypes($category)
    {
        try {
            $validCategories = ['architecture', 'interior', 'landscape'];
            
            if (!in_array($category, $validCategories)) {
                return response()->json([
                    'success' => false,
                    'message' => 'Invalid category'
                ], 404);
            }

        $types = [];
        
        switch ($category) {
            case 'architecture':
                $types = [
                    ['id' => 'all', 'name' => 'All Projects', 'count' => Project::active()->where('category', 'architecture')->count()],
                    ['id' => 'residential', 'name' => 'Residential', 'count' => Project::active()->where('category', 'architecture')->where('sub_category', 'residential')->count()],
                    ['id' => 'commercial', 'name' => 'Commercial', 'count' => Project::active()->where('category', 'architecture')->where('sub_category', 'commercial')->count()],
                ];
                break;
                
            case 'interior':
                $types = [
                    ['id' => 'all', 'name' => 'All Projects', 'count' => Project::active()->where('category', 'interior')->count()],
                    ['id' => 'residential', 'name' => 'Residential', 'count' => Project::active()->where('category', 'interior')->where('sub_category', 'residential')->count()],
                    ['id' => 'commercial', 'name' => 'Commercial', 'count' => Project::active()->where('category', 'interior')->where('sub_category', 'commercial')->count()],
                ];
                break;
                
            case 'landscape':
                $types = [
                    ['id' => 'all', 'name' => 'All Projects', 'count' => Project::active()->where('category', 'landscape')->count()],
                    ['id' => 'residential', 'name' => 'Residential', 'count' => Project::active()->where('category', 'landscape')->where('sub_category', 'residential')->count()],
                    ['id' => 'commercial', 'name' => 'Commercial', 'count' => Project::active()->where('category', 'landscape')->where('sub_category', 'commercial')->count()],
                    ['id' => 'public', 'name' => 'Public Space', 'count' => Project::active()->where('category', 'landscape')->where('type', 'like', '%Public%')->count()],
                ];
                break;
        }

            return response()->json([
                'success' => true,
                'data' => $types,
                'message' => 'Category types retrieved successfully'
            ]);

        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to retrieve category types',
                'error' => config('app.debug') ? $e->getMessage() : null
            ], 500);
        }
    }

    public function interiorByType($type)
    {
        try {
            $validTypes = ['residential', 'commercial'];
            
            if (!in_array($type, $validTypes)) {
                return response()->json([
                    'success' => false,
                    'message' => 'Invalid interior type'
                ], 404);
            }

            $projects = Project::active()
                ->where('category', 'interior')
                ->where('sub_category', $type)
                ->ordered()
                ->get()
                ->map(function ($project) {
                    return $this->transformProject($project);
                });

            $typeName = $type === 'residential' ? 'Residential Interior' : 'Commercial Interior';

            // Get style filters for interior pages
            $filters = [];
            if ($type === 'residential') {
                $styles = Project::active()
                    ->where('category', 'interior')
                    ->where('sub_category', 'residential')
                    ->whereNotNull('style')
                    ->select('style')
                    ->distinct()
                    ->get()
                    ->pluck('style')
                    ->toArray();

                $filters = [
                    ['id' => 'all', 'name' => 'All Styles', 'count' => $projects->count()]
                ];

                foreach ($styles as $style) {
                    $count = Project::active()
                        ->where('category', 'interior')
                        ->where('sub_category', 'residential')
                        ->where('style', 'like', "%{$style}%")
                        ->count();
                    
                    $filters[] = [
                        'id' => strtolower($style),
                        'name' => $style,
                        'count' => $count
                    ];
                }
            } else {
                $categories = [
                    'Hospitality' => 'Hotel',
                    'Office' => 'Office',
                    'Restaurant' => 'Restaurant',
                    'Healthcare' => 'Medical',
                    'Retail' => 'Retail'
                ];

                $filters = [
                    ['id' => 'all', 'name' => 'All Categories', 'count' => $projects->count()]
                ];

                foreach ($categories as $name => $keyword) {
                    $count = Project::active()
                        ->where('category', 'interior')
                        ->where('sub_category', 'commercial')
                        ->where('type', 'like', "%{$keyword}%")
                        ->count();
                    
                    $filters[] = [
                        'id' => strtolower($name),
                        'name' => $name,
                        'count' => $count
                    ];
                }
            }

            return response()->json([
                'success' => true,
                'data' => [
                    'type' => $type,
                    'type_name' => $typeName,
                    'projects' => $projects,
                    'filters' => $filters,
                    'stats' => $this->getInteriorStats($type)
                ],
                'message' => "{$typeName} projects retrieved successfully"
            ]);

        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to retrieve interior projects',
                'error' => config('app.debug') ? $e->getMessage() : null
            ], 500);
        }
    }

    private function getCategoryDisplayName($category)
    {
        $names = [
            'architecture' => 'Architecture',
            'interior' => 'Interior Design',
            'landscape' => 'Landscape Design'
        ];
        
        return $names[$category] ?? ucfirst($category);
    }

    private function getCategoryStats($category)
    {
        $totalProjects = Project::active()->where('category', $category)->count();
        $featuredProjects = Project::active()->where('category', $category)->where('featured', true)->count();
        $awardCount = Project::active()->where('category', $category)->has('awards')->count();
        
        $yearsExperience = [
            'architecture' => 15,
            'interior' => 10,
            'landscape' => 12
        ];
        
        return [
            'total_projects' => $totalProjects,
            'featured_projects' => $featuredProjects,
            'awarded_projects' => $awardCount,
            'years_experience' => $yearsExperience[$category] ?? 10,
            'client_satisfaction' => '100%'
        ];
    }

    private function getInteriorStats($type)
    {
        $totalProjects = Project::active()->where('category', 'interior')->where('sub_category', $type)->count();
        $featuredProjects = Project::active()->where('category', 'interior')->where('sub_category', $type)->where('featured', true)->count();
        $awardCount = Project::active()->where('category', 'interior')->where('sub_category', $type)->has('awards')->count();
        
        if ($type === 'residential') {
            return [
                'total_projects' => $totalProjects,
                'featured_projects' => $featuredProjects,
                'awarded_projects' => $awardCount,
                'years_experience' => 10,
                'client_satisfaction' => '100%'
            ];
        } else {
            return [
                'total_projects' => $totalProjects,
                'featured_projects' => $featuredProjects,
                'awarded_projects' => $awardCount,
                'industries_served' => 12,
                'business_awards' => 9,
                'client_roi_focus' => '100%'
            ];
        }
    }

    private function transformProject(Project $project): array
    {
        return [
            'id' => $project->id,
            'name' => $project->name,
            'slug' => $project->slug,
            'category' => $project->category,
            'subCategory' => $project->sub_category,
            'style' => $project->style,
            'type' => $project->type,
            'description' => $project->description,
            'shortDescription' => $project->short_description,
            'location' => $project->location,
            'year' => $project->year,
            'area' => $project->area,
            'budget' => $project->budget,
            'duration' => $project->duration,
            'image' => $project->main_image,
            'featured' => (bool)$project->featured,
            'tags' => $project->tags ?? [],
            'highlights' => $project->highlights ?? [],
            'concept' => $project->concept,
            'designPhilosophy' => $project->design_philosophy,
            'awards' => $project->awards->map(function ($award) {
                return $award->name;
            })->toArray(),
            'images' => $project->images ?? [],
        ];
    }
}