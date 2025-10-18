// pages/Projects/Projects.js
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  FiFilter,
  FiGrid,
  FiList,
  FiSearch,
  FiArrowRight,
} from "react-icons/fi";
import { Link } from "react-router-dom";
import { useProjectData } from "../../store/useProjectStore";

const Projects = () => {
  const [filter, setFilter] = useState("all");
  const [viewMode, setViewMode] = useState("grid");
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("newest");

  const {
    projects,
    categories,
    loading,
    error,
    fetchProjects,
    fetchProjectCategories,
  } = useProjectData();

  useEffect(() => {
    fetchProjects();
    fetchProjectCategories();
  }, [fetchProjects, fetchProjectCategories]);

  // Safe category processing with unique keys
  const getCategoryId = (category) => {
    if (typeof category === "string") return category;
    if (typeof category === "object" && category.id) return String(category.id);
    if (typeof category === "object" && category.name)
      return String(category.name);
    return String(category);
  };

  const getCategoryName = (category) => {
    if (typeof category === "string") {
      return category.charAt(0).toUpperCase() + category.slice(1);
    }
    if (typeof category === "object") {
      if (category.name) return category.name;
      if (category.title) return category.title;
    }
    return String(category).charAt(0).toUpperCase() + String(category).slice(1);
  };

  const getCategoryIcon = (category) => {
    const categoryStr = String(category).toLowerCase();
    if (typeof category === "object") {
      if (category.name) return getCategoryIcon(category.name);
      if (category.title) return getCategoryIcon(category.title);
    }

    switch (categoryStr) {
      case "architecture":
        return "🏛️";
      case "interior":
        return "🛋️";
      case "landscape":
        return "🌿";
      default:
        return "📁";
    }
  };

  // Prepare categories for filtering with unique keys
  const categoryFilters = [
    {
      id: "all",
      name: "All Projects",
      count: projects.length,
      icon: "📁",
    },
    ...(Array.isArray(categories)
      ? categories.map((category) => {
          const categoryId = getCategoryId(category);
          const categoryName = getCategoryName(category);

          return {
            id: categoryId,
            name: categoryName,
            count: projects.filter((p) => {
              const projectCategory = p.category;
              if (typeof projectCategory === "string") {
                return projectCategory === categoryId;
              }
              if (typeof projectCategory === "object") {
                return (
                  projectCategory.id === categoryId ||
                  projectCategory.name === categoryId
                );
              }
              return String(projectCategory) === categoryId;
            }).length,
            icon: getCategoryIcon(category),
          };
        })
      : []),
  ];

  const filteredProjects = projects
    .filter((project) => {
      const matchesCategory =
        filter === "all" ||
        (typeof project.category === "string"
          ? project.category === filter
          : String(project.category) === filter);

      const matchesSearch =
        project.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        project.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (project.tags &&
          Array.isArray(project.tags) &&
          project.tags.some(
            (tag) =>
              typeof tag === "string" &&
              tag.toLowerCase().includes(searchTerm.toLowerCase())
          ));
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

  if (loading && projects.length === 0) {
    return <LoadingSpinner />;
  }

  if (error) {
    return <ErrorMessage error={error} />;
  }

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
              {categoryFilters.map((category) => (
                <button
                  key={category.id} // Now using the unique ID
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
                <ProjectCard
                  key={project.id} // Using project ID which should be unique
                  project={project}
                  index={index}
                />
              ))}
            </div>
          ) : (
            <div className="space-y-6">
              {filteredProjects.map((project, index) => (
                <ProjectListItem
                  key={project.id} // Using project ID which should be unique
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
                {projects.length === 0
                  ? "No projects available."
                  : "No projects found matching your criteria."}
              </p>
              {projects.length > 0 && (
                <button
                  onClick={() => {
                    setFilter("all");
                    setSearchTerm("");
                  }}
                  className="text-orange-500 hover:text-orange-600 font-semibold"
                >
                  Clear filters and try again
                </button>
              )}
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
            {categoryFilters
              .filter((cat) => cat.id !== "all")
              .map((category) => (
                <Link
                  key={category.id} // Using category ID
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

// Project Card Component
const ProjectCard = ({ project, index }) => {
  const hasAwards =
    project.awards &&
    Array.isArray(project.awards) &&
    project.awards.length > 0;
  const hasTags =
    project.tags && Array.isArray(project.tags) && project.tags.length > 0;
  const hasImages =
    project.images &&
    Array.isArray(project.images) &&
    project.images.length > 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all cursor-pointer group"
    >
      <div className="relative overflow-hidden">
        <img
          src={project.images[0]}
          alt={project.name}
          className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
        />
        {project.is_featured && (
          <div className="absolute top-4 left-4 bg-orange-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
            Featured
          </div>
        )}
        <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-sm font-semibold">
          {project.year}
        </div>
        <div className="absolute bottom-4 left-4">
          <span className="bg-black/70 text-white px-3 py-1 rounded-full text-sm font-medium">
            {typeof project.category === "object"
              ? project.category.name
              : project.category}
          </span>
        </div>
      </div>

      <div className="p-6">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-xl font-bold text-gray-900 group-hover:text-orange-500 transition-colors">
            {project.name}
          </h3>
          {hasAwards && (
            <span className="text-orange-500 text-sm">★ Awarded</span>
          )}
        </div>

        <p className="text-gray-600 mb-4 line-clamp-2">
          {project.short_description || project.description}
        </p>

        {hasTags && (
          <div className="flex flex-wrap gap-1 mb-4">
            {project.tags.slice(0, 3).map((tag, idx) => (
              <span
                key={idx} // Using index as key for tags since they might not have unique IDs
                className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs"
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        <div className="flex items-center justify-between pt-4 border-t border-gray-100">
          <span className="text-sm text-gray-500 flex items-center">
            <FiFilter className="mr-1" size={14} />
            {project.location}
          </span>
          <Link
            to={`/projects/${project.slug || project.id}`}
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

// Project List Item Component
const ProjectListItem = ({ project, index }) => {
  const hasAwards =
    project.awards &&
    Array.isArray(project.awards) &&
    project.awards.length > 0;
  const hasTags =
    project.tags && Array.isArray(project.tags) && project.tags.length > 0;
  const hasImages =
    project.images &&
    Array.isArray(project.images) &&
    project.images.length > 0;

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
            src={project.images[0]}
            alt={project.name}
            className="w-full h-48 md:h-full object-cover rounded-lg group-hover:scale-105 transition-transform duration-500"
          />
          {project.is_featured && (
            <div className="absolute top-3 left-3 bg-orange-500 text-white px-2 py-1 rounded-full text-xs font-semibold">
              Featured
            </div>
          )}
        </div>

        <div className="flex-1">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center space-x-4">
              <span className="text-sm font-medium text-orange-500 uppercase tracking-wide">
                {typeof project.category === "object"
                  ? project.category.name
                  : project.category}
              </span>
              <span className="text-gray-500 text-sm">{project.year}</span>
            </div>
            {hasAwards && (
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

          {hasTags && (
            <div className="flex flex-wrap gap-2 mb-4">
              {project.tags.map((tag, idx) => (
                <span
                  key={idx} // Using index as key for tags
                  className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}

          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4 text-sm text-gray-500">
              <span className="flex items-center">
                <FiFilter className="mr-1" size={14} />
                {project.location}
              </span>
            </div>
            <Link
              to={`/projects/${project.slug || project.id}`}
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

// Loading Spinner Component
const LoadingSpinner = () => (
  <div className="min-h-screen bg-gray-50 pt-20 flex items-center justify-center">
    <div className="text-center">
      <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-orange-500 mx-auto"></div>
      <p className="mt-4 text-gray-600">Loading projects...</p>
    </div>
  </div>
);

// Error Message Component
const ErrorMessage = ({ error }) => (
  <div className="min-h-screen bg-gray-50 pt-20 flex items-center justify-center">
    <div className="text-center">
      <div className="text-6xl mb-4">❌</div>
      <h1 className="text-2xl font-bold text-gray-900 mb-2">
        Error Loading Projects
      </h1>
      <p className="text-gray-600 mb-4">{error}</p>
      <button
        onClick={() => window.location.reload()}
        className="bg-orange-500 text-white px-6 py-2 rounded-lg hover:bg-orange-600"
      >
        Try Again
      </button>
    </div>
  </div>
);

export default Projects;
