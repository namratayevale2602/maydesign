<?php
// app/Filament/Resources/ProjectResource/RelationManagers/TestimonialsRelationManager.php

namespace App\Filament\Resources\ProjectResource\RelationManagers;

use Filament\Forms;
use Filament\Forms\Form;
use Filament\Resources\RelationManagers\RelationManager;
use Filament\Tables;
use Filament\Tables\Table;

class TestimonialsRelationManager extends RelationManager
{
    protected static string $relationship = 'testimonials';

    protected static ?string $title = 'Project Testimonials';

    protected static ?string $icon = 'heroicon-o-chat-bubble-left-right';

    public function form(Form $form): Form
    {
        return $form
            ->schema([
                Forms\Components\Section::make('Testimonial Details')
                    ->schema([
                        Forms\Components\Textarea::make('text')
                            ->label('Testimonial Text')
                            ->required()
                            ->rows(4)
                            ->maxLength(1000)
                            ->helperText('What the client said about the project')
                            ->columnSpanFull(),

                        Forms\Components\TextInput::make('author')
                            ->label('Author Name')
                            ->required()
                            ->maxLength(255)
                            ->columnSpan(2),

                        Forms\Components\TextInput::make('role')
                            ->label('Author Role/Title')
                            ->required()
                            ->maxLength(255)
                            ->helperText('E.g., Homeowner, CEO, Project Manager')
                            ->columnSpan(2),

                        Forms\Components\FileUpload::make('image')
                            ->label('Author Photo')
                            ->image()
                            ->directory('project-testimonials')
                            ->avatar()
                            ->columnSpan(2),

                        Forms\Components\TextInput::make('sort_order')
                            ->label('Sort Order')
                            ->numeric()
                            ->default(0)
                            ->helperText('Lower numbers appear first')
                            ->columnSpan(1),

                        Forms\Components\Toggle::make('is_active')
                            ->label('Active')
                            ->helperText('Show this testimonial on the website')
                            ->default(true)
                            ->inline()
                            ->columnSpan(1),
                    ])
                    ->columns(3),
            ]);
    }

    public function table(Table $table): Table
    {
        return $table
            ->recordTitleAttribute('author')
            ->columns([
                Tables\Columns\ImageColumn::make('image')
                    ->label('Photo')
                    ->circular()
                    ->size(50),

                Tables\Columns\TextColumn::make('author')
                    ->label('Author')
                    ->searchable()
                    ->sortable(),

                Tables\Columns\TextColumn::make('role')
                    ->label('Role')
                    ->searchable()
                    ->sortable()
                    ->wrap(),

                Tables\Columns\TextColumn::make('text')
                    ->label('Testimonial')
                    ->limit(50)
                    ->wrap(),

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
                    ->label('Added')
                    ->dateTime('M j, Y')
                    ->sortable()
                    ->toggleable(isToggledHiddenByDefault: true),
            ])
            ->filters([
                Tables\Filters\Filter::make('is_active')
                    ->label('Active Testimonials')
                    ->query(fn ($query) => $query->where('is_active', true)),
            ])
            ->headerActions([
                Tables\Actions\CreateAction::make()
                    ->label('Add Testimonial')
                    ->icon('heroicon-o-plus'),
            ])
            ->actions([
                Tables\Actions\ActionGroup::make([
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
            ->reorderable('sort_order');
    }
}