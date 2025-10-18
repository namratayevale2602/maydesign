<?php
// app/Models/Project.php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;

class Project extends Model
{
    protected $fillable = [
        'name',
        'slug',
        'category',
        'sub_category',
        'type',
        'style',
        'description',
        'short_description',
        'full_description',
        'concept',
        'design_philosophy',
        'highlights',
        'awards', 
        'location',
        'year',
        'area',
        'budget',
        'duration',
        'images',
        'before_after',
        'videos',
        'team',
        'testimonials',
        'tags',
        'is_featured',
        'is_published',
        'order_column',
    ];

    protected $casts = [
        'highlights' => 'array',
        'awards' => 'array', // Cast awards as array
        'images' => 'array',
        'before_after' => 'array',
        'videos' => 'array',
        'team' => 'array',
        'testimonials' => 'array',
        'tags' => 'array',
        'is_featured' => 'boolean',
        'is_published' => 'boolean',
        'year' => 'integer',
        'order_column' => 'integer',
    ];

    protected static function boot()
    {
        parent::boot();

        static::creating(function ($project) {
            if (empty($project->slug)) {
                $project->slug = Str::slug($project->name);
            }
        });
    }

    // Helper method to check if project has awards
    public function hasAwards(): bool
    {
        return !empty($this->awards) && count($this->awards) > 0;
    }

    // Helper method to get featured awards
    public function getFeaturedAwards()
    {
        if (!$this->hasAwards()) {
            return collect();
        }

        return collect($this->awards)->filter(function ($award) {
            return $award['featured'] ?? false;
        });
    }

    public function scopePublished($query)
    {
        return $query->where('is_published', true);
    }

    public function scopeFeatured($query)
    {
        return $query->where('is_featured', true);
    }

    public function scopeHasAwards($query)
    {
        return $query->whereNotNull('awards')->where('awards', '!=', '[]');
    }

    public function scopeByCategory($query, $category = null)
    {
        if ($category && $category !== 'all') {
            return $query->where('category', $category);
        }
        return $query;
    }

    public function scopeBySubCategory($query, $subCategory = null)
    {
        if ($subCategory && $subCategory !== 'all') {
            return $query->where('sub_category', $subCategory);
        }
        return $query;
    }

    public function scopeByType($query, $type = null)
    {
        if ($type && $type !== 'all') {
            return $query->where('type', $type);
        }
        return $query;
    }

    public function scopeByStyle($query, $style = null)
    {
        if ($style && $style !== 'all') {
            return $query->where('style', $style);
        }
        return $query;
    }

    public function scopeSearch($query, $searchTerm)
    {
        if ($searchTerm) {
            return $query->where(function ($q) use ($searchTerm) {
                $q->where('name', 'like', "%{$searchTerm}%")
                  ->orWhere('description', 'like', "%{$searchTerm}%")
                  ->orWhere('short_description', 'like', "%{$searchTerm}%")
                  ->orWhereJsonContains('tags', $searchTerm)
                  ->orWhereJsonContains('awards', ['name' => $searchTerm]);
            });
        }
        return $query;
    }
}