<?php
// app/Filament/Resources/ProjectResource.php

namespace App\Filament\Resources;

use App\Filament\Resources\ProjectResource\Pages;
use App\Models\Project;
use Filament\Forms;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;

class ProjectResource extends Resource
{
    protected static ?string $model = Project::class;

    protected static ?string $navigationIcon = 'heroicon-o-building-office';
    
    protected static ?string $navigationGroup = 'Projects';


    public static function form(Form $form): Form
    {
        return $form
            ->schema([
                Forms\Components\Section::make('Basic Information')
                    ->schema([
                        Forms\Components\TextInput::make('name')
                            ->required()
                            ->maxLength(255)
                            ->live(onBlur: true)
                            ->afterStateUpdated(function ($state, $set) {
                                $set('slug', \Illuminate\Support\Str::slug($state));
                            }),
                        Forms\Components\TextInput::make('slug')
                            ->required()
                            ->maxLength(255)
                            ->unique(ignoreRecord: true),
                        Forms\Components\Select::make('category')
                            ->options([
                                'architecture' => 'Architecture',
                                'interior' => 'Interior',
                                'landscape' => 'Landscape',
                            ])
                            ->required(),
                        Forms\Components\Select::make('sub_category')
                            ->options([
                                'residential' => 'Residential',
                                'commercial' => 'Commercial',
                                'public' => 'Public',
                            ])
                            ->required(),
                        Forms\Components\TextInput::make('type')
                            ->maxLength(255),
                        Forms\Components\TextInput::make('style')
                            ->maxLength(255),
                    ])->columns(2),

                Forms\Components\Section::make('Descriptions')
                    ->schema([
                        Forms\Components\Textarea::make('short_description')
                            ->required()
                            ->maxLength(500),
                        Forms\Components\Textarea::make('description')
                            ->required()
                            ->maxLength(2000),
                        Forms\Components\Textarea::make('full_description')
                            ->maxLength(10000),
                        Forms\Components\Textarea::make('concept')
                            ->maxLength(1000),
                        Forms\Components\Textarea::make('design_philosophy')
                            ->maxLength(2000),
                    ]),

                Forms\Components\Section::make('Project Details')
                    ->schema([
                        Forms\Components\TextInput::make('location')
                            ->required()
                            ->maxLength(255),
                        Forms\Components\Select::make('year')
                            ->options(function () {
                                $years = range(date('Y'), 2000);
                                return array_combine($years, $years);
                            })
                            ->required(),
                        Forms\Components\TextInput::make('area')
                            ->maxLength(255),
                        Forms\Components\TextInput::make('budget')
                            ->maxLength(255),
                        Forms\Components\TextInput::make('duration')
                            ->maxLength(255),
                    ])->columns(2),

                Forms\Components\Section::make('Awards')
                    ->schema([
                        Forms\Components\Repeater::make('awards')
                            ->schema([
                                Forms\Components\TextInput::make('name')
                                    ->required()
                                    ->maxLength(255),
                                Forms\Components\TextInput::make('organization')
                                    ->required()
                                    ->maxLength(255),
                                Forms\Components\Select::make('year')
                                    ->options(function () {
                                        $years = range(date('Y'), 2000);
                                        return array_combine($years, $years);
                                    }),
                                Forms\Components\Textarea::make('description')
                                    ->maxLength(1000),
                                Forms\Components\Toggle::make('featured')
                                    ->default(false),
                            ])
                            ->columns(2)
                            ->columnSpanFull(),
                    ]),

                Forms\Components\Section::make('Media & Content')
                    ->schema([
                        Forms\Components\FileUpload::make('images')
                            ->multiple()
                            ->image()
                            ->directory('projects')
                            ->reorderable(),
                        Forms\Components\KeyValue::make('highlights'),
                        Forms\Components\KeyValue::make('tags'),
                        Forms\Components\KeyValue::make('team')
                            ->keyLabel('Name')
                            ->valueLabel('Role'),
                    ]),

                Forms\Components\Section::make('Settings')
                    ->schema([
                        Forms\Components\Toggle::make('is_featured')
                            ->default(false),
                        Forms\Components\Toggle::make('is_published')
                            ->default(true),
                        Forms\Components\TextInput::make('order_column')
                            ->numeric()
                            ->default(0),
                    ])->columns(2),
            ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                Tables\Columns\TextColumn::make('name')
                    ->searchable(),
                Tables\Columns\TextColumn::make('category')
                    ->badge()
                    ->color(fn (string $state): string => match ($state) {
                        'architecture' => 'success',
                        'interior' => 'warning',
                        'landscape' => 'info',
                    }),
                Tables\Columns\TextColumn::make('sub_category')
                    ->badge(),
                Tables\Columns\TextColumn::make('year'),
                Tables\Columns\TextColumn::make('awards_count')
                    ->label('Awards')
                    ->getStateUsing(function (Project $record): int {
                        $awards = $record->awards;
                        if (is_string($awards)) {
                            $awards = json_decode($awards, true) ?? [];
                        }
                        return is_array($awards) ? count($awards) : 0;
                    })
                    ->badge()
                    ->color(fn ($state): string => $state > 0 ? 'success' : 'gray'),
                Tables\Columns\IconColumn::make('is_featured')
                    ->boolean(),
                Tables\Columns\IconColumn::make('is_published')
                    ->boolean(),
                Tables\Columns\TextColumn::make('order_column')
                    ->sortable(),
            ])
            ->filters([
                Tables\Filters\SelectFilter::make('category')
                    ->options([
                        'architecture' => 'Architecture',
                        'interior' => 'Interior',
                        'landscape' => 'Landscape',
                    ]),
                Tables\Filters\Filter::make('has_awards')
                    ->label('Has Awards')
                    ->query(fn ($query) => $query->hasAwards()),
                Tables\Filters\Filter::make('featured')
                    ->query(fn ($query) => $query->where('is_featured', true)),
                Tables\Filters\Filter::make('published')
                    ->query(fn ($query) => $query->where('is_published', true)),
            ])
            ->actions([
                Tables\Actions\EditAction::make(),
            ])
            ->bulkActions([
                Tables\Actions\DeleteBulkAction::make(),
            ]);
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
            'index' => Pages\ListProjects::route('/'),
            'create' => Pages\CreateProject::route('/create'),
            'edit' => Pages\EditProject::route('/{record}/edit'),
        ];
    }
}