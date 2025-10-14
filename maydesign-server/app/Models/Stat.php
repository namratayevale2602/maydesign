<?php
// app/Models/Stat.php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Stat extends Model
{
    use HasFactory;

    protected $fillable = [
        'number',
        'label',
        'icon',
        'suffix',
        'order',
        'is_active',
    ];

    protected $casts = [
        'is_active' => 'boolean',
        'order' => 'integer',
    ];

    public function scopeActive($query)
    {
        return $query->where('is_active', true);
    }

    public function scopeOrdered($query)
    {
        return $query->orderBy('order')->orderBy('created_at');
    }

    // Accessor for formatted number with suffix
    public function getFormattedNumberAttribute()
    {
        return $this->number . ($this->suffix ?: '');
    }
}