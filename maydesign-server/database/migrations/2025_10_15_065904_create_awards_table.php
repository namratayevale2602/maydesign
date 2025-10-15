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
        {
        Schema::create('awards', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->string('organization');
            $table->integer('year');
            $table->string('category');
            $table->text('description');
            $table->string('image');
            $table->boolean('featured')->default(false);
            
            // Details JSON field
            $table->json('details')->nullable();
            
            // Photos array
            $table->json('photos')->nullable();
            
            // Video field
            $table->string('video')->nullable();
            
            $table->integer('sort_order')->default(0);
            $table->boolean('is_active')->default(true);
            $table->timestamps();
            
            $table->index(['year', 'is_active']);
            $table->index(['featured', 'is_active']);
        });
    }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('awards');
    }
};
