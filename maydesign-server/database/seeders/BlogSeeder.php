<?php
// database/seeders/BlogSeeder.php

namespace Database\Seeders;

use App\Models\Blog;
use Illuminate\Database\Seeder;
use Illuminate\Support\Carbon;

class BlogSeeder extends Seeder
{
    public function run(): void
    {
        $blogs = [
            [
                'title' => 'The Future of Sustainable Architecture',
                'slug' => 'future-sustainable-architecture',
                'excerpt' => 'Exploring innovative materials and design approaches for eco-friendly buildings that harmonize with nature.',
                'content' => '
                    <p>Sustainable architecture is no longer a trend but a necessity in our rapidly changing world. As we face environmental challenges, architects and designers are pioneering new approaches that prioritize ecological balance and resource efficiency.</p>
                    
                    <h3>Innovative Materials</h3>
                    <p>From self-healing concrete to transparent wood, new materials are revolutionizing how we build. These innovations not only reduce environmental impact but also create buildings that are more durable and energy-efficient.</p>
                    
                    <h3>Energy Efficiency</h3>
                    <p>Modern sustainable designs incorporate passive solar heating, natural ventilation, and smart energy management systems to minimize reliance on non-renewable resources.</p>
                    
                    <h3>Biophilic Design</h3>
                    <p>Integrating natural elements into architectural design not only improves aesthetics but also enhances occupant wellbeing and productivity.</p>
                    
                    <p>The future of architecture lies in creating spaces that not only serve human needs but also contribute positively to the environment.</p>
                ',
                'image' => 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
                'category' => 'Architecture',
                'author' => 'Sarah Johnson',
                'author_role' => 'Lead Architect',
                'author_image' => 'https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80',
                'published_date' => '2024-01-15',
                'read_time' => '5 min read',
                'tags' => ['Sustainability', 'Green Design', 'Innovation', 'Eco-Friendly'],
                'is_published' => true,
                'views' => 1247,
            ],
            [
                'title' => 'Maximizing Small Spaces: Urban Design Solutions',
                'slug' => 'maximizing-small-spaces',
                'excerpt' => 'Creative strategies for making the most of compact urban living spaces without compromising on style.',
                'content' => '
                    <p>Urban living often means dealing with limited space, but with smart design strategies, small spaces can become functional, beautiful, and efficient.</p>
                    
                    <h3>Multi-Functional Furniture</h3>
                    <p>Invest in furniture that serves multiple purposes - sofa beds, extendable dining tables, and storage ottomans can dramatically increase functionality.</p>
                    
                    <h3>Vertical Space Utilization</h3>
                    <p>Don\'t forget about your walls! Floating shelves, wall-mounted desks, and tall storage units make use of often-overlooked vertical space.</p>
                    
                    <h3>Smart Storage Solutions</h3>
                    <p>Built-in storage, under-bed drawers, and hidden compartments help keep clutter out of sight while maximizing every inch.</p>
                    
                    <h3>Light and Color</h3>
                    <p>Light colors, mirrors, and strategic lighting can make small spaces feel larger and more open.</p>
                ',
                'image' => 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
                'category' => 'Interior Design',
                'author' => 'Michael Chen',
                'author_role' => 'Interior Designer',
                'author_image' => 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
                'published_date' => '2024-01-12',
                'read_time' => '4 min read',
                'tags' => ['Small Spaces', 'Urban Living', 'Storage Solutions', 'Apartment Design'],
                'is_published' => true,
                'views' => 892,
            ],
            [
                'title' => 'Biophilic Design: Bringing Nature Indoors',
                'slug' => 'biophilic-design-nature',
                'excerpt' => 'How incorporating natural elements into interior spaces improves wellbeing and productivity.',
                'content' => '
                    <p>Biophilic design is an approach that seeks to connect our inherent need to affiliate with nature in the modern built environment.</p>
                    
                    <h3>Direct Nature Integration</h3>
                    <p>Incorporate living plants, water features, and natural light to create a direct connection with nature.</p>
                    
                    <h3>Indirect Nature Elements</h3>
                    <p>Use natural materials like wood and stone, nature-inspired colors, and patterns that mimic natural forms.</p>
                    
                    <h3>Health Benefits</h3>
                    <p>Studies show that biophilic design can reduce stress, improve cognitive function, and enhance creativity and mood.</p>
                    
                    <h3>Practical Applications</h3>
                    <p>From residential spaces to corporate offices, biophilic principles can be adapted to various environments and budgets.</p>
                    
                    <p>By bringing elements of nature into our built environments, we create spaces that nurture both people and the planet.</p>
                ',
                'image' => 'https://images.unsplash.com/photo-1560717789-0ac7c58ac90a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
                'category' => 'Landscape',
                'author' => 'Emma Davis',
                'author_role' => 'Landscape Architect',
                'author_image' => 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80',
                'published_date' => '2024-01-08',
                'read_time' => '6 min read',
                'tags' => ['Biophilic', 'Nature', 'Wellbeing', 'Healthy Living'],
                'is_published' => true,
                'views' => 1563,
            ],
            [
                'title' => 'Modern Minimalism: Less is More',
                'slug' => 'modern-minimalism-less-more',
                'excerpt' => 'The principles of minimalist design and how to achieve clean, functional spaces that inspire calm.',
                'content' => '
                    <p>Minimalism in design isn\'t about empty spaces, but about intentional living with only the things that add value and joy.</p>
                    
                    <h3>Core Principles</h3>
                    <p>Focus on functionality, clean lines, and a limited color palette. Every element should serve a purpose.</p>
                    
                    <h3>Decluttering Strategies</h3>
                    <p>Start by removing non-essential items and gradually curate your space with pieces that truly matter.</p>
                    
                    <h3>Quality Over Quantity</h3>
                    <p>Invest in fewer, high-quality pieces that will last longer and bring more satisfaction.</p>
                    
                    <h3>Creating Visual Calm</h3>
                    <p>Use negative space effectively and maintain clear surfaces to create a sense of peace and order.</p>
                    
                    <p>Minimalism is a journey toward intentional living that can transform not just your space, but your mindset.</p>
                ',
                'image' => 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
                'category' => 'Interior Design',
                'author' => 'David Wilson',
                'author_role' => 'Design Consultant',
                'author_image' => 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80',
                'published_date' => '2024-01-05',
                'read_time' => '3 min read',
                'tags' => ['Minimalism', 'Simple Living', 'Decluttering', 'Modern Design'],
                'is_published' => true,
                'views' => 734,
            ],
            [
                'title' => 'Smart Home Integration in Modern Design',
                'slug' => 'smart-home-integration-design',
                'excerpt' => 'Seamlessly incorporating technology into architectural design for enhanced living experiences.',
                'content' => '
                    <p>The future of home design lies in the seamless integration of technology that enhances our daily lives without compromising aesthetics.</p>
                    
                    <h3>Hidden Technology</h3>
                    <p>Conceal speakers, screens, and wiring within walls and furniture to maintain clean lines and visual appeal.</p>
                    
                    <h3>Voice Control Integration</h3>
                    <p>Design spaces with voice control in mind, ensuring microphones can hear commands from anywhere in the room.</p>
                    
                    <h3>Lighting Automation</h3>
                    <p>Smart lighting systems that adjust based on time of day, occupancy, and natural light levels.</p>
                    
                    <h3>Energy Management</h3>
                    <p>Integrated systems that monitor and optimize energy usage while maintaining comfort.</p>
                    
                    <h3>Future-Proofing</h3>
                    <p>Design with flexibility to accommodate future technological advancements.</p>
                ',
                'image' => 'https://images.unsplash.com/photo-1484154218962-a197022b5858?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
                'category' => 'Technology',
                'author' => 'Lisa Brown',
                'author_role' => 'Smart Home Specialist',
                'author_image' => 'https://images.unsplash.com/photo-1544725176-7c40e5a71c5e?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80',
                'published_date' => '2024-01-02',
                'read_time' => '7 min read',
                'tags' => ['Smart Home', 'Technology', 'Automation', 'Future Living'],
                'is_published' => true,
                'views' => 1987,
            ],
            [
                'title' => 'Cultural Influences in Contemporary Architecture',
                'slug' => 'cultural-influences-architecture',
                'excerpt' => 'How traditional design elements are being reinterpreted in modern architectural practices worldwide.',
                'content' => '
                    <p>Contemporary architecture is increasingly drawing inspiration from cultural heritage, creating spaces that tell stories while meeting modern needs.</p>
                    
                    <h3>Regional Materiality</h3>
                    <p>Using locally sourced materials and traditional construction techniques adapted for contemporary standards.</p>
                    
                    <h3>Symbolic Forms</h3>
                    <p>Reinterpreting traditional architectural forms and symbols in modern contexts.</p>
                    
                    <h3>Climate-Responsive Design</h3>
                    <p>Learning from vernacular architecture that evolved in response to local climate conditions.</p>
                    
                    <h3>Cultural Narrative</h3>
                    <p>Creating buildings that reflect cultural identity while serving contemporary functions.</p>
                    
                    <h3>Global-Local Balance</h3>
                    <p>Balancing international design trends with local cultural expressions.</p>
                    
                    <p>The most successful contemporary designs honor cultural heritage while embracing innovation and sustainability.</p>
                ',
                'image' => 'https://images.unsplash.com/photo-1513584684374-8bab748fbf90?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
                'category' => 'Architecture',
                'author' => 'Robert Garcia',
                'author_role' => 'Cultural Architect',
                'author_image' => 'https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80',
                'published_date' => '2023-12-28',
                'read_time' => '8 min read',
                'tags' => ['Cultural Design', 'Heritage', 'Traditional', 'Modern Interpretation'],
                'is_published' => true,
                'views' => 1123,
            ],
            [
                'title' => 'Sustainable Materials Revolution',
                'slug' => 'sustainable-materials-revolution',
                'excerpt' => 'Exploring the latest breakthroughs in eco-friendly building materials that are changing construction.',
                'content' => '
                    <p>The construction industry is undergoing a green revolution with innovative materials that reduce environmental impact while improving performance.</p>
                    
                    <h3>Bamboo and Rapidly Renewable Materials</h3>
                    <p>Bamboo\'s strength and rapid growth make it an excellent sustainable alternative to traditional hardwoods.</p>
                    
                    <h3>Recycled and Upcycled Materials</h3>
                    <p>From recycled glass countertops to reclaimed wood flooring, waste materials are finding new life in construction.</p>
                    
                    <h3>Low-Carbon Concrete</h3>
                    <p>New formulations that significantly reduce the carbon footprint of this essential building material.</p>
                    
                    <h3>Living Materials</h3>
                    <p>Self-healing concrete and bio-based materials that can repair themselves and adapt to conditions.</p>
                    
                    <p>These material innovations are paving the way for a more sustainable built environment.</p>
                ',
                'image' => 'https://images.unsplash.com/photo-1487958449943-2429e8be8625?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
                'category' => 'Sustainability',
                'author' => 'Maria Rodriguez',
                'author_role' => 'Materials Scientist',
                'author_image' => 'https://images.unsplash.com/photo-1551836026-d5c88ac5d691?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80',
                'published_date' => '2023-12-20',
                'read_time' => '6 min read',
                'tags' => ['Sustainable Materials', 'Green Building', 'Innovation', 'Eco-Friendly'],
                'is_published' => true,
                'views' => 876,
            ],
            [
                'title' => 'The Psychology of Color in Interior Design',
                'slug' => 'psychology-color-interior-design',
                'excerpt' => 'How color choices affect mood, perception, and behavior in interior spaces.',
                'content' => '
                    <p>Color is one of the most powerful tools in interior design, influencing how we feel and behave in a space.</p>
                    
                    <h3>Color and Emotion</h3>
                    <p>Different colors evoke different emotional responses - warm colors energize, cool colors calm, and neutrals ground.</p>
                    
                    <h3>Cultural Considerations</h3>
                    <p>Color meanings vary across cultures, an important consideration in global design projects.</p>
                    
                    <h3>Functional Applications</h3>
                    <p>Using color to define zones, highlight architectural features, and influence spatial perception.</p>
                    
                    <h3>Trends vs. Timelessness</h3>
                    <p>Balancing fashionable color trends with timeless choices that will age well.</p>
                    
                    <p>Understanding color psychology helps create spaces that not only look beautiful but also support wellbeing.</p>
                ',
                'image' => 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
                'category' => 'Interior Design',
                'author' => 'Jennifer Kim',
                'author_role' => 'Color Specialist',
                'author_image' => 'https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80',
                'published_date' => '2023-12-15',
                'read_time' => '5 min read',
                'tags' => ['Color Psychology', 'Interior Design', 'Mood', 'Wellbeing'],
                'is_published' => true,
                'views' => 1542,
            ],
        ];

        foreach ($blogs as $blog) {
            Blog::create($blog);
        }

        $this->command->info('Successfully seeded ' . count($blogs) . ' blog posts!');
    }
}