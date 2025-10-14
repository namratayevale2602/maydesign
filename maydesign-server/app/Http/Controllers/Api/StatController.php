<?php
// app/Http/Controllers/Api/StatController.php

namespace App\Http\Controllers\Api;

use App\Models\Stat;
use App\Http\Controllers\Controller;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class StatController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(): JsonResponse
    {
        try {
            $stats = Stat::active()
                ->ordered()
                ->get()
                ->map(function ($stat) {
                    return [
                        'id' => $stat->id,
                        'number' => $stat->number,
                        'label' => $stat->label,
                        'formatted_number' => $stat->formatted_number,
                        'icon' => $stat->icon,
                        'suffix' => $stat->suffix,
                        'order' => $stat->order,
                    ];
                });

            return response()->json([
                'success' => true,
                'data' => $stats,
                'message' => 'Statistics retrieved successfully'
            ]);

        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to retrieve statistics',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request): JsonResponse
    {
        try {
            $validated = $request->validate([
                'number' => 'required|string|max:50',
                'label' => 'required|string|max:100',
                'icon' => 'nullable|string|max:50',
                'suffix' => 'nullable|string|max:10',
                'order' => 'nullable|integer',
                'is_active' => 'nullable|boolean',
            ]);

            $stat = Stat::create($validated);

            return response()->json([
                'success' => true,
                'data' => $stat,
                'message' => 'Statistic created successfully'
            ], 201);

        } catch (\Illuminate\Validation\ValidationException $e) {
            return response()->json([
                'success' => false,
                'message' => 'Validation failed',
                'errors' => $e->errors()
            ], 422);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to create statistic',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(Stat $stat): JsonResponse
    {
        try {
            return response()->json([
                'success' => true,
                'data' => [
                    'id' => $stat->id,
                    'number' => $stat->number,
                    'label' => $stat->label,
                    'formatted_number' => $stat->formatted_number,
                    'icon' => $stat->icon,
                    'suffix' => $stat->suffix,
                    'order' => $stat->order,
                    'is_active' => $stat->is_active,
                    'created_at' => $stat->created_at,
                    'updated_at' => $stat->updated_at,
                ],
                'message' => 'Statistic retrieved successfully'
            ]);

        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to retrieve statistic',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Stat $stat): JsonResponse
    {
        try {
            $validated = $request->validate([
                'number' => 'sometimes|required|string|max:50',
                'label' => 'sometimes|required|string|max:100',
                'icon' => 'nullable|string|max:50',
                'suffix' => 'nullable|string|max:10',
                'order' => 'nullable|integer',
                'is_active' => 'nullable|boolean',
            ]);

            $stat->update($validated);

            return response()->json([
                'success' => true,
                'data' => $stat,
                'message' => 'Statistic updated successfully'
            ]);

        } catch (\Illuminate\Validation\ValidationException $e) {
            return response()->json([
                'success' => false,
                'message' => 'Validation failed',
                'errors' => $e->errors()
            ], 422);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to update statistic',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Stat $stat): JsonResponse
    {
        try {
            $stat->delete();

            return response()->json([
                'success' => true,
                'message' => 'Statistic deleted successfully'
            ]);

        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to delete statistic',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Get active statistics only (public endpoint)
     */
    public function active(): JsonResponse
    {
        try {
            $stats = Stat::active()
                ->ordered()
                ->get()
                ->map(function ($stat) {
                    return [
                        'id' => $stat->id,
                        'number' => $stat->number,
                        'label' => $stat->label,
                        'formatted_number' => $stat->formatted_number,
                        'icon' => $stat->icon,
                        'suffix' => $stat->suffix,
                    ];
                });

            return response()->json([
                'success' => true,
                'data' => $stats,
                'message' => 'Active statistics retrieved successfully'
            ]);

        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to retrieve active statistics',
                'error' => $e->getMessage()
            ], 500);
        }
    }
}