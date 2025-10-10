// pages/Projects/Projects.js
import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  FiFilter,
  FiGrid,
  FiList,
  FiSearch,
  FiArrowRight,
} from "react-icons/fi";
import { Link } from "react-router-dom";

const projectsData = [
  {
    id: 1,
    name: "Modern Cliffside Villa",
    category: "architecture",
    subCategory: "residential",
    description:
      "A stunning contemporary villa built into a cliffside with panoramic ocean views",
    shortDescription: "Luxury residential villa with sustainable design",
    image:
      "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
    location: "Malibu, California",
    year: "2024",
    awards: ["AIA Design Award 2024"],
    featured: true,
    tags: ["Sustainable", "Luxury", "Ocean View"],
  },
  {
    id: 2,
    name: "Urban Loft Transformation",
    category: "interior",
    subCategory: "residential",
    description:
      "Complete transformation of a downtown industrial space into a modern living loft",
    shortDescription: "Industrial chic loft conversion",
    image:
      "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
    location: "New York, NY",
    year: "2023",
    awards: ["Interior Design Excellence Award"],
    featured: true,
    tags: ["Industrial", "Smart Home", "Urban"],
  },
  {
    id: 3,
    name: "Zen Garden Retreat",
    category: "landscape",
    subCategory: "residential",
    description:
      "Serene Japanese-inspired garden with water features and meditation spaces",
    shortDescription: "Japanese garden oasis",
    image:
      "https://images.unsplash.com/photo-1560717789-0ac7c58ac90a?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
    location: "Portland, Oregon",
    year: "2024",
    awards: ["Landscape Architecture Award"],
    featured: false,
    tags: ["Japanese", "Meditation", "Water Features"],
  },
  {
    id: 4,
    name: "Corporate Headquarters",
    category: "architecture",
    subCategory: "commercial",
    description:
      "Sustainable office building with biophilic design and smart technology integration",
    shortDescription: "Eco-friendly corporate campus",
    image:
      "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
    location: "San Francisco, CA",
    year: "2023",
    awards: ["LEED Platinum Certification"],
    featured: true,
    tags: ["Sustainable", "Biophilic", "Corporate"],
  },
  {
    id: 5,
    name: "Boutique Hotel Interior",
    category: "interior",
    subCategory: "commercial",
    description:
      "Luxury boutique hotel with custom furniture and artisanal details throughout",
    shortDescription: "Luxury hotel interior design",
    image:
      "https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
    location: "Miami, Florida",
    year: "2024",
    awards: ["Hospitality Design Award"],
    featured: false,
    tags: ["Luxury", "Boutique", "Custom Furniture"],
  },
  {
    id: 6,
    name: "Public Park Redevelopment",
    category: "landscape",
    subCategory: "commercial",
    description:
      "Community park with interactive installations and sustainable landscaping",
    shortDescription: "Community park revitalization",
    image:
      "https://images.unsplash.com/photo-1518623489648-a173ef7824f3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
    location: "Chicago, Illinois",
    year: "2023",
    awards: ["Public Space Design Award"],
    featured: false,
    tags: ["Community", "Sustainable", "Interactive"],
  },
];

