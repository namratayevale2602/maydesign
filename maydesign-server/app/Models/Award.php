<?php
// app/Models/Award.php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Casts\Attribute;

class Award extends Model
{
    use HasFactory;

    protected $fillable = [
        'title',
        'organization',
        'year',
        'category',
        'description',
        'image',
        'featured',
        'details',
        'photos',
        'video',
        'sort_order',
        'is_active',
    ];

    protected $casts = [
        'featured' => 'boolean',
        'is_active' => 'boolean',
        'details' => 'array',
        'photos' => 'array',
        'year' => 'integer',
        'sort_order' => 'integer',
    ];

    protected function details(): Attribute
    {
        return Attribute::make(
            get: fn ($value) => json_decode($value, true) ?? [
                'fullDescription' => '',
                'projectTeam' => [],
                'location' => '',
                'completionDate' => '',
                'awardSignificance' => '',
            ],
            set: fn ($value) => json_encode($value),
        );
    }

    protected function photos(): Attribute
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

    public function scopeByYear($query, $year)
    {
        if ($year && $year !== 'all') {
            return $query->where('year', $year);
        }
        return $query;
    }

    public function scopeOrdered($query)
    {
        return $query->orderBy('sort_order')->orderBy('year', 'desc');
    }
}