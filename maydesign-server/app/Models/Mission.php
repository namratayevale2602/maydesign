<?php
// app/Models/Mission.php
namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Mission extends Model
{
    protected $fillable = [
        'mission_text',
        'vision_text',
        'is_active'
    ];

    protected $casts = [
        'is_active' => 'boolean',
    ];
}