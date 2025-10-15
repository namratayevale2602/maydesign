<?php
// app/Models/Project.php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Casts\Attribute;

class Project extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'slug',
        'category',
        'sub_category',
        'style',
        'type',
        'description',
        'short_description',
        'full_description',
        'concept',
        'design_philosophy',
        'location',
        'year',
        'area',
        'budget',
        'duration',
        'main_image',
        'images',
        'before_after',
        'videos',
        'highlights',
        'tags',
        'featured',
        'is_active',
        'sort_order',
    ];

    protected $casts = [
        'featured' => 'boolean',
        'is_active' => 'boolean',
        'images' => 'array',
        'before_after' => 'array',
        'videos' => 'array',
        'highlights' => 'array',
        'tags' => 'array',
        'year' => 'string',
        'sort_order' => 'integer',
    ];

    // Relationships
    public function team()
    {
        return $this->hasMany(ProjectTeam::class)->orderBy('sort_order');
    }

    public function testimonials()
    {
        return $this->hasMany(ProjectTestimonial::class)->where('is_active', true)->orderBy('sort_order');
    }

    public function awards()
    {
        return $this->belongsToMany(Award::class, 'project_awards')->withTimestamps();
    }

    // Scopes
    public function scopeActive($query)
    {
        return $query->where('is_active', true);
    }

    public function scopeFeatured($query)
    {
        return $query->where('featured', true);
    }

    public function scopeByCategory($query, $category)
    {
        if ($category && $category !== 'all') {
            return $query->where('category', $category);
        }
        return $query;
    }

    public function scopeBySubCategory($query, $subCategory)
    {
        if ($subCategory && $subCategory !== 'all') {
            return $query->where('sub_category', $subCategory);
        }
        return $query;
    }

    public function scopeByStyle($query, $style)
    {
        if ($style && $style !== 'all') {
            return $query->where('style', 'like', "%{$style}%");
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
                  ->orWhereJsonContains('tags', $searchTerm);
            });
        }
        return $query;
    }

    public function scopeOrdered($query)
    {
        return $query->orderBy('sort_order')->orderBy('created_at', 'desc');
    }

    // Accessors
    protected function mainImage(): Attribute
    {
        return Attribute::make(
            get: fn ($value) => $value ? asset('uploads/' . $value) : null,
        );
    }

    protected function images(): Attribute
    {
        return Attribute::make(
            get: fn ($value) => collect(json_decode($value, true) ?? [])
                ->map(fn ($image) => asset('uploads/' . $image))
                ->toArray(),
        );
    }

    protected function beforeAfter(): Attribute
    {
        return Attribute::make(
            get: fn ($value) => collect(json_decode($value, true) ?? [])
                ->map(function ($item) {
                    return [
                        'before' => asset('uploads/' . $item['before']),
                        'after' => asset('uploads/' . $item['after']),
                        'caption' => $item['caption'] ?? '',
                    ];
                })
                ->toArray(),
        );
    }
}