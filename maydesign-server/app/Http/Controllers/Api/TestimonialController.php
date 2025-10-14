<?php
// app/Http/Controllers/Api/TestimonialController.php

namespace App\Http\Controllers\Api;

use App\Models\Testimonial;
use App\Http\Controllers\Controller;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class TestimonialController extends Controller
{
    /**
     * Display a listing of testimonials.
     */
    public function index(): JsonResponse
    {
        try {
            $testimonials = Testimonial::active()
                ->ordered()
                ->get()
                ->map(function ($testimonial) {
                    return [
                        'id' => $testimonial->id,
                        'name' => $testimonial->name,
                        'position' => $testimonial->position,
                        'content' => $testimonial->content,
                        'short_content' => $testimonial->short_content,
                        'rating' => $testimonial->rating,
                        'image' => $testimonial->image_url,
                        'order' => $testimonial->order,
                        'featured' => $testimonial->featured,
                    ];
                });

            return response()->json([
                'success' => true,
                'data' => $testimonials,
                'message' => 'Testimonials retrieved successfully'
            ]);

        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to retrieve testimonials',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Display featured testimonials for the grid.
     */
    public function featured(): JsonResponse
    {
        try {
            $testimonials = Testimonial::active()
                ->featured()
                ->ordered()
                ->limit(3)
                ->get()
                ->map(function ($testimonial) {
                    return [
                        'id' => $testimonial->id,
                        'name' => $testimonial->name,
                        'position' => $testimonial->position,
                        'content' => $testimonial->content,
                        'short_content' => $testimonial->short_content,
                        'rating' => $testimonial->rating,
                        'image' => $testimonial->image_url,
                    ];
                });

            return response()->json([
                'success' => true,
                'data' => $testimonials,
                'message' => 'Featured testimonials retrieved successfully'
            ]);

        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to retrieve featured testimonials',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Store a newly created testimonial.
     */
    public function store(Request $request): JsonResponse
    {
        try {
            $validated = $request->validate([
                'name' => 'required|string|max:255',
                'position' => 'required|string|max:255',
                'content' => 'required|string',
                'rating' => 'required|integer|min:1|max:5',
                'image' => 'nullable|image|mimes:jpeg,png,jpg,gif,webp|max:2048',
                'order' => 'nullable|integer',
                'is_active' => 'boolean',
                'featured' => 'boolean',
            ]);

            // Handle image upload - using 'public' disk
            if ($request->hasFile('image')) {
                $image = $request->file('image');
                $imageName = 'testimonial-' . time() . '.' . $image->getClientOriginalExtension();
                
                // Store using the public disk (which points to public/uploads)
                $imagePath = $image->storeAs('testimonials', $imageName, 'public');
                $validated['image'] = $imagePath;
            }

            $testimonial = Testimonial::create($validated);

            return response()->json([
                'success' => true,
                'data' => $testimonial,
                'message' => 'Testimonial created successfully'
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
                'message' => 'Failed to create testimonial',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Display the specified testimonial.
     */
    public function show(Testimonial $testimonial): JsonResponse
    {
        try {
            return response()->json([
                'success' => true,
                'data' => [
                    'id' => $testimonial->id,
                    'name' => $testimonial->name,
                    'position' => $testimonial->position,
                    'content' => $testimonial->content,
                    'rating' => $testimonial->rating,
                    'image' => $testimonial->image_url,
                    'order' => $testimonial->order,
                    'is_active' => $testimonial->is_active,
                    'featured' => $testimonial->featured,
                ],
                'message' => 'Testimonial retrieved successfully'
            ]);

        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to retrieve testimonial',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Update the specified testimonial.
     */
    public function update(Request $request, Testimonial $testimonial): JsonResponse
    {
        try {
            $validated = $request->validate([
                'name' => 'sometimes|required|string|max:255',
                'position' => 'sometimes|required|string|max:255',
                'content' => 'sometimes|required|string',
                'rating' => 'sometimes|required|integer|min:1|max:5',
                'image' => 'nullable|image|mimes:jpeg,png,jpg,gif,webp|max:2048',
                'order' => 'nullable|integer',
                'is_active' => 'boolean',
                'featured' => 'boolean',
            ]);

            // Handle image upload - using 'public' disk
            if ($request->hasFile('image')) {
                // Delete old image if exists
                if ($testimonial->image && Storage::disk('public')->exists($testimonial->image)) {
                    Storage::disk('public')->delete($testimonial->image);
                }

                $image = $request->file('image');
                $imageName = 'testimonial-' . time() . '.' . $image->getClientOriginalExtension();
                $imagePath = $image->storeAs('testimonials', $imageName, 'public');
                $validated['image'] = $imagePath;
            }

            $testimonial->update($validated);

            return response()->json([
                'success' => true,
                'data' => $testimonial,
                'message' => 'Testimonial updated successfully'
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
                'message' => 'Failed to update testimonial',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Remove the specified testimonial.
     */
    public function destroy(Testimonial $testimonial): JsonResponse
    {
        try {
            // Delete image if exists
            if ($testimonial->image && Storage::disk('public')->exists($testimonial->image)) {
                Storage::disk('public')->delete($testimonial->image);
            }

            $testimonial->delete();

            return response()->json([
                'success' => true,
                'message' => 'Testimonial deleted successfully'
            ]);

        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to delete testimonial',
                'error' => $e->getMessage()
            ], 500);
        }
    }
}