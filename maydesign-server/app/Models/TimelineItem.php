<?php
// app/Models/TimelineItem.php
namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class TimelineItem extends Model
{
    protected $fillable = [
        'year',
        'title',
        'description',
        'image',
        'achievements',
        'impact',
        'order',
        'is_active'
    ];

    protected $casts = [
        'achievements' => 'array',
        'is_active' => 'boolean',
    ];

    public function getImageUrlAttribute()
    {
        return $this->image ? asset('uploads/' . $this->image) : null;
    }
}