<?php
// database/migrations/2024_01_01_000002_create_projects_table.php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('projects', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('slug')->unique();
            $table->enum('category', ['architecture', 'interior', 'landscape']);
            $table->enum('sub_category', ['residential', 'commercial', 'public']);
            $table->string('type')->nullable();
            $table->string('style')->nullable();
            $table->text('description');
            $table->text('short_description');
            $table->text('full_description')->nullable();
            $table->text('concept')->nullable();
            $table->text('design_philosophy')->nullable();
            $table->json('highlights')->nullable();
            $table->json('awards')->nullable(); // Added awards as JSON field
            $table->string('location');
            $table->year('year');
            $table->string('area')->nullable();
            $table->string('budget')->nullable();
            $table->string('duration')->nullable();
            $table->json('images');
            $table->json('before_after')->nullable();
            $table->json('videos')->nullable();
            $table->json('team')->nullable();
            $table->json('testimonials')->nullable();
            $table->json('tags')->nullable();
            $table->boolean('is_featured')->default(false);
            $table->boolean('is_published')->default(true);
            $table->integer('order_column')->default(0);
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('projects');
    }
};