<?php

namespace App\Filament\Resources\HeroProjectResource\Pages;

use App\Filament\Resources\HeroProjectResource;
use Filament\Actions;
use Filament\Resources\Pages\EditRecord;

class EditHeroProject extends EditRecord
{
    protected static string $resource = HeroProjectResource::class;

    protected function getHeaderActions(): array
    {
        return [
            Actions\DeleteAction::make(),
        ];
    }
}
