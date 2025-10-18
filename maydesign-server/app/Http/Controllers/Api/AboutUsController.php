<?php
// app/Http/Controllers/Api/AboutUsController.php
namespace App\Http\Controllers\Api;

use App\Models\Mission;
use App\Models\TeamMember;
use App\Models\Value;
use App\Models\TimelineItem;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class AboutUsController extends Controller
{
    public function missionVision()
    {
        $mission = Mission::where('is_active', true)->first();
        
        if (!$mission) {
            return response()->json([
                'message' => 'No mission and vision found'
            ], 404);
        }

        return response()->json([
            'mission' => $mission->mission_text,
            'vision' => $mission->vision_text
        ]);
    }

    public function team()
    {
        $teamMembers = TeamMember::where('is_active', true)
            ->orderBy('order')
            ->get()
            ->map(function ($member) {
                return [
                    'name' => $member->name,
                    'role' => $member->role,
                    'image' => $member->image_url,
                    'bio' => $member->bio,
                    'specialties' => $member->specialties,
                ];
            });

        return response()->json($teamMembers);
    }

    public function values()
    {
        $values = Value::where('is_active', true)
            ->orderBy('order')
            ->get()
            ->map(function ($value) {
                return [
                    'title' => $value->title,
                    'description' => $value->description,
                    'icon' => $value->icon,
                ];
            });

        return response()->json($values);
    }

    public function timeline()
    {
        $timelineItems = TimelineItem::where('is_active', true)
            ->orderBy('order')
            ->get()
            ->map(function ($item) {
                return [
                    'year' => $item->year,
                    'title' => $item->title,
                    'description' => $item->description,
                    'image' => $item->image_url,
                    'achievements' => $item->achievements,
                    'impact' => $item->impact,
                ];
            });

        return response()->json($timelineItems);
    }

    public function allSections()
    {
        $mission = Mission::where('is_active', true)->first();
        $teamMembers = TeamMember::where('is_active', true)->orderBy('order')->get();
        $values = Value::where('is_active', true)->orderBy('order')->get();
        $timelineItems = TimelineItem::where('is_active', true)->orderBy('order')->get();

        return response()->json([
            'mission_vision' => $mission ? [
                'mission' => $mission->mission_text,
                'vision' => $mission->vision_text
            ] : null,
            'team' => $teamMembers->map(function ($member) {
                return [
                    'name' => $member->name,
                    'role' => $member->role,
                    'image' => $member->image_url,
                    'bio' => $member->bio,
                    'specialties' => $member->specialties,
                ];
            }),
            'values' => $values->map(function ($value) {
                return [
                    'title' => $value->title,
                    'description' => $value->description,
                    'icon' => $value->icon,
                ];
            }),
            'timeline' => $timelineItems->map(function ($item) {
                return [
                    'year' => $item->year,
                    'title' => $item->title,
                    'description' => $item->description,
                    'image' => $item->image_url,
                    'achievements' => $item->achievements,
                    'impact' => $item->impact,
                ];
            })
        ]);
    }
}