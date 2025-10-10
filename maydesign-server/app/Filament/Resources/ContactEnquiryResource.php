<?php
// app/Filament/Resources/ContactEnquiryResource.php

namespace App\Filament\Resources;

use App\Filament\Resources\ContactEnquiryResource\Pages;
use App\Models\ContactEnquiry;
use Filament\Forms;
use Filament\Forms\Form;
use Filament\Resources\Resource;
use Filament\Tables;
use Filament\Tables\Table;
use Filament\Infolists;
use Filament\Infolists\Infolist;
use Illuminate\Database\Eloquent\Builder;

class ContactEnquiryResource extends Resource
{
    protected static ?string $model = ContactEnquiry::class;

    protected static ?string $navigationIcon = 'heroicon-o-chat-bubble-left-right';

    protected static ?string $navigationGroup = 'Enquiries';

    protected static ?string $navigationLabel = 'Contact Enquiries';

    protected static ?int $navigationSort = 1;

    public static function getNavigationBadge(): ?string
    {
        return static::getModel()::new()->count();
    }

    public static function getNavigationBadgeColor(): string|array|null
    {
        return static::getModel()::new()->count() > 0 ? 'primary' : 'gray';
    }

    public static function form(Form $form): Form
    {
        return $form
            ->schema([
                Forms\Components\Section::make('Contact Information')
                    ->schema([
                        Forms\Components\TextInput::make('name')
                            ->required()
                            ->maxLength(255),
                        Forms\Components\TextInput::make('email')
                            ->email()
                            ->required()
                            ->maxLength(255),
                        Forms\Components\TextInput::make('phone')
                            ->tel()
                            ->maxLength(20),
                    ])->columns(3),

                Forms\Components\Section::make('Project Details')
                    ->schema([
                        Forms\Components\TextInput::make('subject')
                            ->maxLength(255),
                        Forms\Components\Select::make('project_type')
                            ->options([
                                'Residential Architecture' => 'Residential Architecture',
                                'Commercial Buildings' => 'Commercial Buildings',
                                'Industrial Facilities' => 'Industrial Facilities',
                                'Hospitality Design' => 'Hospitality Design',
                                'Institutional Projects' => 'Institutional Projects',
                                'Landscape Architecture' => 'Landscape Architecture',
                                'Interior Design' => 'Interior Design',
                                'Urban Planning' => 'Urban Planning',
                                'Renovation' => 'Renovation',
                                'Other' => 'Other',
                            ]),
                        Forms\Components\Select::make('budget')
                            ->options([
                                'Under $50,000' => 'Under $50,000',
                                '$50,000 - $100,000' => '$50,000 - $100,000',
                                '$100,000 - $500,000' => '$100,000 - $500,000',
                                '$500,000 - $1M' => '$500,000 - $1M',
                                '$1M - $5M' => '$1M - $5M',
                                'Over $5M' => 'Over $5M',
                            ]),
                    ])->columns(3),

                Forms\Components\Section::make('Message')
                    ->schema([
                        Forms\Components\Textarea::make('message')
                            ->required()
                            ->rows(6)
                            ->columnSpanFull(),
                    ]),

                Forms\Components\Section::make('Admin')
                    ->schema([
                        Forms\Components\Select::make('status')
                            ->options(ContactEnquiry::getStatusOptions())
                            ->required()
                            ->default(ContactEnquiry::STATUS_NEW),
                        Forms\Components\Textarea::make('admin_notes')
                            ->rows(3)
                            ->placeholder('Add internal notes about this enquiry...'),
                    ])->columns(2),
            ]);
    }

