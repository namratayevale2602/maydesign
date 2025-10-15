<?php
// app/Filament/Resources/ProjectResource/Pages/EditProject.php

namespace App\Filament\Resources\ProjectResource\Pages;

use App\Filament\Resources\ProjectResource;
use Filament\Actions;
use Filament\Resources\Pages\EditRecord;

class EditProject extends EditRecord
{
    protected static string $resource = ProjectResource::class;

    protected function getHeaderActions(): array
    {
        return [
            Actions\DeleteAction::make()
                ->label('Delete Project'),
            // Preview action completely removed to avoid route errors
        ];
    }

    protected function getSavedNotificationTitle(): ?string
    {
        return 'Project updated successfully';
    }

    protected function mutateFormDataBeforeSave(array $data): array
    {
        // Ensure slug is unique (excluding current record)
        if (empty($data['slug'])) {
            $data['slug'] = \Illuminate\Support\Str::slug($data['name']);
        }

        $originalSlug = $data['slug'];
        $counter = 1;
        while (\App\Models\Project::where('slug', $data['slug'])->where('id', '!=', $this->record->id)->exists()) {
            $data['slug'] = $originalSlug . '-' . $counter;
            $counter++;
        }

        return $data;
    }
}