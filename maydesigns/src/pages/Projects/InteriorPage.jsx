import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const interiorProjects = [
  {
    id: 1,
    name: "Urban Loft Transformation",
    type: "Residential",
    description:
      "Complete transformation of a downtown industrial space into a modern living loft",
    image:
      "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
    location: "New York, NY",
    year: "2023",
  },
  {
    id: 2,
    name: "Boutique Hotel Interior",
    type: "Commercial",
    description:
      "Luxury boutique hotel with custom furniture and artisanal details",
    image:
      "https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
    location: "Miami, Florida",
    year: "2024",
  },
];

const InteriorPage = () => {
  return (
    <div className="min-h-screen pt-20">
      <section className="bg-white py-20">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
              Interior Design
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Transforming spaces with innovative interior solutions that blend
              functionality with aesthetic appeal.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Subcategory Navigation */}
      <section className="py-8 bg-white">
        <div className="container mx-auto px-6">
          <div className="flex justify-center space-x-8">
            <Link
              to="/projects/interior/residential"
              className="text-lg font-semibold text-gray-700 hover:text-burnt-orange transition-colors"
            >
              Residential
            </Link>
            <Link
              to="/projects/interior/commercial"
              className="text-lg font-semibold text-gray-700 hover:text-burnt-orange transition-colors"
            >
              Commercial
            </Link>
          </div>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {interiorProjects.map((project, index) => (
              <ProjectCard key={project.id} project={project} index={index} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

const ProjectCard = ({ project, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow cursor-pointer group"
    >
      <div className="relative overflow-hidden">
        <img
          src={project.image}
          alt={project.name}
          className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-semibold">
          {project.year}
        </div>
      </div>

      <div className="p-6">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-burnt-orange uppercase tracking-wide">
            {project.type}
          </span>
        </div>

        <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-burnt-orange transition-colors">
          {project.name}
        </h3>

        <p className="text-gray-600 mb-4 line-clamp-2">{project.description}</p>

        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-500">{project.location}</span>
          <button className="text-burnt-orange hover:text-orange-600 font-semibold text-sm">
            View Details
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default InteriorPage;
