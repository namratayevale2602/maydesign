<?php
// app/Filament/Resources/ProjectResource/Widgets/ProjectStats.php

namespace App\Filament\Resources\ProjectResource\Widgets;

use App\Models\Project;
use Filament\Widgets\StatsOverviewWidget as BaseWidget;
use Filament\Widgets\StatsOverviewWidget\Stat;

class ProjectStats extends BaseWidget
{
    protected function getStats(): array
    {
        $totalProjects = Project::count();
        $activeProjects = Project::where('is_active', true)->count();
        $featuredProjects = Project::where('featured', true)->count();
        $architectureProjects = Project::where('category', 'architecture')->count();
        $interiorProjects = Project::where('category', 'interior')->count();
        $landscapeProjects = Project::where('category', 'landscape')->count();

        return [
            Stat::make('Total Projects', $totalProjects)
                ->description('All projects in the system')
                ->descriptionIcon('heroicon-o-building-office')
                ->color('primary'),

            Stat::make('Active Projects', $activeProjects)
                ->description('Visible on website')
                ->descriptionIcon('heroicon-o-eye')
                ->color('success'),

            Stat::make('Featured Projects', $featuredProjects)
                ->description('Marked as featured')
                ->descriptionIcon('heroicon-o-star')
                ->color('warning'),

            Stat::make('Architecture', $architectureProjects)
                ->description('Architecture projects')
                ->descriptionIcon('heroicon-o-home')
                ->color('gray'),

            Stat::make('Interior Design', $interiorProjects)
                ->description('Interior design projects')
                ->descriptionIcon('heroicon-o-paint-brush')
                ->color('gray'),

            Stat::make('Landscape', $landscapeProjects)
                ->description('Landscape design projects')
                ->descriptionIcon('heroicon-o-sparkles')
                ->color('gray'),
        ];
    }
}