    public static function table(Table $table): Table
    {
        return $table
            ->columns([
                Tables\Columns\TextColumn::make('name')
                    ->searchable()
                    ->sortable(),

                Tables\Columns\TextColumn::make('email')
                    ->searchable()
                    ->sortable(),

                Tables\Columns\TextColumn::make('project_type')
                    ->searchable()
                    ->sortable()
                    ->toggleable(isToggledHiddenByDefault: false),

                Tables\Columns\TextColumn::make('budget')
                    ->searchable()
                    ->sortable()
                    ->toggleable(isToggledHiddenByDefault: true),

                Tables\Columns\TextColumn::make('status')
                    ->badge()
                    ->color(fn (string $state): string => match ($state) {
                        'new' => 'primary',
                        'in_progress' => 'warning',
                        'completed' => 'success',
                        'closed' => 'gray',
                    })
                    ->sortable(),

                Tables\Columns\TextColumn::make('created_at')
                    ->dateTime('M j, Y g:i A')
                    ->sortable()
                    ->label('Submitted'),
            ])
            ->filters([
                Tables\Filters\SelectFilter::make('status')
                    ->options(ContactEnquiry::getStatusOptions()),

                Tables\Filters\SelectFilter::make('project_type')
                    ->options([
                        'Residential Architecture' => 'Residential Architecture',
                        'Commercial Buildings' => 'Commercial Buildings',
                        'Industrial Facilities' => 'Industrial Facilities',
                        'Hospitality Design' => 'Hospitality Design',
                        'Institutional Projects' => 'Institutional Projects',
                        'Landscape Architecture' => 'Landscape Architecture',
                        'Interior Design' => 'Interior Design',
                        'Urban Planning' => 'Urban Planning',
                        'Renovation' => 'Renovation',
                        'Other' => 'Other',
                    ]),

                Tables\Filters\Filter::make('new_enquiries')
                    ->query(fn (Builder $query): Builder => $query->where('status', 'new'))
                    ->label('New Enquiries'),

                Tables\Filters\Filter::make('created_at')
                    ->form([
                        Forms\Components\DatePicker::make('created_from'),
                        Forms\Components\DatePicker::make('created_until'),
                    ])
                    ->query(function (Builder $query, array $data): Builder {
                        return $query
                            ->when(
                                $data['created_from'],
                                fn (Builder $query, $date): Builder => $query->whereDate('created_at', '>=', $date),
                            )
                            ->when(
                                $data['created_until'],
                                fn (Builder $query, $date): Builder => $query->whereDate('created_at', '<=', $date),
                            );
                    }),
            ])
            ->actions([
                Tables\Actions\ViewAction::make(),
                Tables\Actions\EditAction::make(),
                Tables\Actions\Action::make('markInProgress')
                    ->action(function (ContactEnquiry $record) {
                        $record->update(['status' => ContactEnquiry::STATUS_IN_PROGRESS]);
                    })
                    ->requiresConfirmation()
                    ->modalHeading('Mark as In Progress')
                    ->modalDescription('Are you sure you want to mark this enquiry as in progress?')
                    ->modalSubmitActionLabel('Yes, mark as in progress')
                    ->color('warning')
                    ->icon('heroicon-o-clock')
                    ->visible(fn (ContactEnquiry $record) => $record->status === ContactEnquiry::STATUS_NEW),

                Tables\Actions\Action::make('markCompleted')
                    ->action(function (ContactEnquiry $record) {
                        $record->update(['status' => ContactEnquiry::STATUS_COMPLETED]);
                    })
                    ->requiresConfirmation()
                    ->modalHeading('Mark as Completed')
                    ->modalDescription('Are you sure you want to mark this enquiry as completed?')
                    ->modalSubmitActionLabel('Yes, mark as completed')
                    ->color('success')
                    ->icon('heroicon-o-check-badge')
                    ->visible(fn (ContactEnquiry $record) => in_array($record->status, [ContactEnquiry::STATUS_NEW, ContactEnquiry::STATUS_IN_PROGRESS])),
            ])
            ->bulkActions([
                Tables\Actions\BulkActionGroup::make([
                    Tables\Actions\DeleteBulkAction::make(),
                    Tables\Actions\BulkAction::make('markAsInProgress')
                        ->action(function ($records) {
                            $records->each->update(['status' => ContactEnquiry::STATUS_IN_PROGRESS]);
                        })
                        ->requiresConfirmation()
                        ->color('warning')
                        ->icon('heroicon-o-clock'),
                    Tables\Actions\BulkAction::make('markAsCompleted')
                        ->action(function ($records) {
                            $records->each->update(['status' => ContactEnquiry::STATUS_COMPLETED]);
                        })
                        ->requiresConfirmation()
                        ->color('success')
                        ->icon('heroicon-o-check-badge'),
                ]),
            ])
            ->defaultSort('created_at', 'desc');
    }

    public static function infolist(Infolist $infolist): Infolist
    {
        return $infolist
            ->schema([
                Infolists\Components\Section::make('Contact Information')
                    ->schema([
                        Infolists\Components\TextEntry::make('name'),
                        Infolists\Components\TextEntry::make('email'),
                        Infolists\Components\TextEntry::make('phone'),
                    ])->columns(3),

                Infolists\Components\Section::make('Project Details')
                    ->schema([
                        Infolists\Components\TextEntry::make('project_type'),
                        Infolists\Components\TextEntry::make('budget'),
                        Infolists\Components\TextEntry::make('subject'),
                    ])->columns(3),

                Infolists\Components\Section::make('Message')
                    ->schema([
                        Infolists\Components\TextEntry::make('message')
                            ->columnSpanFull()
                            ->prose(),
                    ]),

                Infolists\Components\Section::make('Admin Information')
                    ->schema([
                        Infolists\Components\TextEntry::make('status')
                            ->badge()
                            ->color(fn (string $state): string => match ($state) {
                                'new' => 'primary',
                                'in_progress' => 'warning',
                                'completed' => 'success',
                                'closed' => 'gray',
                            }),
                        Infolists\Components\TextEntry::make('admin_notes')
                            ->columnSpanFull()
                            ->placeholder('No admin notes')
                            ->prose(),
                        Infolists\Components\TextEntry::make('created_at')
                            ->dateTime('M j, Y g:i A'),
                        Infolists\Components\TextEntry::make('updated_at')
                            ->dateTime('M j, Y g:i A'),
                    ])->columns(2),
            ]);
    }

    public static function getPages(): array
    {
        return [
            'index' => Pages\ListContactEnquiries::route('/'),
            'view' => Pages\ViewContactEnquiry::route('/{record}'),
            'edit' => Pages\EditContactEnquiry::route('/{record}/edit'),
        ];
    }

    public static function getGloballySearchableAttributes(): array
    {
        return ['name', 'email', 'project_type', 'message'];
    }
}