<?php
// app/Filament/Resources/PressArticleResource.php

namespace App\Filament\Resources;

use App\Filament\Resources\PressArticleResource\Pages;
use App\Models\PressArticle;
use Filament\Forms;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;
use Illuminate\Support\Str;

class PressArticleResource extends Resource
{
    protected static ?string $model = PressArticle::class;

    protected static ?string $navigationIcon = 'heroicon-o-newspaper';
    
    protected static ?string $navigationGroup = 'Homepage';
    
    protected static ?string $navigationLabel = 'Press Articles';
    
    protected static ?int $navigationSort = 3;

    public static function form(Form $form): Form
    {
        return $form
            ->schema([
                Forms\Components\Section::make('Basic Information')
                    ->schema([
                        Forms\Components\Grid::make()
                            ->schema([
                                Forms\Components\TextInput::make('publication')
                                    ->required()
                                    ->maxLength(255),
                                Forms\Components\TextInput::make('title')
                                    ->required()
                                    ->maxLength(255)
                                    ->live(onBlur: true)
                                    ->afterStateUpdated(function ($set, $state) {
                                        $set('slug', Str::slug($state));
                                    }),
                            ]),
                        Forms\Components\Grid::make()
                            ->schema([
                                Forms\Components\DatePicker::make('date')
                                    ->required()
                                    ->default(now()),
                                Forms\Components\TextInput::make('category')
                                    ->required()
                                    ->maxLength(255),
                            ]),
                        Forms\Components\Textarea::make('excerpt')
                            ->required()
                            ->rows(3)
                            ->maxLength(500),
                        Forms\Components\RichEditor::make('full_article')
                            ->columnSpanFull()
                            ->fileAttachmentsDirectory('uploads/press/articles'),
                    ]),
                    
                Forms\Components\Section::make('Media')
                    ->schema([
                        Forms\Components\FileUpload::make('image')
                            ->label('Main Image')
                            ->directory('uploads/press')
                            ->image()
                            ->required()
                            ->imageEditor()
                            ->maxSize(2048)
                            ->helperText('Recommended size: 1200x800px'),
                            
                        Forms\Components\FileUpload::make('additional_images')
                            ->label('Additional Images')
                            ->directory('uploads/press/gallery')
                            ->image()
                            ->multiple()
                            ->maxFiles(6)
                            ->reorderable()
                            ->maxSize(2048),
                            
                        Forms\Components\TextInput::make('video_interview')
                            ->label('Video Interview URL')
                            ->url()
                            ->maxLength(255),
                    ]),
                    
                Forms\Components\Section::make('Publication Details')
                    ->schema([
                        Forms\Components\Grid::make()
                            ->schema([
                                Forms\Components\TextInput::make('publication_details.website')
                                    ->label('Publication Website')
                                    ->url()
                                    ->maxLength(255),
                                Forms\Components\TextInput::make('publication_details.circulation')
                                    ->label('Circulation')
                                    ->maxLength(255),
                            ]),
                        Forms\Components\Grid::make()
                            ->schema([
                                Forms\Components\TextInput::make('publication_details.audience')
                                    ->label('Primary Audience')
                                    ->maxLength(255),
                                Forms\Components\TextInput::make('publication_details.founded')
                                    ->label('Year Founded')
                                    ->maxLength(255),
                            ]),
                    ]),
                    
                Forms\Components\Section::make('Additional Information')
                    ->schema([
                        Forms\Components\Repeater::make('key_quotes')
                            ->label('Key Quotes')
                            ->schema([
                                Forms\Components\Textarea::make('quote')
                                    ->label('Quote')
                                    ->required()
                                    ->rows(2)
                                    ->maxLength(500),
                            ])
                            ->defaultItems(0)
                            ->maxItems(5),
                            
                        Forms\Components\Repeater::make('project_team')
                            ->label('Project Team')
                            ->schema([
                                Forms\Components\TextInput::make('member')
                                    ->label('Team Member')
                                    ->required()
                                    ->maxLength(255),
                            ])
                            ->defaultItems(0)
                            ->maxItems(10),
                    ]),
                    
                Forms\Components\Section::make('Settings')
                    ->schema([
                        Forms\Components\Grid::make()
                            ->schema([
                                Forms\Components\Toggle::make('featured')
                                    ->label('Featured Article')
                                    ->default(false),
                                Forms\Components\Toggle::make('is_active')
                                    ->label('Active')
                                    ->default(true),
                                Forms\Components\TextInput::make('sort_order')
                                    ->numeric()
                                    ->default(0),
                            ]),
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
                    
                Tables\Columns\TextColumn::make('publication')
                    ->searchable()
                    ->sortable(),
                    
                Tables\Columns\TextColumn::make('title')
                    ->searchable()
                    ->sortable()
                    ->limit(50),
                    
                Tables\Columns\TextColumn::make('date')
                    ->date()
                    ->sortable(),
                    
                Tables\Columns\TextColumn::make('category')
                    ->searchable()
                    ->sortable(),
                    
                Tables\Columns\IconColumn::make('featured')
                    ->boolean()
                    ->sortable(),
                    
                Tables\Columns\IconColumn::make('is_active')
                    ->label('Active')
                    ->boolean()
                    ->sortable(),
                    
                Tables\Columns\TextColumn::make('sort_order')
                    ->sortable(),
            ])
            ->filters([
                Tables\Filters\Filter::make('featured')
                    ->query(fn ($query) => $query->where('featured', true)),
                    
                Tables\Filters\Filter::make('active')
                    ->query(fn ($query) => $query->where('is_active', true)),
                    
                Tables\Filters\SelectFilter::make('category')
                    ->options([
                        'Feature' => 'Feature',
                        'Cover Story' => 'Cover Story',
                        'Interview' => 'Interview',
                        'Profile' => 'Profile',
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
            ->defaultSort('date', 'desc');
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
            'index' => Pages\ListPressArticles::route('/'),
            'create' => Pages\CreatePressArticle::route('/create'),
            'edit' => Pages\EditPressArticle::route('/{record}/edit'),
        ];
    }
}