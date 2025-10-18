<?php
// app/Filament/Resources/TimelineItemResource.php
namespace App\Filament\Resources;

use App\Models\TimelineItem;
use Filament\Forms;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;
use Livewire\Features\SupportFileUploads\TemporaryUploadedFile;
use App\Filament\Resources\TimelineItemResource\Pages;

class TimelineItemResource extends Resource
{
    protected static ?string $model = TimelineItem::class;

    protected static ?string $navigationIcon = 'heroicon-o-clock';
    protected static ?string $navigationGroup = 'About Us';

    public static function form(Form $form): Form
    {
        return $form
            ->schema([
                Forms\Components\TextInput::make('year')
                    ->required()
                    ->maxLength(10),
                Forms\Components\TextInput::make('title')
                    ->required()
                    ->maxLength(255),
                Forms\Components\Textarea::make('description')
                    ->required()
                    ->rows(3),
                Forms\Components\FileUpload::make('image')
                    ->label('Timeline Image')
                    ->directory('timeline')
                    ->image()
                    ->maxSize(2048)
                    ->getUploadedFileNameForStorageUsing(
                        fn (TemporaryUploadedFile $file): string => 
                        (string) str($file->getClientOriginalName())
                            ->prepend('timeline-'),
                    ),
                Forms\Components\TagsInput::make('achievements')
                    ->placeholder('Add achievement')
                    ->nestedRecursiveRules(['max:255']),
                Forms\Components\Textarea::make('impact')
                    ->required()
                    ->rows(3),
                Forms\Components\TextInput::make('order')
                    ->numeric()
                    ->default(0),
                Forms\Components\Toggle::make('is_active')
                    ->default(true),
            ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                Tables\Columns\ImageColumn::make('image')
                    ->label('Image')
                    ->disk('public')
                    ->width(50)
                    ->height(50),
                Tables\Columns\TextColumn::make('year')
                    ->sortable(),
                Tables\Columns\TextColumn::make('title')
                    ->searchable()
                    ->sortable(),
                Tables\Columns\TextColumn::make('order')
                    ->sortable(),
                Tables\Columns\IconColumn::make('is_active')
                    ->boolean(),
            ])
            ->filters([
                Tables\Filters\Filter::make('is_active')
                    ->query(fn ($query) => $query->where('is_active', true))
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
            ->defaultSort('order', 'asc');
    }

    public static function getPages(): array
    {
        return [
            'index' => Pages\ListTimelineItems::route('/'),
            'create' => Pages\CreateTimelineItem::route('/create'),
            'edit' => Pages\EditTimelineItem::route('/{record}/edit'),
        ];
    }
}