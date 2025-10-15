<?php
// app/Filament/Resources/AwardResource.php

namespace App\Filament\Resources;

use App\Filament\Resources\AwardResource\Pages;
use App\Models\Award;
use Filament\Forms;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;
use Illuminate\Support\Str;

class AwardResource extends Resource
{
    protected static ?string $model = Award::class;

    protected static ?string $navigationIcon = 'heroicon-o-trophy';

    protected static ?string $navigationGroup = 'Homepage';

    public static function form(Form $form): Form
    {
        return $form
            ->schema([
                Forms\Components\Section::make('Award Information')
                    ->schema([
                        Forms\Components\TextInput::make('title')
                            ->required()
                            ->maxLength(255)
                            ->live(onBlur: true)
                            ->afterStateUpdated(function (string $operation, $state, Forms\Set $set) {
                                if ($operation === 'edit') {
                                    return;
                                }
                                $set('slug', Str::slug($state));
                            }),
                        
                        Forms\Components\TextInput::make('organization')
                            ->required()
                            ->maxLength(255),
                        
                        Forms\Components\Select::make('year')
                            ->options(function () {
                                $currentYear = date('Y');
                                $years = [];
                                for ($i = $currentYear; $i >= 2000; $i--) {
                                    $years[$i] = $i;
                                }
                                return $years;
                            })
                            ->required(),
                        
                        Forms\Components\TextInput::make('category')
                            ->required()
                            ->maxLength(255),
                        
                        Forms\Components\Textarea::make('description')
                            ->required()
                            ->rows(3)
                            ->maxLength(500),
                    ])
                    ->columns(2),
                
                Forms\Components\Section::make('Media & Links')
                    ->schema([
                        Forms\Components\FileUpload::make('image')
                            ->label('Main Image')
                            ->image()
                            ->directory('awards')
                            ->required(),
                        
                        Forms\Components\FileUpload::make('photos')
                            ->label('Additional Photos')
                            ->image()
                            ->directory('awards/gallery')
                            ->multiple()
                            ->maxFiles(10),
                        
                        Forms\Components\TextInput::make('video')
                            ->label('Video URL')
                            ->url()
                            ->maxLength(255),
                        
                    ])
                    ->columns(2),
                
                Forms\Components\Section::make('Details')
                    ->schema([
                        Forms\Components\Textarea::make('details.fullDescription')
                            ->label('Full Description')
                            ->rows(4),
                        
                        Forms\Components\Repeater::make('details.projectTeam')
                            ->label('Project Team')
                            ->schema([
                                Forms\Components\TextInput::make('member')
                                    ->required()
                                    ->maxLength(255),
                            ])
                            ->defaultItems(0),
                        
                        Forms\Components\TextInput::make('details.location')
                            ->label('Location')
                            ->maxLength(255),
                        
                        Forms\Components\TextInput::make('details.completionDate')
                            ->label('Completion Date')
                            ->maxLength(255),
                        
                        Forms\Components\Textarea::make('details.awardSignificance')
                            ->label('Award Significance')
                            ->rows(3),
                    ])
                    ->columns(1),
                
                Forms\Components\Section::make('Settings')
                    ->schema([
                        Forms\Components\Toggle::make('featured')
                            ->label('Featured Award')
                            ->default(false),
                        
                        Forms\Components\Toggle::make('is_active')
                            ->label('Active')
                            ->default(true),
                        
                        Forms\Components\TextInput::make('sort_order')
                            ->label('Sort Order')
                            ->numeric()
                            ->default(0),
                    ])
                    ->columns(3),
            ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                Tables\Columns\ImageColumn::make('image')
                    ->label('Image'),
                
                Tables\Columns\TextColumn::make('title')
                    ->searchable()
                    ->sortable(),
                
                Tables\Columns\TextColumn::make('organization')
                    ->searchable()
                    ->sortable(),
                
                Tables\Columns\TextColumn::make('year')
                    ->sortable(),
                
                Tables\Columns\TextColumn::make('category')
                    ->searchable(),
                
                Tables\Columns\IconColumn::make('featured')
                    ->boolean(),
                
                Tables\Columns\IconColumn::make('is_active')
                    ->label('Active')
                    ->boolean(),
                
                Tables\Columns\TextColumn::make('sort_order')
                    ->sortable(),
                
                Tables\Columns\TextColumn::make('created_at')
                    ->dateTime()
                    ->sortable()
                    ->toggleable(isToggledHiddenByDefault: true),
            ])
            ->filters([
                Tables\Filters\SelectFilter::make('year')
                    ->options(function () {
                        return Award::select('year')
                            ->distinct()
                            ->orderBy('year', 'desc')
                            ->pluck('year', 'year')
                            ->toArray();
                    }),
                
                Tables\Filters\Filter::make('featured')
                    ->query(fn ($query) => $query->where('featured', true)),
                
                Tables\Filters\Filter::make('is_active')
                    ->query(fn ($query) => $query->where('is_active', true)),
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
            ->defaultSort('sort_order', 'asc');
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
            'index' => Pages\ListAwards::route('/'),
            'create' => Pages\CreateAward::route('/create'),
            'edit' => Pages\EditAward::route('/{record}/edit'),
        ];
    }
}