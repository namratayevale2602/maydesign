<?php
// app/Filament/Resources/AboutSectionResource.php

namespace App\Filament\Resources;

use App\Models\AboutSection;
use Filament\Forms;
use Filament\Tables;
use Filament\Resources\Resource;
use Filament\Forms\Form;
use Filament\Tables\Table;
use Filament\Forms\Components\Section;
use Filament\Forms\Components\FileUpload;
use Illuminate\Database\Eloquent\Builder;

class AboutSectionResource extends Resource
{
    protected static ?string $model = AboutSection::class;

    protected static ?string $navigationIcon = 'heroicon-o-information-circle';

    protected static ?string $navigationGroup = 'Homepage';

    protected static ?string $navigationLabel = 'About Section';

    protected static ?string $modelLabel = 'About Section';

    protected static ?string $pluralModelLabel = 'About Sections';

    public static function form(Form $form): Form
    {
        return $form
            ->schema([
                Section::make('Content')
                    ->schema([
                        Forms\Components\TextInput::make('title')
                            ->required()
                            ->maxLength(255)
                            ->placeholder('About MAY Designs')
                            ->helperText('Main title of the about section'),

                        Forms\Components\TextInput::make('highlighted_text')
                            ->label('Highlighted Text')
                            ->maxLength(100)
                            ->placeholder('MAY Designs')
                            ->helperText('Text to highlight in the title (will be colored)'),

                        Forms\Components\Textarea::make('description_1')
                            ->required()
                            ->rows(3)
                            ->placeholder('With over 15 years of experience...')
                            ->helperText('First paragraph of description'),

                        Forms\Components\Textarea::make('description_2')
                            ->required()
                            ->rows(3)
                            ->placeholder('Our team of passionate designers...')
                            ->helperText('Second paragraph of description'),

                        Forms\Components\Textarea::make('description_3')
                            ->required()
                            ->rows(3)
                            ->placeholder('We believe that great design...')
                            ->helperText('Third paragraph of description'),
                    ])
                    ->columns(1),

                Section::make('Media')
                    ->schema([
                        FileUpload::make('image')
                            ->label('About Image')
                            ->image()
                            ->directory('about')
                            ->preserveFilenames()
                            ->maxSize(5120)
                            ->imageResizeMode('cover')
                            ->imageCropAspectRatio('16:9')
                            ->imageResizeTargetWidth('800')
                            ->acceptedFileTypes(['image/jpeg', 'image/png', 'image/webp'])
                            ->helperText('Recommended size: 800x600px')
                            ->disk('public')
                            ->visibility('public'),
                    ]),

                Section::make('Statistics')
                    ->schema([
                        Forms\Components\TextInput::make('experience_years')
                            ->required()
                            ->maxLength(20)
                            ->placeholder('15+')
                            ->helperText('Years of experience number'),

                        Forms\Components\TextInput::make('experience_label')
                            ->required()
                            ->maxLength(100)
                            ->placeholder('Of Excellence')
                            ->helperText('Label for experience statistic'),

                        Forms\Components\TextInput::make('projects_count')
                            ->required()
                            ->maxLength(20)
                            ->placeholder('150+')
                            ->helperText('Projects count number'),

                        Forms\Components\TextInput::make('projects_label')
                            ->required()
                            ->maxLength(100)
                            ->placeholder('Projects')
                            ->helperText('Label for projects statistic'),
                    ])
                    ->columns(2),

                Section::make('Buttons')
                    ->schema([
                        Forms\Components\TextInput::make('primary_button_text')
                            ->required()
                            ->maxLength(50)
                            ->placeholder('Our Story')
                            ->helperText('Text for primary button'),

                        Forms\Components\TextInput::make('primary_button_link')
                            ->required()
                            ->maxLength(255)
                            ->placeholder('/about-us')
                            ->helperText('Link for primary button'),

                        Forms\Components\TextInput::make('secondary_button_text')
                            ->required()
                            ->maxLength(50)
                            ->placeholder('Meet Our Team')
                            ->helperText('Text for secondary button'),

                        Forms\Components\TextInput::make('secondary_button_link')
                            ->maxLength(255)
                            ->placeholder('/team')
                            ->helperText('Link for secondary button (optional)'),
                    ])
                    ->columns(2),

                Section::make('Settings')
                    ->schema([
                        Forms\Components\Toggle::make('is_active')
                            ->label('Active')
                            ->default(true)
                            ->required()
                            ->helperText('Show this about section on the website'),
                    ]),
            ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                Tables\Columns\ImageColumn::make('image')
                    ->label('Image')
                    ->disk('public'),

                Tables\Columns\TextColumn::make('title')
                    ->searchable()
                    ->sortable(),

                Tables\Columns\TextColumn::make('experience_years')
                    ->label('Experience')
                    ->sortable(),

                Tables\Columns\TextColumn::make('projects_count')
                    ->label('Projects')
                    ->sortable(),

                Tables\Columns\IconColumn::make('is_active')
                    ->label('Active')
                    ->boolean()
                    ->sortable(),

                Tables\Columns\TextColumn::make('created_at')
                    ->dateTime()
                    ->sortable()
                    ->toggleable(isToggledHiddenByDefault: true),
            ])
            ->filters([
                Tables\Filters\Filter::make('active')
                    ->query(fn (Builder $query): Builder => $query->where('is_active', true)),
            ])
            ->actions([
                Tables\Actions\EditAction::make(),
                Tables\Actions\DeleteAction::make(),
            ])
            ->bulkActions([
                Tables\Actions\BulkActionGroup::make([
                    Tables\Actions\DeleteBulkAction::make(),
                ]),
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
            'index' => \App\Filament\Resources\AboutSectionResource\Pages\ListAboutSections::route('/'),
            'create' => \App\Filament\Resources\AboutSectionResource\Pages\CreateAboutSection::route('/create'),
            'edit' => \App\Filament\Resources\AboutSectionResource\Pages\EditAboutSection::route('/{record}/edit'),
        ];
    }
}