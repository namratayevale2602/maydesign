<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('projects', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('slug')->unique();
            $table->string('category'); // architecture, interior, landscape
            $table->string('sub_category'); // residential, commercial
            $table->string('style')->nullable();
            $table->string('type')->nullable(); // Residential Villa, Boutique Hotel, etc.
            $table->text('description');
            $table->text('short_description');
            $table->text('full_description')->nullable();
            $table->text('concept')->nullable();
            $table->text('design_philosophy')->nullable();
            $table->string('location');
            $table->string('year');
            $table->string('area')->nullable();
            $table->string('budget')->nullable();
            $table->string('duration')->nullable();
            $table->string('main_image');
            $table->json('images')->nullable();
            $table->json('before_after')->nullable();
            $table->json('videos')->nullable();
            $table->json('highlights')->nullable();
            $table->json('tags')->nullable();
            $table->boolean('featured')->default(false);
            $table->boolean('is_active')->default(true);
            $table->integer('sort_order')->default(0);
            $table->timestamps();

            $table->index(['category', 'is_active']);
            $table->index(['featured', 'is_active']);
            $table->index(['year', 'is_active']);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('projects');
    }
};
