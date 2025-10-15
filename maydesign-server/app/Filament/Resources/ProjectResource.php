<?php
// app/Filament/Resources/ProjectResource.php

namespace App\Filament\Resources;

use App\Filament\Resources\ProjectResource\Pages;
use App\Filament\Resources\ProjectResource\RelationManagers;
use App\Models\Project;
use Filament\Forms;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;
use Illuminate\Support\Str;

class ProjectResource extends Resource
{
    protected static ?string $model = Project::class;

    protected static ?string $navigationIcon = 'heroicon-o-building-office';

    protected static ?string $navigationGroup = 'Projects';

    protected static ?string $navigationLabel = 'Projects';

    protected static ?int $navigationSort = 1;

    public static function form(Form $form): Form
    {
        return $form
            ->schema([
                Forms\Components\Tabs::make('Project Details')
                    ->tabs([
                        Forms\Components\Tabs\Tab::make('Basic Information')
                            ->icon('heroicon-o-information-circle')
                            ->schema([
                                Forms\Components\Section::make('Project Basics')
                                    ->description('Basic project information and identification')
                                    ->schema([
                                        Forms\Components\TextInput::make('name')
                                            ->label('Project Name')
                                            ->required()
                                            ->maxLength(255)
                                            ->live(onBlur: true)
                                            ->afterStateUpdated(function (string $operation, $state, Forms\Set $set) {
                                                if ($operation === 'create') {
                                                    $set('slug', Str::slug($state));
                                                }
                                            })
                                            ->columnSpan(2),

                                        Forms\Components\TextInput::make('slug')
                                            ->label('URL Slug')
                                            ->required()
                                            ->maxLength(255)
                                            ->unique(ignoreRecord: true)
                                            ->helperText('Auto-generated from name, used in URLs')
                                            ->columnSpan(1),

                                        Forms\Components\Select::make('category')
                                            ->label('Project Category')
                                            ->options([
                                                'architecture' => 'Architecture',
                                                'interior' => 'Interior Design',
                                                'landscape' => 'Landscape Design',
                                            ])
                                            ->required()
                                            ->reactive()
                                            ->columnSpan(1),

                                        Forms\Components\Select::make('sub_category')
                                            ->label('Sub Category')
                                            ->options(function (callable $get) {
                                                $category = $get('category');
                                                
                                                $options = [
                                                    'residential' => 'Residential',
                                                    'commercial' => 'Commercial',
                                                ];
                                                
                                                if ($category === 'landscape') {
                                                    $options['public'] = 'Public Space';
                                                }
                                                
                                                return $options;
                                            })
                                            ->required()
                                            ->columnSpan(1),

                                        Forms\Components\TextInput::make('style')
                                            ->label('Design Style')
                                            ->helperText('E.g., Modern, Industrial, Rustic, Traditional')
                                            ->maxLength(255)
                                            ->columnSpan(1),

                                        Forms\Components\TextInput::make('type')
                                            ->label('Project Type')
                                            ->helperText('E.g., Residential Villa, Boutique Hotel, Office Building')
                                            ->maxLength(255)
                                            ->columnSpan(1),
                                    ])
                                    ->columns(3),

                                Forms\Components\Section::make('Project Details')
                                    ->schema([
                                        Forms\Components\TextInput::make('location')
                                            ->label('Location')
                                            ->required()
                                            ->maxLength(255)
                                            ->columnSpan(2),

                                        Forms\Components\TextInput::make('year')
                                            ->label('Completion Year')
                                            ->required()
                                            ->maxLength(4)
                                            ->numeric()
                                            ->columnSpan(1),

                                        Forms\Components\TextInput::make('area')
                                            ->label('Area')
                                            ->helperText('E.g., 4500 sq ft, 1.2 acres')
                                            ->maxLength(255)
                                            ->columnSpan(1),

                                        Forms\Components\TextInput::make('budget')
                                            ->label('Budget')
                                            ->helperText('E.g., $250,000, Confidential')
                                            ->maxLength(255)
                                            ->columnSpan(1),

                                        Forms\Components\TextInput::make('duration')
                                            ->label('Duration')
                                            ->helperText('E.g., 6 months, 12 months')
                                            ->maxLength(255)
                                            ->columnSpan(1),
                                    ])
                                    ->columns(3),
                            ]),

                        Forms\Components\Tabs\Tab::make('Content & Descriptions')
                            ->icon('heroicon-o-document-text')
                            ->schema([
                                Forms\Components\Section::make('Descriptions')
                                    ->description('Project descriptions for different contexts')
                                    ->schema([
                                        Forms\Components\Textarea::make('short_description')
                                            ->label('Short Description')
                                            ->required()
                                            ->rows(2)
                                            ->maxLength(300)
                                            ->helperText('Brief description for cards and listings (max 300 characters)')
                                            ->columnSpanFull(),

                                        Forms\Components\Textarea::make('description')
                                            ->label('Main Description')
                                            ->required()
                                            ->rows(3)
                                            ->maxLength(500)
                                            ->helperText('Main project description (max 500 characters)')
                                            ->columnSpanFull(),

                                        Forms\Components\Textarea::make('full_description')
                                            ->label('Full Description')
                                            ->rows(6)
                                            ->helperText('Detailed project description for project pages')
                                            ->columnSpanFull(),

                                        Forms\Components\Textarea::make('concept')
                                            ->label('Design Concept')
                                            ->rows(3)
                                            ->helperText('The main design concept or philosophy')
                                            ->columnSpanFull(),

                                        Forms\Components\Textarea::make('design_philosophy')
                                            ->label('Design Philosophy')
                                            ->rows(4)
                                            ->helperText('Detailed design philosophy and approach')
                                            ->columnSpanFull(),
                                    ]),
                            ]),

                        Forms\Components\Tabs\Tab::make('Media & Gallery')
                            ->icon('heroicon-o-photo')
                            ->schema([
                                Forms\Components\Section::make('Project Images')
                                    ->description('Main project image and gallery')
                                    ->schema([
                                        Forms\Components\FileUpload::make('main_image')
                                            ->label('Main Project Image')
                                            ->image()
                                            ->directory('projects/main')
                                            ->required()
                                            ->helperText('Primary image displayed in project listings')
                                            ->columnSpanFull(),

                                        Forms\Components\FileUpload::make('images')
                                            ->label('Additional Images')
                                            ->image()
                                            ->directory('projects/gallery')
                                            ->multiple()
                                            ->maxFiles(20)
                                            ->reorderable()
                                            ->helperText('Additional project images for gallery (max 20)')
                                            ->columnSpanFull(),
                                    ]),

                                Forms\Components\Section::make('Before & After')
                                    ->description('Before and after comparison images')
                                    ->schema([
                                        Forms\Components\Repeater::make('before_after')
                                            ->label('Before & After Comparisons')
                                            ->schema([
                                                Forms\Components\FileUpload::make('before')
                                                    ->label('Before Image')
                                                    ->image()
                                                    ->directory('projects/before-after')
                                                    ->required()
                                                    ->columnSpan(1),

                                                Forms\Components\FileUpload::make('after')
                                                    ->label('After Image')
                                                    ->image()
                                                    ->directory('projects/before-after')
                                                    ->required()
                                                    ->columnSpan(1),

                                                Forms\Components\TextInput::make('caption')
                                                    ->label('Caption')
                                                    ->maxLength(255)
                                                    ->helperText('E.g., Main facade transformation')
                                                    ->columnSpan(2),
                                            ])
                                            ->columns(2)
                                            ->defaultItems(0)
                                            ->helperText('Add before and after image comparisons')
                                            ->columnSpanFull(),
                                    ]),

                                Forms\Components\Section::make('Videos')
                                    ->description('Project videos and virtual tours')
                                    ->schema([
                                        Forms\Components\Textarea::make('videos')
                                            ->label('Video URLs')
                                            ->rows(3)
                                            ->helperText('Enter video URLs, one per line. Supported: YouTube, Vimeo')
                                            ->placeholder("https://youtube.com/watch?v=...\nhttps://vimeo.com/...")
                                            ->columnSpanFull(),
                                    ]),
                            ]),

                        Forms\Components\Tabs\Tab::make('Additional Information')
                            ->icon('heroicon-o-tag')
                            ->schema([
                                Forms\Components\Section::make('Project Highlights')
                                    ->description('Key features and highlights of the project')
                                    ->schema([
                                        Forms\Components\Textarea::make('highlights')
                                            ->label('Project Highlights')
                                            ->rows(4)
                                            ->helperText('Enter key highlights, one per line')
                                            ->placeholder("Sustainable materials\nSmart home integration\nPanoramic views\nIndoor-outdoor flow")
                                            ->columnSpanFull(),
                                    ]),

                                Forms\Components\Section::make('Tags & Classification')
                                    ->description('Tags for filtering and categorization')
                                    ->schema([
                                        Forms\Components\TagsInput::make('tags')
                                            ->label('Project Tags')
                                            ->helperText('Add tags for filtering and categorization')
                                            ->placeholder('Add tag...')
                                            ->columnSpanFull(),
                                    ]),

                                Forms\Components\Section::make('Project Settings')
                                    ->description('Visibility and display settings')
                                    ->schema([
                                        Forms\Components\Toggle::make('featured')
                                            ->label('Featured Project')
                                            ->helperText('Show this project as featured')
                                            ->default(false)
                                            ->inline()
                                            ->columnSpan(1),

                                        Forms\Components\Toggle::make('is_active')
                                            ->label('Active Project')
                                            ->helperText('Show this project on the website')
                                            ->default(true)
                                            ->inline()
                                            ->columnSpan(1),

                                        Forms\Components\TextInput::make('sort_order')
                                            ->label('Sort Order')
                                            ->numeric()
                                            ->default(0)
                                            ->helperText('Lower numbers appear first')
                                            ->columnSpan(1),
                                    ])
                                    ->columns(3),
                            ]),
                    ])
                    ->columnSpanFull()
                    ->persistTabInQueryString(),
            ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                Tables\Columns\ImageColumn::make('main_image')
                    ->label('Image')
                    ->size(60)
                    ->circular(),

                Tables\Columns\TextColumn::make('name')
                    ->label('Project Name')
                    ->searchable()
                    ->sortable()
                    ->description(fn (Project $record): string => $record->location ?? '')
                    ->wrap(),

                Tables\Columns\TextColumn::make('category')
                    ->label('Category')
                    ->badge()
                    ->color(fn (string $state): string => match ($state) {
                        'architecture' => 'success',
                        'interior' => 'warning',
                        'landscape' => 'info',
                        default => 'gray',
                    })
                    ->formatStateUsing(fn (string $state): string => match ($state) {
                        'architecture' => 'Architecture',
                        'interior' => 'Interior',
                        'landscape' => 'Landscape',
                        default => $state,
                    }),

                Tables\Columns\TextColumn::make('sub_category')
                    ->label('Sub Category')
                    ->badge()
                    ->color('gray')
                    ->formatStateUsing(fn (string $state): string => ucfirst($state)),

                Tables\Columns\TextColumn::make('year')
                    ->label('Year')
                    ->sortable()
                    ->alignCenter(),

                Tables\Columns\IconColumn::make('featured')
                    ->label('Featured')
                    ->boolean()
                    ->alignCenter()
                    ->trueIcon('heroicon-o-star')
                    ->trueColor('warning')
                    ->falseIcon('heroicon-o-star')
                    ->falseColor('gray'),

                Tables\Columns\IconColumn::make('is_active')
                    ->label('Active')
                    ->boolean()
                    ->alignCenter()
                    ->trueColor('success')
                    ->falseColor('danger'),

                Tables\Columns\TextColumn::make('sort_order')
                    ->label('Order')
                    ->sortable()
                    ->alignCenter(),

                Tables\Columns\TextColumn::make('created_at')
                    ->label('Created')
                    ->dateTime('M j, Y')
                    ->sortable()
                    ->toggleable(isToggledHiddenByDefault: true),

                Tables\Columns\TextColumn::make('updated_at')
                    ->label('Updated')
                    ->dateTime('M j, Y')
                    ->sortable()
                    ->toggleable(isToggledHiddenByDefault: true),
            ])
            ->filters([
                Tables\Filters\SelectFilter::make('category')
                    ->options([
                        'architecture' => 'Architecture',
                        'interior' => 'Interior Design',
                        'landscape' => 'Landscape Design',
                    ])
                    ->label('Category'),

                Tables\Filters\SelectFilter::make('sub_category')
                    ->options([
                        'residential' => 'Residential',
                        'commercial' => 'Commercial',
                        'public' => 'Public Space',
                    ])
                    ->label('Sub Category'),

                Tables\Filters\Filter::make('featured')
                    ->label('Featured Projects')
                    ->query(fn ($query) => $query->where('featured', true)),

                Tables\Filters\Filter::make('is_active')
                    ->label('Active Projects')
                    ->query(fn ($query) => $query->where('is_active', true)),

                Tables\Filters\Filter::make('year')
                    ->form([
                        Forms\Components\TextInput::make('year')
                            ->label('Year')
                            ->numeric()
                            ->placeholder('2024'),
                    ])
                    ->query(function ($query, array $data) {
                        if (!empty($data['year'])) {
                            $query->where('year', $data['year']);
                        }
                    }),
            ])
            ->actions([
                Tables\Actions\ActionGroup::make([
                    Tables\Actions\ViewAction::make()
                        ->color('primary'),
                    Tables\Actions\EditAction::make()
                        ->color('warning'),
                    Tables\Actions\DeleteAction::make()
                        ->color('danger'),
                ]),
            ])
            ->bulkActions([
                Tables\Actions\BulkActionGroup::make([
                    Tables\Actions\DeleteBulkAction::make(),
                ]),
            ])
            ->defaultSort('sort_order', 'asc')
            ->reorderable('sort_order')
            ->emptyStateHeading('No projects yet')
            ->emptyStateDescription('Once you add your first project, it will appear here.')
            ->emptyStateIcon('heroicon-o-building-office')
            ->emptyStateActions([
                Tables\Actions\Action::make('create')
                    ->label('Create project')
                    ->url(static::getUrl('create'))
                    ->icon('heroicon-o-plus')
                    ->button(),
            ])
            ->groups([
                Tables\Grouping\Group::make('category')
                    ->label('Category')
                    ->collapsible(),
                Tables\Grouping\Group::make('year')
                    ->label('Year')
                    ->collapsible(),
            ]);
    }

    public static function getRelations(): array
    {
        return [
            RelationManagers\TeamRelationManager::class,
            RelationManagers\TestimonialsRelationManager::class,
            RelationManagers\AwardsRelationManager::class,
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

    public static function getGloballySearchableAttributes(): array
    {
        return ['name', 'location', 'description'];
    }

    public static function getNavigationBadge(): ?string
    {
        return static::getModel()::count();
    }

    public static function getNavigationBadgeColor(): string|array|null
    {
        return static::getModel()::count() > 0 ? 'success' : 'gray';
    }
}