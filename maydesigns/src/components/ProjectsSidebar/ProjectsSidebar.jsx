// components/ProjectsSidebar/ProjectsSidebar.js
import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiChevronRight,
  FiChevronDown,
  FiGrid,
  FiHome,
  FiAward,
  FiTrendingUp,
  FiClock,
} from "react-icons/fi";
import { FaBuilding, FaLeaf } from "react-icons/fa";

const ProjectsSidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [expandedSections, setExpandedSections] = useState({
    architecture: true,
    interior: true,
    landscape: true,
  });

  // Get query parameters from URL
  const getQueryParams = () => {
    const params = new URLSearchParams(location.search);
    return params.get("type") || "all";
  };

  // Update expanded sections based on current route
  useEffect(() => {
    const currentType = getQueryParams();
    const currentPath = location.pathname;

    // Auto-expand the section that matches current route
    if (currentPath.includes("/architecture")) {
      setExpandedSections((prev) => ({ ...prev, architecture: true }));
    } else if (currentPath.includes("/interior")) {
      setExpandedSections((prev) => ({ ...prev, interior: true }));
    } else if (currentPath.includes("/landscape")) {
      setExpandedSections((prev) => ({ ...prev, landscape: true }));
    }
  }, [location.pathname]);

  const toggleSection = (section) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  const menuItems = [
    {
      id: "all",
      name: "All Projects",
      path: "/projects",
      icon: <FiGrid className="w-5 h-5" />,
      exact: true,
      description: "Browse all our projects",
    },
    {
      id: "architecture",
      name: "Architecture",
      path: "/projects/architecture",
      icon: <FaBuilding className="w-5 h-5" />,
      description: "Building designs and structures",
      children: [
        {
          name: "All Architecture",
          path: "/projects/architecture",
          description: "All architectural projects",
        },
        {
          name: "Residential",
          path: "/projects/architecture",
          description: "Homes and living spaces",
        },
        {
          name: "Commercial",
          path: "/projects/architecture",
          description: "Office and business spaces",
        },
      ],
    },
    {
      id: "interior",
      name: "Interior Design",
      path: "/projects/interior",
      icon: <FiHome className="w-5 h-5" />,
      description: "Interior spaces and decor",
      children: [
        {
          name: "All Interior",
          path: "/projects/interior",
          description: "All interior design projects",
        },
        {
          name: "Residential Interior",
          path: "/projects/interior/residential",
          description: "Home interiors and decor",
        },
        {
          name: "Commercial Interior",
          path: "/projects/interior/commercial",
          description: "Office and retail interiors",
        },
      ],
    },
    {
      id: "landscape",
      name: "Landscape Design",
      path: "/projects/landscape",
      icon: <FaLeaf className="w-5 h-5" />,
      description: "Outdoor spaces and gardens",
      children: [
        {
          name: "All Landscape",
          path: "/projects/landscape",
          description: "All landscape projects",
        },
        {
          name: "Residential Gardens",
          path: "/projects/landscape",
          description: "Home gardens and yards",
        },
        {
          name: "Public Spaces",
          path: "/projects/landscape",
          description: "Parks and community spaces",
        },
        {
          name: "Commercial Landscape",
          path: "/projects/landscape",
          description: "Corporate campuses",
        },
      ],
    },
  ];

  const featuredProjects = [
    {
      id: 1,
      name: "Modern Cliffside Villa",
      category: "Architecture",
      path: "/projects/1",
      image:
        "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80",
    },
    {
      id: 2,
      name: "Urban Loft Transformation",
      category: "Interior",
      path: "/projects/2",
      image:
        "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80",
    },
    {
      id: 3,
      name: "Zen Garden Retreat",
      category: "Landscape",
      path: "/projects/3",
      image:
        "https://images.unsplash.com/photo-1560717789-0ac7c58ac90a?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80",
    },
  ];

  const isActive = (path, exact = false) => {
    if (exact) {
      return location.pathname === path && getQueryParams() === "all";
    }

    // For paths with query parameters
    if (path.includes("?")) {
      const [basePath, query] = path.split("?");
      const param = query.split("=")[1];
      return location.pathname === basePath && getQueryParams() === param;
    }

    return location.pathname.startsWith(path);
  };

  const handleFeaturedProjectClick = (projectPath) => {
    navigate(projectPath);
    // Scroll to top when navigating
    window.scrollTo(0, 0);
  };

  const handleCategoryClick = (path) => {
    navigate(path);
    // Scroll to top when navigating
    window.scrollTo(0, 0);
  };

  return (
    <div className="w-80 hidden lg:flex bg-white border-r border-gray-200 h-[calc(100vh-5rem)] overflow-y-auto sticky top-50">
      {/* Custom Styles */}
      <style jsx>{`
        .bg-cream {
          background-color: #fefaf6;
        }
        .text-burnt-orange {
          color: #be5103;
        }
        .bg-burnt-orange {
          background-color: #be5103;
        }
        .border-burnt-orange {
          border-color: #be5103;
        }
      `}</style>
      <div className="p-6 w-full">
        {/* Header */}
        <div className="mb-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-2">
            Project Categories
          </h2>
          <p className="text-sm text-gray-500">
            Explore our portfolio by category
          </p>
        </div>

        {/* Navigation Menu */}
        <nav className="space-y-1 mb-8">
          {menuItems.map((item) => (
            <div
              key={item.id}
              className="border-b border-gray-100 last:border-b-0"
            >
              {item.children ? (
                <div>
                  <button
                    onClick={() => toggleSection(item.id)}
                    className={`w-full flex items-center justify-between p-3 rounded-lg transition-all duration-200 ${
                      isActive(item.path)
                        ? "bg-orange-50 text-burnt-orange border border-orange-200 shadow-sm"
                        : "text-gray-700 hover:bg-gray-50 hover:text-gray-900"
                    }`}
                  >
                    <div className="flex items-center space-x-3 flex-1 text-left">
                      <div
                        className={`p-2 rounded-lg ${
                          isActive(item.path)
                            ? "bg-orange-100 text-burnt-orange"
                            : "bg-gray-100 text-gray-600"
                        }`}
                      >
                        {item.icon}
                      </div>
                      <div className="flex-1">
                        <span className="font-medium block">{item.name}</span>
                        <span className="text-xs text-gray-500 mt-1 block">
                          {item.description}
                        </span>
                      </div>
                    </div>
                    {expandedSections[item.id] ? (
                      <FiChevronDown className="w-4 h-4 flex-shrink-0" />
                    ) : (
                      <FiChevronRight className="w-4 h-4 flex-shrink-0" />
                    )}
                  </button>

                  <AnimatePresence>
                    {expandedSections[item.id] && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.2 }}
                        className="ml-4 mt-1 space-y-1 border-l-2 border-gray-100 pl-4"
                      >
                        {item.children.map((child, index) => (
                          <button
                            key={index}
                            onClick={() => handleCategoryClick(child.path)}
                            className={`w-full text-left block p-2 rounded-lg text-sm transition-all duration-200 ${
                              isActive(child.path, true)
                                ? "bg-orange-100 text-burnt-orange font-medium shadow-sm"
                                : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                            }`}
                          >
                            <div>
                              <span className="block">{child.name}</span>
                              <span className="text-xs text-gray-500 mt-1 block">
                                {child.description}
                              </span>
                            </div>
                          </button>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ) : (
                <button
                  onClick={() => handleCategoryClick(item.path)}
                  className={`w-full flex items-center space-x-3 p-3 rounded-lg transition-all duration-200 ${
                    isActive(item.path, item.exact)
                      ? "bg-orange-50 text-burnt-orange border border-orange-200 font-medium shadow-sm"
                      : "text-gray-700 hover:bg-gray-50 hover:text-gray-900"
                  }`}
                >
                  <div
                    className={`p-2 rounded-lg ${
                      isActive(item.path, item.exact)
                        ? "bg-orange-100 text-burnt-orange"
                        : "bg-gray-100 text-gray-600"
                    }`}
                  >
                    {item.icon}
                  </div>
                  <div className="flex-1 text-left">
                    <span className="block">{item.name}</span>
                    <span className="text-xs text-gray-500 mt-1 block">
                      {item.description}
                    </span>
                  </div>
                </button>
              )}
            </div>
          ))}
        </nav>

        {/* Quick Stats */}
        <div className="mb-8 p-4 bg-gradient-to-br from-orange-50 to-amber-50 rounded-xl border border-orange-100">
          <h3 className="text-sm font-semibold text-gray-900 mb-4 flex items-center">
            <FiTrendingUp className="w-4 h-4 mr-2 text-burnt-orange" />
            Project Stats
          </h3>
          <div className="space-y-3 text-sm">
            <div className="flex items-center justify-between p-2 bg-white rounded-lg">
              <span className="text-gray-600 flex items-center">
                <FiGrid className="w-3 h-3 mr-2" />
                Total Projects
              </span>
              <span className="font-semibold text-burnt-orange">24</span>
            </div>
            <div className="flex items-center justify-between p-2 bg-white rounded-lg">
              <span className="text-gray-600 flex items-center">
                <FiAward className="w-3 h-3 mr-2" />
                Awarded
              </span>
              <span className="font-semibold text-burnt-orange">12</span>
            </div>
            <div className="flex items-center justify-between p-2 bg-white rounded-lg">
              <span className="text-gray-600 flex items-center">
                <FiClock className="w-3 h-3 mr-2" />
                In Progress
              </span>
              <span className="font-semibold text-burnt-orange">6</span>
            </div>
          </div>
        </div>

        {/* Featured Projects */}
        <div className="p-4 bg-gray-50 rounded-xl border border-gray-200">
          <h3 className="text-sm font-semibold text-gray-900 mb-4">
            Featured Projects
          </h3>
          <div className="space-y-3">
            {featuredProjects.map((project, index) => (
              <button
                key={project.id}
                onClick={() => handleFeaturedProjectClick(project.path)}
                className="w-full flex items-center space-x-3 p-3 bg-white rounded-lg hover:shadow-md transition-all duration-200 group"
              >
                <img
                  src={project.image}
                  alt={project.name}
                  className="w-12 h-12 rounded-lg object-cover flex-shrink-0"
                />
                <div className="flex-1 text-left">
                  <p className="text-sm font-medium text-gray-900 group-hover:text-burnt-orange transition-colors">
                    {project.name}
                  </p>
                  <p className="text-xs text-gray-500">{project.category}</p>
                </div>
                <FiChevronRight className="w-4 h-4 text-gray-400 group-hover:text-burnt-orange group-hover:translate-x-1 transition-all" />
              </button>
            ))}
          </div>

          {/* View All Button */}
          <button
            onClick={() => handleCategoryClick("/projects")}
            className="w-full mt-4 text-center text-sm text-burnt-orange hover:text-burnt-orange font-medium py-2 rounded-lg hover:bg-orange-50 transition-colors"
          >
            View All Projects →
          </button>
        </div>

        {/* Contact CTA */}
        <div className="mt-6 p-4 bg-burnt-orange rounded-xl text-white">
          <h3 className="text-sm font-semibold mb-2">Start Your Project</h3>
          <p className="text-xs opacity-90 mb-3">
            Ready to bring your vision to life?
          </p>
          <button
            onClick={() => navigate("/contact-us")}
            className="w-full bg-white text-burnt-orange text-sm font-semibold py-2 rounded-lg hover:bg-gray-100 transition-colors"
          >
            Get in Touch
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProjectsSidebar;
