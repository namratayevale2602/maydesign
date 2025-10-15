// pages/Projects/ArchitecturePage.js
import React, { useState } from "react";
import { motion } from "framer-motion";
import { FiMapPin, FiCalendar, FiAward, FiArrowRight } from "react-icons/fi";
import { Link } from "react-router-dom";

const architectureProjects = [
  {
    id: 1,
    name: "Modern Cliffside Villa",
    type: "Residential",
    description:
      "A stunning contemporary villa built into a cliffside with panoramic ocean views. Features floor-to-ceiling glass walls, sustainable materials, and seamless indoor-outdoor living.",
    shortDescription: "Luxury residential villa with sustainable design",
    concept: "Harmony with nature through minimalist design",
    designPhilosophy:
      "Creating spaces that blend seamlessly with their natural surroundings while providing modern comfort and sustainable living.",
    highlights: [
      "Sustainable materials",
      "Smart home integration",
      "Panoramic views",
      "Indoor-outdoor flow",
      "Passive solar design",
    ],
    images: [
      "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1513584684374-8bab748fbf90?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
    ],
    location: "Malibu, California",
    year: "2024",
    area: "4500 sq ft",
    budget: "Confidential",
    team: ["Lead Architect: Maria Rodriguez", "Project Manager: James Chen"],
    awards: [
      {
        name: "AIA Design Award 2024",
        organization: "American Institute of Architects",
        year: "2024",
      },
      {
        name: "Sustainable Architecture Prize",
        organization: "Green Building Council",
        year: "2024",
      },
    ],
    testimonials: [
      {
        text: "The architects transformed our vision into a breathtaking reality that exceeds all expectations.",
        author: "Sarah & John Miller",
        role: "Homeowners",
      },
    ],
    featured: true,
    tags: ["Sustainable", "Luxury", "Ocean View", "Modern"],
  },
  {
    id: 4,
    name: "Corporate Headquarters",
    type: "Commercial",
    description:
      "Sustainable office building with biophilic design and smart technology integration. Features green roofs, natural ventilation, and collaborative workspaces.",
    shortDescription: "Eco-friendly corporate campus",
    concept: "Biophilic design for enhanced productivity and well-being",
    designPhilosophy:
      "Merging corporate functionality with environmental responsibility through innovative sustainable design.",
    highlights: [
      "LEED Platinum",
      "Biophilic design",
      "Smart technology",
      "Green roof",
      "Natural ventilation",
    ],
    images: [
      "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
    ],
    location: "San Francisco, CA",
    year: "2023",
    area: "85000 sq ft",
    awards: [
      {
        name: "LEED Platinum Certification",
        organization: "U.S. Green Building Council",
        year: "2023",
      },
    ],
    featured: true,
    tags: ["Sustainable", "Biophilic", "Corporate", "LEED"],
  },
  {
    id: 7,
    name: "Mountain Retreat Cabin",
    type: "Residential",
    description:
      "Minimalist cabin designed for remote mountain living with off-grid capabilities and natural material palette.",
    shortDescription: "Off-grid mountain retreat",
    concept: "Rustic modernism in harmony with wilderness",
    designPhilosophy:
      "Creating a sanctuary that respects and enhances the natural mountain environment.",
    highlights: [
      "Off-grid capable",
      "Natural materials",
      "Passive heating",
      "Wildlife integration",
    ],
    images: [
      "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
    ],
    location: "Aspen, Colorado",
    year: "2023",
    area: "1800 sq ft",
    tags: ["Cabin", "Off-grid", "Mountain", "Minimalist"],
  },
];

