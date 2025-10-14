<?php
// app/Http/Controllers/Api/AboutSectionController.php

namespace App\Http\Controllers\Api;

use App\Models\AboutSection;
use App\Http\Controllers\Controller;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class AboutSectionController extends Controller
{
    /**
     * Display the about section data.
     */
    public function index(): JsonResponse
    {
        try {
            $aboutSection = AboutSection::active()->first();

            if (!$aboutSection) {
                return response()->json([
                    'success' => false,
                    'message' => 'About section not found',
                    'data' => null
                ], 404);
            }

            $data = [
                'id' => $aboutSection->id,
                'title' => $aboutSection->title,
                'highlighted_text' => $aboutSection->highlighted_text,
                'description_1' => $aboutSection->description_1,
                'description_2' => $aboutSection->description_2,
                'description_3' => $aboutSection->description_3,
                'image' => $aboutSection->image_url,
                'experience_years' => $aboutSection->experience_years,
                'experience_label' => $aboutSection->experience_label,
                'projects_count' => $aboutSection->projects_count,
                'projects_label' => $aboutSection->projects_label,
                'primary_button_text' => $aboutSection->primary_button_text,
                'primary_button_link' => $aboutSection->primary_button_link,
                'secondary_button_text' => $aboutSection->secondary_button_text,
                'secondary_button_link' => $aboutSection->secondary_button_link,
                'is_active' => $aboutSection->is_active,
            ];

            return response()->json([
                'success' => true,
                'data' => $data,
                'message' => 'About section retrieved successfully'
            ]);

        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to retrieve about section',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Store a newly created about section.
     */
    public function store(Request $request): JsonResponse
    {
        try {
            $validated = $request->validate([
                'title' => 'required|string|max:255',
                'highlighted_text' => 'nullable|string|max:100',
                'description_1' => 'required|string',
                'description_2' => 'required|string',
                'description_3' => 'required|string',
                'image' => 'nullable|image|mimes:jpeg,png,jpg,gif,webp|max:5120',
                'experience_years' => 'required|string|max:20',
                'experience_label' => 'required|string|max:100',
                'projects_count' => 'required|string|max:20',
                'projects_label' => 'required|string|max:100',
                'primary_button_text' => 'required|string|max:50',
                'primary_button_link' => 'required|string|max:255',
                'secondary_button_text' => 'required|string|max:50',
                'secondary_button_link' => 'nullable|string|max:255',
                'is_active' => 'boolean',
            ]);

            // Handle image upload
            if ($request->hasFile('image')) {
                $image = $request->file('image');
                $imageName = 'about-' . time() . '.' . $image->getClientOriginalExtension();
                $image->move(public_path('uploads/about'), $imageName);
                $validated['image'] = 'about/' . $imageName;
            }

            $aboutSection = AboutSection::create($validated);

            return response()->json([
                'success' => true,
                'data' => $aboutSection,
                'message' => 'About section created successfully'
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
                'message' => 'Failed to create about section',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Update the specified about section.
     */
    public function update(Request $request, AboutSection $aboutSection): JsonResponse
    {
        try {
            $validated = $request->validate([
                'title' => 'sometimes|required|string|max:255',
                'highlighted_text' => 'nullable|string|max:100',
                'description_1' => 'sometimes|required|string',
                'description_2' => 'sometimes|required|string',
                'description_3' => 'sometimes|required|string',
                'image' => 'nullable|image|mimes:jpeg,png,jpg,gif,webp|max:5120',
                'experience_years' => 'sometimes|required|string|max:20',
                'experience_label' => 'sometimes|required|string|max:100',
                'projects_count' => 'sometimes|required|string|max:20',
                'projects_label' => 'sometimes|required|string|max:100',
                'primary_button_text' => 'sometimes|required|string|max:50',
                'primary_button_link' => 'sometimes|required|string|max:255',
                'secondary_button_text' => 'sometimes|required|string|max:50',
                'secondary_button_link' => 'nullable|string|max:255',
                'is_active' => 'boolean',
            ]);

            // Handle image upload
            if ($request->hasFile('image')) {
                // Delete old image if exists
                if ($aboutSection->image && file_exists(public_path('uploads/' . $aboutSection->image))) {
                    unlink(public_path('uploads/' . $aboutSection->image));
                }

                $image = $request->file('image');
                $imageName = 'about-' . time() . '.' . $image->getClientOriginalExtension();
                $image->move(public_path('uploads/about'), $imageName);
                $validated['image'] = 'about/' . $imageName;
            }

            $aboutSection->update($validated);

            return response()->json([
                'success' => true,
                'data' => $aboutSection,
                'message' => 'About section updated successfully'
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
                'message' => 'Failed to update about section',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Remove the specified about section.
     */
    public function destroy(AboutSection $aboutSection): JsonResponse
    {
        try {
            // Delete image if exists
            if ($aboutSection->image && file_exists(public_path('uploads/' . $aboutSection->image))) {
                unlink(public_path('uploads/' . $aboutSection->image));
            }

            $aboutSection->delete();

            return response()->json([
                'success' => true,
                'message' => 'About section deleted successfully'
            ]);

        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to delete about section',
                'error' => $e->getMessage()
            ], 500);
        }
    }
}