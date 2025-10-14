<?php
// app/Filament/Resources/StatResource.php

namespace App\Filament\Resources;

use App\Models\Stat;
use Filament\Forms;
use Filament\Tables;
use Filament\Resources\Resource;
use Filament\Forms\Form;
use Filament\Tables\Table;
use Filament\Forms\Components\Section;
use Illuminate\Database\Eloquent\Builder;

class StatResource extends Resource
{
    protected static ?string $model = Stat::class;

    protected static ?string $navigationIcon = 'heroicon-o-chart-bar';

    protected static ?string $navigationGroup = 'Homepage';

    protected static ?string $navigationLabel = 'Statistics';

    protected static ?string $modelLabel = 'Statistic';

    protected static ?string $pluralModelLabel = 'Statistics';

    public static function form(Form $form): Form
    {
        return $form
            ->schema([
                Section::make('Statistic Information')
                    ->schema([
                        Forms\Components\TextInput::make('number')
                            ->required()
                            ->maxLength(50)
                            ->placeholder('150+')
                            ->helperText('The main number to display (e.g., 150, 15, 50)'),

                        Forms\Components\TextInput::make('suffix')
                            ->maxLength(10)
                            ->placeholder('+')
                            ->helperText('Optional suffix (e.g., +, %, K, M)'),

                        Forms\Components\TextInput::make('label')
                            ->required()
                            ->maxLength(100)
                            ->placeholder('Projects Completed')
                            ->helperText('The label text below the number'),
                    ])
                    ->columns(1),

                Section::make('Display Settings')
                    ->schema([
                        Forms\Components\TextInput::make('icon')
                            ->maxLength(50)
                            ->placeholder('heroicon-o-trophy')
                            ->helperText('Optional icon name (for future use)'),

                        Forms\Components\TextInput::make('order')
                            ->numeric()
                            ->default(0)
                            ->required()
                            ->helperText('Display order (lower numbers show first)'),

                        Forms\Components\Toggle::make('is_active')
                            ->label('Active')
                            ->default(true)
                            ->required()
                            ->helperText('Show this statistic on the website'),
                    ])
                    ->columns(2),
            ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                Tables\Columns\TextColumn::make('formatted_number')
                    ->label('Number')
                    ->sortable()
                    ->searchable(),

                Tables\Columns\TextColumn::make('label')
                    ->sortable()
                    ->searchable(),

                Tables\Columns\TextColumn::make('order')
                    ->sortable(),

                Tables\Columns\IconColumn::make('is_active')
                    ->label('Active')
                    ->boolean()
                    ->sortable(),

                Tables\Columns\TextColumn::make('created_at')
                    ->dateTime()
                    ->sortable()
                    ->toggleable(isToggledHiddenByDefault: true),

                Tables\Columns\TextColumn::make('updated_at')
                    ->dateTime()
                    ->sortable()
                    ->toggleable(isToggledHiddenByDefault: true),
            ])
            ->filters([
                Tables\Filters\Filter::make('active')
                    ->query(fn (Builder $query): Builder => $query->where('is_active', true)),

                Tables\Filters\SelectFilter::make('order')
                    ->options([
                        '0' => 'First',
                        '1' => 'Second', 
                        '2' => 'Third',
                        '3' => 'Fourth',
                    ]),
            ])
            ->actions([
                Tables\Actions\EditAction::make(),
                Tables\Actions\DeleteAction::make(),
            ])
            ->bulkActions([
                Tables\Actions\BulkActionGroup::make([
                    Tables\Actions\DeleteBulkAction::make(),
                ]),
            ])
            ->defaultSort('order', 'asc')
            ->reorderable('order');
    }

    public static function getRelations(): array
    {
        return [
            //
        ];
    }

    public static function getPages(): array
    {
        return [
            'index' => \App\Filament\Resources\StatResource\Pages\ListStats::route('/'),
            'create' => \App\Filament\Resources\StatResource\Pages\CreateStat::route('/create'),
            'edit' => \App\Filament\Resources\StatResource\Pages\EditStat::route('/{record}/edit'),
        ];
    }
}