const Projects = () => {
  const [filter, setFilter] = useState("all");
  const [viewMode, setViewMode] = useState("grid");
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("newest");

  const categories = [
    { id: "all", name: "All Projects", count: projectsData.length, icon: "📁" },
    {
      id: "architecture",
      name: "Architecture",
      count: projectsData.filter((p) => p.category === "architecture").length,
      icon: "🏛️",
    },
    {
      id: "interior",
      name: "Interior Design",
      count: projectsData.filter((p) => p.category === "interior").length,
      icon: "🛋️",
    },
    {
      id: "landscape",
      name: "Landscape",
      count: projectsData.filter((p) => p.category === "landscape").length,
      icon: "🌿",
    },
  ];

  const filteredProjects = projectsData
    .filter((project) => {
      const matchesCategory = filter === "all" || project.category === filter;
      const matchesSearch =
        project.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        project.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        project.tags.some((tag) =>
          tag.toLowerCase().includes(searchTerm.toLowerCase())
        );
      return matchesCategory && matchesSearch;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "newest":
          return new Date(b.year) - new Date(a.year);
        case "oldest":
          return new Date(a.year) - new Date(b.year);
        case "name":
          return a.name.localeCompare(b.name);
        default:
          return 0;
      }
    });

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      {/* Header */}
      <section className="bg-white py-20">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
              Our Projects
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Explore our portfolio of innovative architectural designs,
              interior transformations, and landscape creations that redefine
              spaces and experiences.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Filters and Controls */}
      <section className="py-8 bg-white border-b">
        <div className="container mx-auto px-6">
          <div className="flex flex-col lg:flex-row justify-between items-center space-y-4 lg:space-y-0">
            {/* Search */}
            <div className="w-full lg:w-auto relative">
              <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search projects..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent w-64"
              />
            </div>

            {/* Category Filters */}
            <div className="flex flex-wrap gap-2 justify-center">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setFilter(category.id)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all flex items-center space-x-2 ${
                    filter === category.id
                      ? "bg-orange-500 text-white shadow-lg"
                      : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                  }`}
                >
                  <span>{category.icon}</span>
                  <span>{category.name}</span>
                  <span className="bg-white/20 px-2 py-1 rounded-full text-xs">
                    {category.count}
                  </span>
                </button>
              ))}
            </div>

            {/* Sort and View Controls */}
            <div className="flex items-center space-x-4">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              >
                <option value="newest">Newest First</option>
                <option value="oldest">Oldest First</option>
                <option value="name">Name A-Z</option>
              </select>

              <div className="flex items-center space-x-2 bg-gray-100 rounded-lg p-1">
                <button
                  onClick={() => setViewMode("grid")}
                  className={`p-2 rounded-lg transition-colors ${
                    viewMode === "grid"
                      ? "bg-white text-orange-500 shadow-sm"
                      : "text-gray-600"
                  }`}
                >
                  <FiGrid size={20} />
                </button>
                <button
                  onClick={() => setViewMode("list")}
                  className={`p-2 rounded-lg transition-colors ${
                    viewMode === "list"
                      ? "bg-white text-orange-500 shadow-sm"
                      : "text-gray-600"
                  }`}
                >
                  <FiList size={20} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Grid/List */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          {viewMode === "grid" ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredProjects.map((project, index) => (
                <ProjectCard key={project.id} project={project} index={index} />
              ))}
            </div>
          ) : (
            <div className="space-y-6">
              {filteredProjects.map((project, index) => (
                <ProjectListItem
                  key={project.id}
                  project={project}
                  index={index}
                />
              ))}
            </div>
          )}

          {filteredProjects.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-16"
            >
              <div className="text-6xl mb-4">🔍</div>
              <p className="text-gray-500 text-lg mb-4">
                No projects found matching your criteria.
              </p>
              <button
                onClick={() => {
                  setFilter("all");
                  setSearchTerm("");
                }}
                className="text-orange-500 hover:text-orange-600 font-semibold"
              >
                Clear filters and try again
              </button>
            </motion.div>
          )}
        </div>
      </section>

      {/* Quick Category Navigation */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Browse by Category
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {categories
              .filter((cat) => cat.id !== "all")
              .map((category) => (
                <Link
                  key={category.id}
                  to={`/projects/${category.id}`}
                  className="group"
                >
                  <div className="bg-gray-50 rounded-xl p-8 text-center hover:bg-orange-50 transition-colors border-2 border-transparent hover:border-orange-200">
                    <div className="text-4xl mb-4 group-hover:scale-110 transition-transform">
                      {category.icon}
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">
                      {category.name}
                    </h3>
                    <p className="text-gray-600 mb-4">
                      {category.count} projects
                    </p>
                    <div className="flex items-center justify-center text-orange-500 font-semibold">
                      <span>Explore</span>
                      <FiArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </Link>
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
      className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all cursor-pointer group"
    >
      <div className="relative overflow-hidden">
        <img
          src={project.image}
          alt={project.name}
          className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
        />
        {project.featured && (
          <div className="absolute top-4 left-4 bg-orange-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
            Featured
          </div>
        )}
        <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-semibold">
          {project.year}
        </div>
        <div className="absolute bottom-4 left-4">
          <span className="bg-black/70 text-white px-3 py-1 rounded-full text-sm font-medium">
            {project.category}
          </span>
        </div>
      </div>

      <div className="p-6">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-xl font-bold text-gray-900 group-hover:text-orange-500 transition-colors">
            {project.name}
          </h3>
          {project.awards.length > 0 && (
            <span className="text-orange-500 text-sm">★ Awarded</span>
          )}
        </div>

        <p className="text-gray-600 mb-4 line-clamp-2">
          {project.shortDescription}
        </p>

        <div className="flex flex-wrap gap-1 mb-4">
          {project.tags.slice(0, 3).map((tag, idx) => (
            <span
              key={idx}
              className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs"
            >
              {tag}
            </span>
          ))}
        </div>

        <div className="flex items-center justify-between pt-4 border-t border-gray-100">
          <span className="text-sm text-gray-500 flex items-center">
            <FiFilter className="mr-1" size={14} />
            {project.location}
          </span>
          <Link
            to={`/projects/${project.id}`}
            className="text-orange-500 hover:text-orange-600 font-semibold text-sm flex items-center group/link"
          >
            View Details
            <FiArrowRight className="ml-1 group-hover/link:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </motion.div>
  );
};

const ProjectListItem = ({ project, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: -30 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-all cursor-pointer group"
    >
      <div className="flex flex-col md:flex-row gap-6">
        <div className="md:w-64 flex-shrink-0 relative">
          <img
            src={project.image}
            alt={project.name}
            className="w-full h-48 md:h-full object-cover rounded-lg group-hover:scale-105 transition-transform duration-500"
          />
          {project.featured && (
            <div className="absolute top-3 left-3 bg-orange-500 text-white px-2 py-1 rounded-full text-xs font-semibold">
              Featured
            </div>
          )}
        </div>

        <div className="flex-1">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center space-x-4">
              <span className="text-sm font-medium text-orange-500 uppercase tracking-wide">
                {project.category}
              </span>
              <span className="text-gray-500 text-sm">{project.year}</span>
            </div>
            {project.awards.length > 0 && (
              <div className="flex items-center text-orange-500 text-sm">
                <span className="mr-1">★</span>
                <span>Award Winning</span>
              </div>
            )}
          </div>

          <h3 className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-orange-500 transition-colors">
            {project.name}
          </h3>

          <p className="text-gray-600 mb-4">{project.description}</p>

          <div className="flex flex-wrap gap-2 mb-4">
            {project.tags.map((tag, idx) => (
              <span
                key={idx}
                className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm"
              >
                {tag}
              </span>
            ))}
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4 text-sm text-gray-500">
              <span className="flex items-center">
                <FiFilter className="mr-1" size={14} />
                {project.location}
              </span>
            </div>
            <Link
              to={`/projects/${project.id}`}
              className="bg-orange-500 text-white px-6 py-2 rounded-lg hover:bg-orange-600 transition-colors font-semibold flex items-center group/link"
            >
              Explore Project
              <FiArrowRight className="ml-2 group-hover/link:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Projects;
