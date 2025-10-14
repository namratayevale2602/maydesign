<?php
// app/Filament/Resources/TestimonialResource.php

namespace App\Filament\Resources;

use App\Models\Testimonial;
use Filament\Forms;
use Filament\Tables;
use Filament\Resources\Resource;
use Filament\Forms\Form;
use Filament\Tables\Table;
use Filament\Forms\Components\Section;
use Filament\Forms\Components\FileUpload;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Support\HtmlString;

class TestimonialResource extends Resource
{
    protected static ?string $model = Testimonial::class;

    protected static ?string $navigationIcon = 'heroicon-o-chat-bubble-left-right';

    protected static ?string $navigationGroup = 'Homepage';

    protected static ?string $navigationLabel = 'Testimonials';

    protected static ?string $modelLabel = 'Testimonial';

    protected static ?string $pluralModelLabel = 'Testimonials';

    public static function form(Form $form): Form
    {
        return $form
            ->schema([
                Section::make('Client Information')
                    ->schema([
                        Forms\Components\TextInput::make('name')
                            ->required()
                            ->maxLength(255)
                            ->placeholder('Sarah Johnson')
                            ->helperText('Full name of the client'),

                        Forms\Components\TextInput::make('position')
                            ->required()
                            ->maxLength(255)
                            ->placeholder('Homeowner')
                            ->helperText('Client\'s position or relation'),

                        Forms\Components\Select::make('rating')
                            ->required()
                            ->options([
                                1 => '1 Star',
                                2 => '2 Stars',
                                3 => '3 Stars',
                                4 => '4 Stars',
                                5 => '5 Stars',
                            ])
                            ->default(5)
                            ->helperText('Client rating (1-5 stars)'),
                    ])
                    ->columns(3),

                Section::make('Testimonial Content')
                    ->schema([
                        Forms\Components\Textarea::make('content')
                            ->required()
                            ->rows(4)
                            ->placeholder('MAY Designs transformed our outdated home...')
                            ->helperText('Full testimonial content')
                            ->columnSpanFull(),
                    ]),

                Section::make('Media')
                    ->schema([
                        FileUpload::make('image')
                            ->label('Client Photo')
                            ->image()
                            ->directory('testimonials')
                            ->preserveFilenames()
                            ->maxSize(2048)
                            ->imageResizeMode('cover')
                            ->imageCropAspectRatio('1:1')
                            ->imageResizeTargetWidth('200')
                            ->acceptedFileTypes(['image/jpeg', 'image/png', 'image/webp'])
                            ->helperText('Recommended size: 200x200px (square)')
                            ->disk('public') // Changed from 'uploads' to 'public'
                            ->visibility('public')
                            ->imagePreviewHeight('150')
                            ->loadingIndicatorPosition('left')
                            ->panelAspectRatio('1:1')
                            ->panelLayout('integrated')
                            ->removeUploadedFileButtonPosition('right')
                            ->uploadButtonPosition('left')
                            ->uploadProgressIndicatorPosition('left'),
                        
                        // Display current image if exists
                        Forms\Components\Placeholder::make('current_image')
                            ->label('Current Photo')
                            ->content(function ($record) {
                                if (!$record?->image) {
                                    return new HtmlString('<div class="text-gray-500">No photo uploaded</div>');
                                }
                                
                                $imageUrl = asset('uploads/' . $record->image);
                                return new HtmlString(
                                    '<div class="space-y-2">' .
                                    '<div class="font-medium text-sm text-gray-700">Current Photo:</div>' .
                                    '<img src="' . $imageUrl . '" alt="Current client photo" class="w-32 h-32 rounded-full object-cover shadow-md" />' .
                                    '<div class="text-xs text-gray-500">' . $record->image . '</div>' .
                                    '</div>'
                                );
                            })
                            ->hidden(fn ($record) => $record === null),
                    ])
                    ->columns(2),

                Section::make('Display Settings')
                    ->schema([
                        Forms\Components\TextInput::make('order')
                            ->numeric()
                            ->default(0)
                            ->required()
                            ->helperText('Display order (lower numbers show first)'),

                        Forms\Components\Toggle::make('featured')
                            ->label('Featured')
                            ->default(false)
                            ->helperText('Show in the featured testimonials grid'),

                        Forms\Components\Toggle::make('is_active')
                            ->label('Active')
                            ->default(true)
                            ->required()
                            ->helperText('Show this testimonial on the website'),
                    ])
                    ->columns(3),
            ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                Tables\Columns\ImageColumn::make('image')
                    ->label('Photo')
                    ->disk('public') // Changed from 'uploads' to 'public'
                    ->height(50)
                    ->width(50)
                    ->circular()
                    ->defaultImageUrl(function ($record) {
                        return 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80';
                    })
                    ->extraImgAttributes(['class' => 'object-cover']),

                Tables\Columns\TextColumn::make('name')
                    ->searchable()
                    ->sortable(),

                Tables\Columns\TextColumn::make('position')
                    ->searchable()
                    ->sortable()
                    ->wrap(),

                Tables\Columns\TextColumn::make('rating')
                    ->sortable()
                    ->formatStateUsing(fn ($state) => str_repeat('⭐', $state))
                    ->alignment('center'),

                Tables\Columns\TextColumn::make('content')
                    ->limit(50)
                    ->wrap()
                    ->searchable(),

                Tables\Columns\IconColumn::make('featured')
                    ->label('Featured')
                    ->boolean()
                    ->sortable(),

                Tables\Columns\IconColumn::make('is_active')
                    ->label('Active')
                    ->boolean()
                    ->sortable(),

                Tables\Columns\TextColumn::make('order')
                    ->sortable(),

                Tables\Columns\TextColumn::make('created_at')
                    ->dateTime()
                    ->sortable()
                    ->toggleable(isToggledHiddenByDefault: true),
            ])
            ->filters([
                Tables\Filters\Filter::make('active')
                    ->query(fn (Builder $query): Builder => $query->where('is_active', true)),

                Tables\Filters\Filter::make('featured')
                    ->query(fn (Builder $query): Builder => $query->where('featured', true)),

                Tables\Filters\SelectFilter::make('rating')
                    ->options([
                        1 => '1 Star',
                        2 => '2 Stars', 
                        3 => '3 Stars',
                        4 => '4 Stars',
                        5 => '5 Stars',
                    ]),
            ])
            ->actions([
                Tables\Actions\EditAction::make(),
                Tables\Actions\DeleteAction::make(),
                Tables\Actions\Action::make('view_image')
                    ->label('View Photo')
                    ->icon('heroicon-o-eye')
                    ->action(function ($record) {
                        if ($record->image) {
                            return redirect(asset('uploads/' . $record->image));
                        }
                    })
                    ->hidden(fn ($record) => !$record->image),
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
            'index' => \App\Filament\Resources\TestimonialResource\Pages\ListTestimonials::route('/'),
            'create' => \App\Filament\Resources\TestimonialResource\Pages\CreateTestimonial::route('/create'),
            'edit' => \App\Filament\Resources\TestimonialResource\Pages\EditTestimonial::route('/{record}/edit'),
        ];
    }
}