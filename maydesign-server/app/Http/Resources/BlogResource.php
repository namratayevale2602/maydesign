<?php
// app/Http/Resources/BlogResource.php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class BlogResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'title' => $this->title,
            'slug' => $this->slug,
            'excerpt' => $this->excerpt,
            'content' => $this->content,
            'image' => $this->image_url,
            'category' => $this->category,
            'author' => $this->author,
            'author_role' => $this->author_role,
            'author_image' => $this->author_image_url,
            'published_date' => $this->published_date->format('Y-m-d'),
            'read_time' => $this->read_time,
            'tags' => $this->tags ?? [],
            'views' => $this->views,
            'created_at' => $this->created_at,
            'updated_at' => $this->updated_at,
        ];
    }
}