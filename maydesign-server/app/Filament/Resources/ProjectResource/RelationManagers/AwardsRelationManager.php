<?php
// app/Filament/Resources/ProjectResource/RelationManagers/AwardsRelationManager.php

namespace App\Filament\Resources\ProjectResource\RelationManagers;

use App\Models\Award;
use Filament\Forms;
use Filament\Forms\Form;
use Filament\Resources\RelationManagers\RelationManager;
use Filament\Tables;
use Filament\Tables\Table;

class AwardsRelationManager extends RelationManager
{
    protected static string $relationship = 'awards';

    protected static ?string $title = 'Project Awards';

    protected static ?string $icon = 'heroicon-o-trophy';

    public function form(Form $form): Form
    {
        return $form
            ->schema([
                Forms\Components\Section::make('Award Information')
                    ->schema([
                        Forms\Components\Select::make('award_id')
                            ->label('Select Award')
                            ->relationship('awards', 'title')
                            ->searchable()
                            ->preload()
                            ->required()
                            ->columnSpanFull()
                            ->helperText('Select an existing award or create a new one in the Awards section'),
                    ]),
            ]);
    }

    public function table(Table $table): Table
    {
        return $table
            ->recordTitleAttribute('title')
            ->columns([
                Tables\Columns\TextColumn::make('title')
                    ->label('Award Title')
                    ->searchable()
                    ->sortable()
                    ->wrap(),

                Tables\Columns\TextColumn::make('organization')
                    ->label('Organization')
                    ->searchable()
                    ->sortable()
                    ->wrap(),

                Tables\Columns\TextColumn::make('year')
                    ->label('Year')
                    ->sortable()
                    ->alignCenter(),

                Tables\Columns\TextColumn::make('category')
                    ->label('Category')
                    ->badge()
                    ->color('gray')
                    ->formatStateUsing(fn (string $state): string => ucfirst($state)),

                Tables\Columns\IconColumn::make('featured')
                    ->label('Featured')
                    ->boolean()
                    ->alignCenter()
                    ->trueColor('warning')
                    ->falseColor('gray'),
            ])
            ->filters([
                Tables\Filters\SelectFilter::make('year')
                    ->options(fn (): array => Award::query()->pluck('year', 'year')->toArray())
                    ->label('Award Year'),
            ])
            ->headerActions([
                Tables\Actions\AttachAction::make()
                    ->label('Add Award')
                    ->preloadRecordSelect()
                    ->form(fn (Tables\Actions\AttachAction $action): array => [
                        $action->getRecordSelect()
                            ->label('Select Award')
                            ->required(),
                    ]),
            ])
            ->actions([
                Tables\Actions\DetachAction::make()
                    ->label('Remove')
                    ->color('danger'),
            ])
            ->bulkActions([
                Tables\Actions\BulkActionGroup::make([
                    Tables\Actions\DetachBulkAction::make()
                        ->label('Remove Selected'),
                ]),
            ])
            ->defaultSort('year', 'desc');
    }
}