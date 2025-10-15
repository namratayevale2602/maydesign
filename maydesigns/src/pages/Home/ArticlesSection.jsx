import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  FaBook,
  FaExternalLinkAlt,
  FaCalendarAlt,
  FaClock,
} from "react-icons/fa";
import { useBlogData } from "../../store/BlogStore";

const ArticlesSection = () => {
  const {
    blogs,
    blogsLoading,
    blogsError,
    blogCategories,
    filters,
    pagination,
    fetchBlogs,
    setSearchFilter,
    setCategoryFilter,
    setPageFilter,
  } = useBlogData();
  const [searchQuery, setSearchQuery] = useState(filters.search);
  const [selectedCategory, setSelectedCategory] = useState(filters.category);

  // Fetch blogs on component mount and when filters change
  useEffect(() => {
    fetchBlogs(filters);
  }, [filters, fetchBlogs]);

  // Handle search with debounce
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setSearchFilter(searchQuery);
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [searchQuery, setSearchFilter]);

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
    setCategoryFilter(category);
  };

  const handlePageChange = (pageNumber) => {
    setPageFilter(pageNumber);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const currentBlogs = blogs;

  // Mock data for sidebar (you can replace with actual data from your API)

  const tags = [
    "Architecture",
    "Design",
    "Interior",
    "Modern",
    "Sustainable",
    "Minimalist",
    "Luxury",
    "Commercial",
    "Residential",
    "Landscape",
  ];

  if (blogsLoading) {
    return (
      <div className="min-h-screen bg-gray-50 pt-30 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading articles...</p>
        </div>
      </div>
    );
  }

  if (blogsError) {
    return (
      <div className="min-h-screen bg-gray-50 pt-30 flex items-center justify-center">
        <div className="text-center">
          <h3 className="text-2xl font-bold text-gray-600 mb-4">
            Error Loading Articles
          </h3>
          <p className="text-gray-500 mb-4">{blogsError}</p>
          <button
            onClick={() => fetchBlogs(filters)}
            className="bg-burnt-orange text-white px-6 py-2 rounded-lg hover:bg-orange-600 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

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
          {currentBlogs.map((blog, index) => (
            <motion.div
              key={blog.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group cursor-pointer"
            >
              <div className="bg-white rounded-none shadow-sm border border-gray-200 hover:shadow-lg transition-all duration-500 h-full flex flex-col">
                {/* Image */}
                <div className="relative overflow-hidden bg-gray-100">
                  <Link to={`/blog/${blog.slug}`}>
                    <div className="aspect-w-16 aspect-h-12 h-56">
                      <img
                        src={blog.image}
                        alt={blog.title}
                        className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
                      />
                      <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
                    </div>
                  </Link>

                  {/* Category Badge */}
                  <div className="absolute top-4 left-4">
                    <div className="bg-white px-3 py-1 rounded-sm shadow-sm">
                      <span className="text-xs font-semibold text-burnt-orange uppercase tracking-wide">
                        {blog.category}
                      </span>
                    </div>
                  </div>

                  {/* Read Time */}
                  <div className="absolute top-4 right-4">
                    <div className="bg-black bg-opacity-70 text-white px-2 py-1 rounded-sm text-xs flex items-center">
                      <FaClock className="mr-1" />
                      {blog.readTime}
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 flex-1 flex flex-col">
                  <div className="mb-3">
                    <span className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                      {blog.publication}
                    </span>
                  </div>

                  <Link to={`/blog/${blog.slug}`}>
                    <h3 className="text-lg font-light text-gray-900 mb-3 leading-tight group-hover:text-burnt-orange transition-colors duration-300 line-clamp-2">
                      {blog.title}
                    </h3>
                  </Link>

                  <p className="text-gray-500 text-sm leading-relaxed mb-4 flex-1 line-clamp-3">
                    {blog.excerpt}
                  </p>

                  <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                    <span className="text-xs text-gray-500 flex items-center">
                      <FaCalendarAlt className="mr-1" />
                      {blog.date}
                    </span>
                    <Link
                      to={`/blog/${blog.slug}`}
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
            to="/blogs"
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
