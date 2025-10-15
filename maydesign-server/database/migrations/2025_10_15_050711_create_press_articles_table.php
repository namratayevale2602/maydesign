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
         Schema::create('press_articles', function (Blueprint $table) {
            $table->id();
            $table->string('publication');
            $table->string('title');
            $table->date('date');
            $table->text('excerpt');
            $table->string('image')->nullable();
            $table->string('category');
            $table->boolean('featured')->default(false);
            
            // JSON fields for details
            $table->json('publication_details')->nullable();
            $table->json('key_quotes')->nullable();
            $table->json('project_team')->nullable();
            $table->json('additional_images')->nullable();
            $table->string('video_interview')->nullable();
            $table->text('full_article')->nullable();
            
            $table->integer('sort_order')->default(0);
            $table->boolean('is_active')->default(true);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('press_articles');
    }
};
