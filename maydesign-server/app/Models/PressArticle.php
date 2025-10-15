<?php
// app/Models/PressArticle.php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Casts\Attribute;

class PressArticle extends Model
{
    protected $fillable = [
        'publication',
        'title',
        'date',
        'excerpt',
        'image',
        'category',
        'featured',
        'publication_details',
        'key_quotes',
        'project_team',
        'additional_images',
        'video_interview',
        'full_article',
        'sort_order',
        'is_active',
    ];

    protected $casts = [
        'date' => 'date',
        'featured' => 'boolean',
        'is_active' => 'boolean',
        'publication_details' => 'array',
        'key_quotes' => 'array',
        'project_team' => 'array',
        'additional_images' => 'array',
    ];

    protected function publicationDetails(): Attribute
    {
        return Attribute::make(
            get: fn ($value) => json_decode($value, true) ?? [
                'website' => '',
                'circulation' => '',
                'audience' => '',
                'founded' => '',
            ],
            set: fn ($value) => json_encode($value),
        );
    }

    protected function keyQuotes(): Attribute
    {
        return Attribute::make(
            get: fn ($value) => json_decode($value, true) ?? [],
            set: fn ($value) => json_encode($value),
        );
    }

    protected function projectTeam(): Attribute
    {
        return Attribute::make(
            get: fn ($value) => json_decode($value, true) ?? [],
            set: fn ($value) => json_encode($value),
        );
    }

    protected function additionalImages(): Attribute
    {
        return Attribute::make(
            get: fn ($value) => json_decode($value, true) ?? [],
            set: fn ($value) => json_encode($value),
        );
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

    public function scopeLatestFirst($query)
    {
        return $query->orderBy('date', 'desc')->orderBy('sort_order');
    }
}