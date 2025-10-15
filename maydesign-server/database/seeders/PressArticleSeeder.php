<?php
// database/seeders/PressArticleSeeder.php

namespace Database\Seeders;

use App\Models\PressArticle;
use Illuminate\Database\Seeder;
use Illuminate\Support\Carbon;

class PressArticleSeeder extends Seeder
{
    public function run(): void
    {
        $pressArticles = [
            [
                'publication' => 'Architectural Digest',
                'title' => 'Redefining Modern Luxury: The MAY Designs Approach',
                'date' => '2024-03-15',
                'excerpt' => 'An exclusive feature on how MAY Designs is transforming the landscape of luxury residential architecture with innovative sustainable practices.',
                'image' => 'uploads/press/architectural-digest-feature.jpg',
                'category' => 'Feature',
                'featured' => true,
                'sort_order' => 1,
                'full_article' => '<p>In an era where luxury and sustainability were once considered mutually exclusive, MAY Designs has emerged as a pioneering force that seamlessly blends opulence with environmental responsibility. Their latest residential project, "The Canopy Residence," stands as a testament to this philosophy.</p>
                
                <h3>Sustainable Opulence</h3>
                <p>The 15,000-square-foot residence incorporates geothermal heating, rainwater harvesting systems, and locally sourced materials without compromising on the luxurious experience. "We believe true luxury lies in spaces that are both beautiful and responsible," says lead architect Maria Rodriguez.</p>
                
                <h3>Innovative Material Use</h3>
                <p>The project features reclaimed teak flooring, recycled glass countertops, and a revolutionary carbon-sequestering concrete that actually removes CO2 from the atmosphere. These materials are combined with smart home technology that optimizes energy usage based on occupancy patterns.</p>
                
                <h3>Community Impact</h3>
                <p>Beyond the individual residence, MAY Designs has implemented community gardens and shared green spaces that extend the project\'s sustainable impact to the surrounding neighborhood.</p>',
                'publication_details' => [
                    'website' => 'www.architecturaldigest.com',
                    'circulation' => '850,000+',
                    'audience' => 'Luxury Design Enthusiasts',
                    'founded' => '1920',
                ],
                'key_quotes' => [
                    'MAY Designs is redefining what luxury means in the 21st century.',
                    'The seamless integration of technology and nature sets a new standard for residential architecture.',
                    'This approach proves that sustainability can enhance rather than limit design possibilities.',
                ],
                'project_team' => [
                    'Lead Architect: Maria Rodriguez',
                    'Sustainability Consultant: Dr. James Chen',
                    'Interior Designer: Sarah Yamamoto',
                    'Landscape Architect: Robert Kim',
                ],
                'additional_images' => [
                    'uploads/press/gallery/arch-digest-1.jpg',
                    'uploads/press/gallery/arch-digest-2.jpg',
                    'uploads/press/gallery/arch-digest-3.jpg',
                ],
                'video_interview' => 'https://player.vimeo.com/video/76979871?h=8272103f6e',
            ],
            [
                'publication' => 'Dezeen',
                'title' => 'Urban Regeneration Projects That Are Changing Cityscapes',
                'date' => '2024-02-20',
                'excerpt' => 'MAY Designs featured among top architecture firms leading urban regeneration initiatives worldwide.',
                'image' => 'uploads/press/dezeen-urban-regeneration.jpg',
                'category' => 'Cover Story',
                'featured' => true,
                'sort_order' => 2,
                'full_article' => '<p>MAY Designs has been recognized as one of the leading firms transforming urban landscapes through innovative regeneration projects. Their "Riverfront Revival" initiative in downtown Chicago has become a benchmark for sustainable urban development.</p>
                
                <h3>Community-Centered Approach</h3>
                <p>The project transformed 50 acres of industrial wasteland into a vibrant mixed-use community featuring affordable housing, commercial spaces, and extensive public parks. "We engaged with over 2,000 local residents during the planning phase," explains urban designer Michael Chen.</p>
                
                <h3>Sustainable Infrastructure</h3>
                <p>The development incorporates green roofs, permeable paving, and an advanced stormwater management system that has reduced runoff by 80% compared to conventional developments.</p>
                
                <h3>Economic Impact</h3>
                <p>Since completion, the area has seen a 45% increase in local business revenue and created over 1,200 permanent jobs, demonstrating the economic viability of sustainable urban regeneration.</p>',
                'publication_details' => [
                    'website' => 'www.dezeen.com',
                    'circulation' => '2.5M Monthly Readers',
                    'audience' => 'Architecture Professionals',
                    'founded' => '2006',
                ],
                'key_quotes' => [
                    'MAY Designs demonstrates how urban regeneration can be both beautiful and functional.',
                    'Their community engagement process sets a new standard for inclusive urban planning.',
                    'This project proves that sustainable development can drive economic growth.',
                ],
                'project_team' => [
                    'Urban Designer: Michael Chen',
                    'Community Liaison: Elena Martinez',
                    'Environmental Engineer: Dr. Amanda Wilson',
                    'Project Manager: David Brown',
                ],
                'additional_images' => [
                    'uploads/press/gallery/dezeen-1.jpg',
                    'uploads/press/gallery/dezeen-2.jpg',
                    'uploads/press/gallery/dezeen-3.jpg',
                ],
                'video_interview' => 'https://player.vimeo.com/video/76979871?h=8272103f6e',
            ],
            [
                'publication' => 'Wallpaper*',
                'title' => 'The Future of Sustainable Architecture: 10 Innovators to Watch',
                'date' => '2024-01-10',
                'excerpt' => 'Recognized as one of the top 10 architectural innovators shaping the future of sustainable design.',
                'image' => 'uploads/press/wallpaper-sustainable-innovators.jpg',
                'category' => 'Feature',
                'featured' => true,
                'sort_order' => 3,
                'full_article' => '<p>Wallpaper* has named MAY Designs among its annual list of 10 architectural innovators who are redefining sustainable design. The recognition comes after the firm\'s groundbreaking work on the "Zero-Carbon Campus" project.</p>
                
                <h3>Carbon-Neutral Achievement</h3>
                <p>The campus not only achieves net-zero carbon emissions but actually generates 120% of its energy needs through integrated solar panels and wind turbines. Excess energy is returned to the local grid, making it a net-positive energy project.</p>
                
                <h3>Biophilic Integration</h3>
                <p>Every workspace features direct access to natural light, living walls, and indoor gardens that improve air quality and employee wellbeing. Studies conducted post-occupancy show a 30% increase in productivity and a 25% reduction in sick days.</p>
                
                <h3>Circular Economy Principles</h3>
                <p>The project implements circular economy principles, with 95% of construction waste being recycled or repurposed, and all materials selected for their potential for future reuse or recycling.</p>',
                'publication_details' => [
                    'website' => 'www.wallpaper.com',
                    'circulation' => '1.2M Global Readers',
                    'audience' => 'Design Connoisseurs',
                    'founded' => '1996',
                ],
                'key_quotes' => [
                    'MAY Designs represents the vanguard of sustainable architectural practice.',
                    'Their work demonstrates that environmental responsibility and design excellence are not mutually exclusive.',
                    'This firm is setting the standard for the next generation of architects.',
                ],
                'project_team' => [
                    'Project Lead: Sarah Johnson',
                    'Sustainability Director: Thomas Reed',
                    'Energy Consultant: GreenTech Solutions',
                    'Structural Engineer: Robert Wilson',
                ],
                'additional_images' => [
                    'uploads/press/gallery/wallpaper-1.jpg',
                    'uploads/press/gallery/wallpaper-2.jpg',
                    'uploads/press/gallery/wallpaper-3.jpg',
                ],
                'video_interview' => 'https://player.vimeo.com/video/76979871?h=8272103f6e',
            ],
            [
                'publication' => 'The Architectural Review',
                'title' => 'Material Innovation in Contemporary Architecture',
                'date' => '2023-12-05',
                'excerpt' => 'Deep dive into MAY Designs\' pioneering use of sustainable materials in commercial projects.',
                'image' => 'uploads/press/architectural-review-materials.jpg',
                'category' => 'Interview',
                'featured' => true,
                'sort_order' => 4,
                'full_article' => '<p>The Architectural Review features an in-depth interview with MAY Designs\' material innovation team, exploring their revolutionary approach to sustainable material selection and development.</p>
                
                <h3>Bio-Based Composites</h3>
                <p>The firm has developed a proprietary bio-composite material made from agricultural waste and mycelium that outperforms traditional concrete in compression strength while being completely biodegradable.</p>
                
                <h3>Local Material Sourcing</h3>
                <p>MAY Designs prioritizes locally sourced materials, reducing transportation emissions by up to 75% while supporting regional economies. Their "100-mile material policy" ensures that at least 80% of materials come from within 100 miles of the construction site.</p>
                
                <h3>Lifecycle Analysis</h3>
                <p>Every material undergoes rigorous lifecycle analysis, considering not just initial environmental impact but also maintenance requirements, durability, and end-of-life recyclability.</p>',
                'publication_details' => [
                    'website' => 'www.architectural-review.com',
                    'circulation' => '45,000 Professionals',
                    'audience' => 'Architecture Industry',
                    'founded' => '1896',
                ],
                'key_quotes' => [
                    'MAY Designs\' material research is pushing the boundaries of what\'s possible in sustainable construction.',
                    'Their commitment to local sourcing demonstrates a holistic approach to sustainability.',
                    'This firm understands that true innovation happens at the material level.',
                ],
                'project_team' => [
                    'Material Specialist: Dr. Lisa Brown',
                    'Research Lead: Alex Thompson',
                    'Supply Chain Manager: Maria Garcia',
                    'Testing Coordinator: James Wilson',
                ],
                'additional_images' => [
                    'uploads/press/gallery/ar-1.jpg',
                    'uploads/press/gallery/ar-2.jpg',
                    'uploads/press/gallery/ar-3.jpg',
                ],
                'video_interview' => 'https://player.vimeo.com/video/76979871?h=8272103f6e',
            ],
            [
                'publication' => 'Domus',
                'title' => 'Cultural Architecture: Blending Tradition with Modernity',
                'date' => '2023-11-15',
                'excerpt' => 'Exploring how MAY Designs integrates cultural elements into contemporary architectural expressions.',
                'image' => 'uploads/press/domus-cultural-architecture.jpg',
                'category' => 'Feature',
                'featured' => true,
                'sort_order' => 5,
                'full_article' => '<p>Domus magazine explores MAY Designs\' sensitive approach to cultural architecture through their award-winning "Heritage Center" project in Kyoto, Japan.</p>
                
                <h3>Cultural Sensitivity</h3>
                <p>The design team spent six months living in the local community, studying traditional building techniques and understanding cultural significance before beginning the design process.</p>
                
                <h3>Modern Interpretation</h3>
                <p>Traditional Japanese architectural elements like engawa (verandas) and shōji screens are reinterpreted using modern materials and construction techniques, creating a dialogue between past and present.</p>
                
                <h3>Sustainable Preservation</h3>
                <p>The project incorporates earthquake-resistant technology and sustainable climate control systems that preserve the building\'s historical integrity while ensuring its longevity and reduced environmental impact.</p>',
                'publication_details' => [
                    'website' => 'www.domusweb.it',
                    'circulation' => '50,000 International',
                    'audience' => 'Architecture Critics',
                    'founded' => '1928',
                ],
                'key_quotes' => [
                    'MAY Designs demonstrates remarkable sensitivity in their cultural architecture work.',
                    'This project shows how modernity can enhance rather than erase cultural identity.',
                    'Their approach to cultural preservation sets a new standard for international architecture.',
                ],
                'project_team' => [
                    'Cultural Consultant: Kenji Tanaka',
                    'Lead Architect: Sophie Williams',
                    'Historical Preservation: Dr. Yuki Nakamura',
                    'Local Crafts Coordinator: Hiroshi Sato',
                ],
                'additional_images' => [
                    'uploads/press/gallery/domus-1.jpg',
                    'uploads/press/gallery/domus-2.jpg',
                    'uploads/press/gallery/domus-3.jpg',
                ],
                'video_interview' => 'https://player.vimeo.com/video/76979871?h=8272103f6e',
            ],
            [
                'publication' => 'Frame Magazine',
                'title' => 'Interior Architecture: Creating Emotional Spaces',
                'date' => '2023-10-08',
                'excerpt' => 'Featured for innovative interior architecture that creates emotional connections with spaces.',
                'image' => 'uploads/press/frame-emotional-spaces.jpg',
                'category' => 'Profile',
                'featured' => true,
                'sort_order' => 6,
                'full_article' => '<p>Frame Magazine profiles MAY Designs\' unique approach to interior architecture that prioritizes emotional experience and psychological wellbeing.</p>
                
                <h3>Emotional Mapping</h3>
                <p>The firm uses advanced emotional mapping techniques to understand how different spatial configurations, lighting conditions, and material textures affect occupant mood and behavior.</p>
                
                <h3>Sensory Design</h3>
                <p>Projects incorporate multi-sensory elements including carefully curated acoustics, scent diffusion systems, and tactile material experiences that create rich, immersive environments.</p>
                
                <h3>Adaptive Spaces</h3>
                <p>Interiors are designed to be adaptable, with movable partitions and flexible furniture systems that allow spaces to evolve based on changing needs and moods.</p>',
                'publication_details' => [
                    'website' => 'www.frameweb.com',
                    'circulation' => '35,000 Design Professionals',
                    'audience' => 'Interior Design Community',
                    'founded' => '1997',
                ],
                'key_quotes' => [
                    'MAY Designs understands that great interiors are experienced emotionally, not just visually.',
                    'Their sensory approach to design creates spaces that truly resonate with occupants.',
                    'This firm is pioneering a new language of emotional architecture.',
                ],
                'project_team' => [
                    'Interior Architect: Elena Rodriguez',
                    'Psychology Consultant: Dr. Amanda Green',
                    'Lighting Designer: Michael Chen',
                    'Acoustic Specialist: Robert Kim',
                ],
                'additional_images' => [
                    'uploads/press/gallery/frame-1.jpg',
                    'uploads/press/gallery/frame-2.jpg',
                    'uploads/press/gallery/frame-3.jpg',
                ],
                'video_interview' => 'https://player.vimeo.com/video/76979871?h=8272103f6e',
            ],
        ];

        foreach ($pressArticles as $articleData) {
            PressArticle::create($articleData);
        }

        $this->command->info('Press articles seeded successfully!');
        $this->command->info('Total press articles created: ' . count($pressArticles));
        $this->command->info('Featured articles: ' . collect($pressArticles)->where('featured', true)->count());
    }
}