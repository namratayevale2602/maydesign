import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  FaBook,
  FaExternalLinkAlt,
  FaCalendarAlt,
  FaClock,
} from "react-icons/fa";

const ArticlesSection = () => {
  const articlesData = [
    {
      id: 1,
      title: "The Psychology of Space: Designing for Human Well-being",
      publication: "Journal of Architectural Psychology",
      date: "March 15, 2024",
      excerpt:
        "An in-depth exploration of how architectural design influences mental health, emotional well-being, and social interactions in residential and commercial spaces.",
      readTime: "8 min read",
      category: "Research",
      image:
        "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
      slug: "psychology-of-space-design",
      author: "Dr. Sarah Chen",
      authorImage:
        "https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80",
      content: `
        <p>The relationship between architectural design and human psychology is profound and multifaceted. Our built environments significantly impact our mental states, emotional responses, and overall well-being.</p>
        
        <h3>The Impact of Spatial Design</h3>
        <p>Research shows that well-designed spaces can reduce stress, improve cognitive function, and enhance social interactions. Key factors include natural light, spatial proportions, color psychology, and material textures.</p>
        
        <h3>Biophilic Design Principles</h3>
        <p>Incorporating natural elements into architectural design has been shown to lower blood pressure, reduce anxiety, and improve creative thinking. This approach connects occupants with nature through direct and indirect means.</p>
        
        <h3>Case Studies</h3>
        <p>Several healthcare and educational facilities have demonstrated remarkable improvements in patient recovery rates and student performance through intentional psychological design strategies.</p>
      `,
    },
    {
      id: 2,
      title: "Sustainable Materials: The Future of Eco-Conscious Architecture",
      publication: "Sustainable Design Review",
      date: "February 28, 2024",
      excerpt:
        "Comprehensive analysis of emerging sustainable materials and their practical application in contemporary architectural projects.",
      readTime: "12 min read",
      category: "Sustainability",
      image:
        "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
      slug: "sustainable-materials-future",
      author: "Michael Rodriguez",
      authorImage:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80",
      content: `
        <p>The architectural industry is undergoing a materials revolution, with sustainable alternatives emerging at an unprecedented pace.</p>
        
        <h3>Innovative Material Solutions</h3>
        <p>From mycelium-based composites to recycled plastic bricks, new materials are challenging traditional construction methods. These innovations offer reduced carbon footprints and improved lifecycle performance.</p>
        
        <h3>Local Sourcing Strategies</h3>
        <p>Emphasizing locally sourced materials not only reduces transportation emissions but also supports regional economies and creates authentic architectural expressions.</p>
        
        <h3>Performance Metrics</h3>
        <p>Modern sustainable materials often outperform traditional options in insulation, durability, and maintenance requirements while being environmentally responsible.</p>
      `,
    },
    {
      id: 3,
      title: "Urban Regeneration: Transforming Cities Through Design",
      publication: "Urban Planning Today",
      date: "January 10, 2024",
      excerpt:
        "Case studies showcasing successful urban regeneration projects and their profound impact on community development and city landscapes.",
      readTime: "15 min read",
      category: "Urban Design",
      image:
        "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
      slug: "urban-regeneration-transformation",
      author: "Elena Martinez",
      authorImage:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80",
      content: `
        <p>Urban regeneration represents a holistic approach to revitalizing cities while preserving their historical and cultural identity.</p>
        
        <h3>Community-Centered Approach</h3>
        <p>Successful regeneration projects prioritize community engagement, ensuring that developments meet actual needs and reflect local character.</p>
        
        <h3>Mixed-Use Development</h3>
        <p>Integrating residential, commercial, and recreational spaces creates vibrant, 24-hour neighborhoods that reduce transportation needs and foster social interaction.</p>
        
        <h3>Sustainable Infrastructure</h3>
        <p>Modern regeneration incorporates green infrastructure, smart technology, and resilient design to create future-proof urban environments.</p>
      `,
    },
    {
      id: 4,
      title: "Cultural Architecture: Preserving Heritage Through Modern Design",
      publication: "Cultural Heritage Journal",
      date: "December 5, 2023",
      excerpt:
        "Examining the delicate balance between preserving cultural heritage and embracing contemporary architectural expressions.",
      readTime: "10 min read",
      category: "Cultural Design",
      image:
        "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
      slug: "cultural-architecture-heritage",
      author: "James Yamamoto",
      authorImage:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80",
      content: `
        <p>Contemporary architecture has a crucial role in preserving cultural identity while moving forward with modern design principles.</p>
        
        <h3>Contextual Sensitivity</h3>
        <p>Modern interventions in historical contexts require deep understanding of local traditions, materials, and spatial relationships.</p>
        
        <h3>Adaptive Reuse</h3>
        <p>Transforming historical buildings for contemporary use preserves architectural heritage while meeting modern functional requirements.</p>
        
        <h3>Cultural Narrative</h3>
        <p>Successful cultural architecture tells stories, connects generations, and creates meaningful places that resonate with local communities.</p>
      `,
    },
    {
      id: 5,
      title: "The Art of Light in Architectural Spaces",
      publication: "Light & Design Magazine",
      date: "November 20, 2023",
      excerpt:
        "Exploring the transformative power of natural and artificial lighting in creating mood, functionality, and aesthetic appeal.",
      readTime: "6 min read",
      category: "Design Theory",
      image:
        "https://images.unsplash.com/photo-1613977257363-707ba9348227?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
      slug: "art-of-light-architecture",
      author: "Sophie Williams",
      authorImage:
        "https://images.unsplash.com/photo-1544725176-7c40e5a71c5e?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80",
      content: `
        <p>Light is one of the most powerful tools in architectural design, capable of transforming spaces and influencing human experience.</p>
        
        <h3>Natural Light Dynamics</h3>
        <p>Understanding solar paths, seasonal variations, and daylight quality enables architects to create spaces that change throughout the day and year.</p>
        
        <h3>Artificial Lighting Strategies</h3>
        <p>Layered lighting approaches combining ambient, task, and accent lighting create dynamic, functional, and emotionally resonant environments.</p>
        
        <h3>Psychological Impact</h3>
        <p>Different lighting conditions can evoke various emotional responses, from the drama of strong contrasts to the calm of soft, diffused light.</p>
      `,
    },
    {
      id: 6,
      title: "Biophilic Design: Connecting Architecture with Nature",
      publication: "Environmental Architecture",
      date: "October 15, 2023",
      excerpt:
        "Understanding biophilic design principles and their implementation in creating healthier, more productive built environments.",
      readTime: "14 min read",
      category: "Wellness Design",
      image:
        "https://images.unsplash.com/photo-1613490493576-7fde63acd811?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
      slug: "biophilic-design-nature-connection",
      author: "Dr. Amanda Green",
      authorImage:
        "https://images.unsplash.com/photo-1551836026-d5c88ac5d691?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80",
      content: `
        <p>Biophilic design represents a fundamental shift in how we approach architecture, recognizing our innate connection to the natural world.</p>
        
        <h3>Core Principles</h3>
        <p>Direct nature experiences, indirect natural references, and spatial experiences that mimic natural environments form the foundation of biophilic design.</p>
        
        <h3>Health Benefits</h3>
        <p>Studies demonstrate significant improvements in stress reduction, cognitive function, and emotional well-being in biophilically designed spaces.</p>
        
        <h3>Implementation Strategies</h3>
        <p>From living walls and water features to natural materials and organic forms, numerous strategies can incorporate biophilic principles at various scales.</p>
      `,
    },
  ];

  return (
    <section id="articles" className="py-20 bg-white">
      <div className="container mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-6xl font-light text-gray-900 mb-6 tracking-tight">
            Articles & Publications
          </h2>
          <div className="w-24 h-1 bg-burnt-orange mx-auto mb-8"></div>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Insights, research, and thought leadership from our team of
            architects and designers
          </p>
        </motion.div>

        {/* Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {articlesData.map((article, index) => (
            <motion.div
              key={article.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group cursor-pointer"
            >
              <div className="bg-white rounded-none shadow-sm border border-gray-200 hover:shadow-lg transition-all duration-500 h-full flex flex-col">
                {/* Image */}
                <div className="relative overflow-hidden bg-gray-100">
                  <Link to={`/blog/${article.slug}`}>
                    <div className="aspect-w-16 aspect-h-12 h-56">
                      <img
                        src={article.image}
                        alt={article.title}
                        className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
                      />
                      <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
                    </div>
                  </Link>

                  {/* Category Badge */}
                  <div className="absolute top-4 left-4">
                    <div className="bg-white px-3 py-1 rounded-sm shadow-sm">
                      <span className="text-xs font-semibold text-burnt-orange uppercase tracking-wide">
                        {article.category}
                      </span>
                    </div>
                  </div>

                  {/* Read Time */}
                  <div className="absolute top-4 right-4">
                    <div className="bg-black bg-opacity-70 text-white px-2 py-1 rounded-sm text-xs flex items-center">
                      <FaClock className="mr-1" />
                      {article.readTime}
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 flex-1 flex flex-col">
                  <div className="mb-3">
                    <span className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                      {article.publication}
                    </span>
                  </div>

                  <Link to={`/blog/${article.slug}`}>
                    <h3 className="text-lg font-light text-gray-900 mb-3 leading-tight group-hover:text-burnt-orange transition-colors duration-300 line-clamp-2">
                      {article.title}
                    </h3>
                  </Link>

                  <p className="text-gray-500 text-sm leading-relaxed mb-4 flex-1 line-clamp-3">
                    {article.excerpt}
                  </p>

                  <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                    <span className="text-xs text-gray-500 flex items-center">
                      <FaCalendarAlt className="mr-1" />
                      {article.date}
                    </span>
                    <Link
                      to={`/blog/${article.slug}`}
                      className="text-burnt-orange text-sm font-medium flex items-center group/btn hover:text-burnt-orange/80 transition-colors"
                    >
                      Read Article
                      <FaExternalLinkAlt className="ml-2 text-xs group-hover/btn:translate-x-1 transition-transform duration-300" />
                    </Link>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Load More Button - Redirects to Blog Page */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-center mt-12"
        >
          <Link
            to="/blog"
            className="inline-block border-2 border-burnt-orange text-burnt-orange px-8 py-3 font-medium hover:bg-burnt-orange hover:text-white transition-all duration-300"
          >
            View All Articles
          </Link>
        </motion.div>
      </div>

      <style jsx>{`
        .text-burnt-orange {
          color: #be5103;
        }
        .bg-burnt-orange {
          background-color: #be5103;
        }
        .border-burnt-orange {
          border-color: #be5103;
        }
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        .line-clamp-3 {
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </section>
  );
};

export default ArticlesSection;
