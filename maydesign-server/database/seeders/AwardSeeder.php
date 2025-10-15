<?php
// database/seeders/AwardSeeder.php

namespace Database\Seeders;

use App\Models\Award;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Storage;

class AwardSeeder extends Seeder
{
    public function run(): void
    {
        // Clear existing awards
        Award::query()->delete();

        $awards = [
            [
                'title' => 'International Architecture Award 2024',
                'organization' => 'World Architecture Festival',
                'year' => 2024,
                'category' => 'Residential Design',
                'description' => 'Recognized for the innovative Sky Garden Residence project that redefines urban living with sustainable design principles.',
                'image' => 'awards/award-1.jpg',
                'featured' => true,
                'details' => [
                    'fullDescription' => 'The Sky Garden Residence represents a paradigm shift in urban residential design. This award-winning project integrates vertical gardens, passive cooling systems, and community spaces within a high-density urban context. The design addresses climate challenges while creating beautiful, functional living environments that promote wellbeing and social interaction.',
                    'projectTeam' => [
                        ['member' => 'Lead Architect: Maria Rodriguez'],
                        ['member' => 'Project Manager: James Chen'],
                        ['member' => 'Landscape Designer: Sarah Johnson'],
                    ],
                    'location' => 'Singapore',
                    'completionDate' => 'March 2024',
                    'awardSignificance' => 'This prestigious international award recognizes projects that demonstrate exceptional innovation in sustainable urban living and community-focused design.',
                ],
                'photos' => [
                    'awards/gallery/photo1-1.jpg',
                    'awards/gallery/photo1-2.jpg',
                    'awards/gallery/photo1-3.jpg',
                ],
                'video' => 'https://player.vimeo.com/video/76979871?h=8272103f6e',
                'sort_order' => 1,
                'is_active' => true,
            ],
            [
                'title' => 'Best Commercial Building Design 2023',
                'organization' => 'Architecture & Design Awards',
                'year' => 2023,
                'category' => 'Commercial Architecture',
                'description' => 'Awarded for the revolutionary Urban Oasis Office Complex that blends workspace functionality with natural elements.',
                'image' => 'awards/award-2.jpg',
                'featured' => false,
                'details' => [
                    'fullDescription' => 'The Urban Oasis Office Complex transforms traditional workspace design by integrating biophilic principles throughout the building. The complex features indoor gardens, natural ventilation systems, and communal spaces that encourage collaboration and wellbeing. The design has shown measurable improvements in employee satisfaction and productivity.',
                    'projectTeam' => [
                        ['member' => 'Lead Architect: David Kim'],
                        ['member' => 'Interior Designer: Elena Martinez'],
                        ['member' => 'Structural Engineer: Robert Brown'],
                    ],
                    'location' => 'San Francisco, USA',
                    'completionDate' => 'January 2023',
                    'awardSignificance' => 'This award celebrates commercial buildings that successfully merge aesthetic excellence with functional innovation and employee wellbeing.',
                ],
                'photos' => [
                    'awards/gallery/photo2-1.jpg',
                    'awards/gallery/photo2-2.jpg',
                    'awards/gallery/photo2-3.jpg',
                ],
                'video' => 'https://player.vimeo.com/video/76979871?h=8272103f6e',
                'sort_order' => 2,
                'is_active' => true,
            ],
            [
                'title' => 'Sustainable Design Excellence Award',
                'organization' => 'Green Building Council',
                'year' => 2023,
                'category' => 'Sustainability',
                'description' => 'Honored for outstanding commitment to eco-friendly architecture and innovative sustainable practices.',
                'image' => 'awards/award-3.jpg',
                'featured' => false,
                'details' => [
                    'fullDescription' => 'This recognition celebrates our firm\'s comprehensive approach to sustainable design across multiple projects. Our methodology incorporates renewable energy systems, water conservation strategies, sustainable material selection, and lifecycle analysis to minimize environmental impact while maximizing building performance and occupant comfort.',
                    'projectTeam' => [
                        ['member' => 'Sustainability Director: Dr. Amanda Wilson'],
                        ['member' => 'Lead Architect: Thomas Reed'],
                        ['member' => 'Environmental Consultant: GreenTech Solutions'],
                    ],
                    'location' => 'Multiple Projects Worldwide',
                    'completionDate' => 'Ongoing',
                    'awardSignificance' => 'The Sustainable Design Excellence Award honors firms that demonstrate consistent leadership and innovation in environmentally responsible architecture.',
                ],
                'photos' => [
                    'awards/gallery/photo3-1.jpg',
                    'awards/gallery/photo3-2.jpg',
                    'awards/gallery/photo3-3.jpg',
                ],
                'video' => 'https://player.vimeo.com/video/76979871?h=8272103f6e',
                'sort_order' => 3,
                'is_active' => true,
            ],
            [
                'title' => 'Innovative Interior Design Award 2022',
                'organization' => 'International Design Awards',
                'year' => 2022,
                'category' => 'Interior Design',
                'description' => 'Celebrating groundbreaking interior spaces that enhance user experience through innovative design solutions.',
                'image' => 'awards/award-4.jpg',
                'featured' => true,
                'details' => [
                    'fullDescription' => 'Our interior design approach focuses on creating spaces that are not only aesthetically pleasing but also functionally superior. This award recognizes our work on the "Lumina Corporate Headquarters," where we implemented adaptive lighting systems, modular furniture, and acoustic optimization to create an environment that supports various work modes and enhances productivity.',
                    'projectTeam' => [
                        ['member' => 'Interior Design Lead: Sophia Chen'],
                        ['member' => 'Lighting Designer: Michael Roberts'],
                        ['member' => 'Acoustic Consultant: AudioTech Solutions'],
                    ],
                    'location' => 'London, UK',
                    'completionDate' => 'October 2022',
                    'awardSignificance' => 'This award acknowledges interior designs that push boundaries in creating human-centered environments that adapt to evolving workplace needs.',
                ],
                'photos' => [
                    'awards/gallery/photo4-1.jpg',
                    'awards/gallery/photo4-2.jpg',
                    'awards/gallery/photo4-3.jpg',
                ],
                'video' => 'https://player.vimeo.com/video/76979871?h=8272103f6e',
                'sort_order' => 4,
                'is_active' => true,
            ],
            [
                'title' => 'Urban Planning Excellence 2021',
                'organization' => 'Global Urban Development Awards',
                'year' => 2021,
                'category' => 'Urban Planning',
                'description' => 'Recognized for the transformative "Green Corridor Initiative" that revitalized urban infrastructure.',
                'image' => 'awards/award-5.jpg',
                'featured' => false,
                'details' => [
                    'fullDescription' => 'The Green Corridor Initiative transformed 15 kilometers of underutilized urban space into interconnected green pathways, community gardens, and recreational areas. This project successfully integrated sustainable transportation, green infrastructure, and community engagement to create a model for urban regeneration that balances development with environmental stewardship.',
                    'projectTeam' => [
                        ['member' => 'Urban Planner: Dr. Rachel Green'],
                        ['member' => 'Landscape Architect: Carlos Mendez'],
                        ['member' => 'Community Coordinator: Lisa Wang'],
                    ],
                    'location' => 'Berlin, Germany',
                    'completionDate' => 'August 2021',
                    'awardSignificance' => 'This award honors urban planning projects that demonstrate innovative approaches to creating sustainable, livable cities while addressing climate resilience and community needs.',
                ],
                'photos' => [
                    'awards/gallery/photo5-1.jpg',
                    'awards/gallery/photo5-2.jpg',
                    'awards/gallery/photo5-3.jpg',
                ],
                'video' => 'https://player.vimeo.com/video/76979871?h=8272103f6e',
                'sort_order' => 5,
                'is_active' => true,
            ],
        ];

        foreach ($awards as $award) {
            Award::create($award);
        }

        $this->command->info('Awards seeded successfully!');
        $this->command->info('Total awards created: ' . count($awards));
    }
}