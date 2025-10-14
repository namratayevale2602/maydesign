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
        Schema::create('about_sections', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->string('highlighted_text')->nullable();
            $table->text('description_1');
            $table->text('description_2');
            $table->text('description_3');
            $table->string('image')->nullable();
            $table->string('experience_years');
            $table->string('experience_label');
            $table->string('projects_count');
            $table->string('projects_label');
            $table->string('primary_button_text');
            $table->string('primary_button_link');
            $table->string('secondary_button_text');
            $table->string('secondary_button_link')->nullable();
            $table->boolean('is_active')->default(true);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('about_sections');
    }
};