const ArchitecturePage = () => {
  const [filter, setFilter] = useState("all");

  const projectTypes = [
    { id: "all", name: "All Projects", count: architectureProjects.length },
    {
      id: "residential",
      name: "Residential",
      count: architectureProjects.filter((p) => p.type === "Residential")
        .length,
    },
    {
      id: "commercial",
      name: "Commercial",
      count: architectureProjects.filter((p) => p.type === "Commercial").length,
    },
  ];

  const filteredProjects = architectureProjects.filter(
    (project) => filter === "all" || project.type.toLowerCase() === filter
  );

  return (
    <div className="min-h-screen pt-20 ">
      {/* Header */}
      <section className="bg-white py-20 pt-30">
        <div className="container mx-auto px-6 ">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
              Architecture
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Innovative architectural designs that blend form, function, and
              sustainability to create spaces that inspire and endure for
              generations.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-12 bg-orange-50">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <div className="text-3xl font-bold text-gray-900 mb-2">
                {architectureProjects.length}+
              </div>
              <div className="text-gray-600">Projects Completed</div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <div className="text-3xl font-bold text-gray-900 mb-2">15+</div>
              <div className="text-gray-600">Years Experience</div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <div className="text-3xl font-bold text-gray-900 mb-2">12</div>
              <div className="text-gray-600">Awards Won</div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              <div className="text-3xl font-bold text-gray-900 mb-2">100%</div>
              <div className="text-gray-600">Client Satisfaction</div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Filters */}
      <section className="py-8 bg-white">
        <div className="container mx-auto px-6">
          <div className="flex flex-wrap gap-4 justify-center">
            {projectTypes.map((type) => (
              <button
                key={type.id}
                onClick={() => setFilter(type.id)}
                className={`px-6 py-3 rounded-full font-medium transition-all ${
                  filter === type.id
                    ? "bg-burnt-orange text-white shadow-lg"
                    : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                }`}
              >
                {type.name} ({type.count})
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {filteredProjects.map((project, index) => (
              <ArchitectureProjectCard
                key={project.id}
                project={project}
                index={index}
              />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              Ready to Start Your Architectural Project?
            </h2>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              Let's collaborate to create a space that reflects your vision and
              stands the test of time.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/contact-us"
                className="bg-burnt-orange text-white px-8 py-4 rounded-lg font-semibold hover:bg-orange-600 transition-colors flex items-center justify-center"
              >
                Start Your Project
                <FiArrowRight className="ml-2" />
              </Link>
              <button className="border-2 border-gray-300 text-gray-700 px-8 py-4 rounded-lg font-semibold hover:border-burnt-orange hover:text-burnt-orange transition-colors">
                View Our Process
              </button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

const ArchitectureProjectCard = ({ project, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.2 }}
      className="bg-white rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-all cursor-pointer group"
    >
      <div className="relative overflow-hidden">
        <img
          src={project.images[0]}
          alt={project.name}
          className="w-full h-80 object-cover group-hover:scale-110 transition-transform duration-700"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        <div className="absolute top-6 left-6">
          <span
            className={`px-4 py-2 rounded-full text-sm font-semibold ${
              project.featured
                ? "bg-burnt-orange text-white"
                : "bg-white/90 text-gray-700"
            }`}
          >
            {project.featured ? "Featured" : project.type}
          </span>
        </div>

        <div className="absolute bottom-6 left-6 right-6 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <p className="text-sm line-clamp-2">{project.shortDescription}</p>
        </div>
      </div>

      <div className="p-8">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-2xl font-bold text-gray-900 group-hover:text-burnt-orange transition-colors">
            {project.name}
          </h3>
          <span className="text-gray-500 flex items-center">
            <FiCalendar className="mr-1" />
            {project.year}
          </span>
        </div>

        <p className="text-gray-600 mb-6 line-clamp-3">{project.description}</p>

        <div className="space-y-4 mb-6">
          <div>
            <h4 className="font-semibold text-gray-900 mb-2">
              Design Concept:
            </h4>
            <p className="text-gray-600 text-sm">{project.concept}</p>
          </div>

          <div>
            <h4 className="font-semibold text-gray-900 mb-2">
              Key Highlights:
            </h4>
            <div className="flex flex-wrap gap-2">
              {project.highlights.slice(0, 4).map((highlight, idx) => (
                <span
                  key={idx}
                  className="bg-orange-50 text-orange-700 px-3 py-1 rounded-full text-sm"
                >
                  {highlight}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between pt-6 border-t border-gray-100">
          <div className="flex items-center space-x-4 text-sm text-gray-500">
            <span className="flex items-center">
              <FiMapPin className="mr-1" />
              {project.location}
            </span>
            <span>{project.area}</span>
          </div>

          <div className="flex items-center space-x-2">
            {project.awards && project.awards.length > 0 && (
              <span className="flex items-center text-burnt-orange text-sm">
                <FiAward className="mr-1" />
                Awarded
              </span>
            )}
            <Link
              to={`/projects/${project.id}`}
              className="bg-burnt-orange text-white px-6 py-2 rounded-lg hover:bg-orange-600 transition-colors font-semibold flex items-center group/link"
            >
              Explore
              <FiArrowRight className="ml-2 group-hover/link:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ArchitecturePage;
