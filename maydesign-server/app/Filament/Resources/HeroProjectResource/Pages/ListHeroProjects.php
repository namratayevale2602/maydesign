<?php

namespace App\Filament\Resources\HeroProjectResource\Pages;

use App\Filament\Resources\HeroProjectResource;
use Filament\Actions;
use Filament\Resources\Pages\ListRecords;

class ListHeroProjects extends ListRecords
{
    protected static string $resource = HeroProjectResource::class;

    protected function getHeaderActions(): array
    {
        return [
            Actions\CreateAction::make(),
        ];
    }
}
