<?php
// app/Http/Controllers/Api/BlogController.php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\BlogResource;
use App\Models\Blog;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;

class BlogController extends Controller
{
    public function index(Request $request): AnonymousResourceCollection
    {
        $query = Blog::published()->recent();

        // Search filter
        if ($request->has('search') && $request->search) {
            $search = $request->search;
            $query->where(function ($q) use ($search) {
                $q->where('title', 'like', "%{$search}%")
                  ->orWhere('excerpt', 'like', "%{$search}%")
                  ->orWhere('author', 'like', "%{$search}%");
            });
        }

        // Category filter
        if ($request->has('category') && $request->category !== 'All') {
            $query->where('category', $request->category);
        }

        // Pagination
        $perPage = $request->get('per_page', 6);
        $blogs = $query->paginate($perPage);

        return BlogResource::collection($blogs);
    }

    public function show($slug): BlogResource
    {
        $blog = Blog::published()->where('slug', $slug)->firstOrFail();
        
        // Increment views
        $blog->increment('views');

        return new BlogResource($blog);
    }

    public function categories(): array
    {
        return Blog::published()
            ->distinct()
            ->pluck('category')
            ->toArray();
    }

    public function recentPosts($excludeSlug = null, $limit = 3)
    {
        $query = Blog::published()->recent();
        
        if ($excludeSlug) {
            $query->where('slug', '!=', $excludeSlug);
        }

        return BlogResource::collection($query->limit($limit)->get());
    }
}