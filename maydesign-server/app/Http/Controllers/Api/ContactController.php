<?php
// app/Http/Controllers/Api/ContactController.php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\ContactEnquiry;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Validator;

class ContactController extends Controller
{
    public function store(Request $request): JsonResponse
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
            'email' => 'required|email|max:255',
            'phone' => 'nullable|string|max:20',
            'subject' => 'nullable|string|max:255',
            'message' => 'required|string|max:255',
            'project_type' => 'nullable|string|max:255',
            'budget' => 'nullable|string|max:255',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => 'Validation failed',
                'errors' => $validator->errors()
            ], 422);
        }

        try {
            $enquiry = ContactEnquiry::create([
                'name' => $request->name,
                'email' => $request->email,
                'phone' => $request->phone,
                'subject' => $request->subject,
                'message' => $request->message,
                'project_type' => $request->project_type,
                'budget' => $request->budget,
                'status' => ContactEnquiry::STATUS_NEW,
            ]);

            // Here you can add email notifications, etc.
            // Mail::to('admin@yourdomain.com')->send(new NewEnquiryNotification($enquiry));

            return response()->json([
                'success' => true,
                'message' => 'Thank you for your enquiry! We will contact you within 24 hours.',
                'data' => $enquiry
            ], 201);

        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Failed to submit enquiry. Please try again.',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    public function index(Request $request): JsonResponse
    {
        $enquiries = ContactEnquiry::latest()->paginate(10);

        return response()->json([
            'success' => true,
            'data' => $enquiries
        ]);
    }
}