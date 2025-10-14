<?php
// database/migrations/2024_01_01_000000_create_hero_projects_table.php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('hero_projects', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->string('subtitle');
            $table->text('description');
            $table->string('image'); // Main image path
            $table->string('thumbnail'); // Thumbnail image path
            $table->string('service');
            $table->string('year');
            $table->integer('order')->default(0); // For ordering projects
            $table->boolean('is_active')->default(true);
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('hero_projects');
    }
};