import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  FaCalendarAlt,
  FaUser,
  FaArrowRight,
  FaSearch,
  FaClock,
  FaFire,
  FaTags,
  FaBookmark,
} from "react-icons/fa";
import { useBlogData } from "../../store/BlogStore";

const BlogPage = () => {
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
    <div className="min-h-screen bg-cream-50 pt-40">
      {/* Header Section */}
      <section className="bg-burnt-orange py-20">
        <div className="container mx-auto px-6 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-4xl md:text-6xl font-bold text-white mb-4"
          >
            Design Insights
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl text-amber-100 max-w-3xl mx-auto"
          >
            Explore the latest trends, ideas, and inspiration in architecture
            and design from our expert team.
          </motion.p>
        </div>
      </section>
      {/* Blog Content */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Main Content */}
            <div className="lg:w-3/4">
              {/* Search and Filter Section */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="mb-12"
              >
                <div className="flex flex-col md:flex-row gap-6 justify-between items-center">
                  {/* Search Bar */}
                  <div className="relative w-full md:w-96">
                    <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Search articles..."
                      value={searchQuery}
                      onChange={handleSearch}
                      className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    />
                  </div>

                  {/* Category Filter */}
                  <div className="flex flex-wrap gap-2">
                    <button
                      onClick={() => handleCategorySelect("All")}
                      className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                        selectedCategory === "All"
                          ? "bg-burnt-orange text-white"
                          : "bg-white text-gray-700 hover:bg-gray-100"
                      }`}
                    >
                      All Categories
                    </button>
                    {blogCategories.map((category) => (
                      <button
                        key={category.id}
                        onClick={() => handleCategorySelect(category.name)}
                        className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                          selectedCategory === category.name
                            ? "bg-burnt-orange text-white"
                            : "bg-white text-gray-700 hover:bg-gray-100"
                        }`}
                      >
                        {category.name}
                      </button>
                    ))}
                  </div>
                </div>
              </motion.div>

              {/* Blog Grid */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8 }}
                className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12"
              >
                {currentBlogs.map((blog, index) => (
                  <motion.article
                    key={blog.id}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    whileHover={{ y: -5 }}
                    className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all"
                  >
                    <Link to={`/blog/${blog.slug}`}>
                      <div className="relative overflow-hidden">
                        <img
                          src={blog.image}
                          alt={blog.title}
                          className="w-full h-48 object-cover transition-transform duration-300 hover:scale-105"
                        />
                        <div className="absolute top-4 left-4">
                          <span className="bg-burnt-orange text-white px-3 py-1 rounded-full text-sm font-medium">
                            {blog.category}
                          </span>
                        </div>
                      </div>

                      <div className="p-6">
                        <h2 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2 hover:text-orange-500 transition-colors">
                          {blog.title}
                        </h2>

                        <p className="text-gray-600 mb-4 line-clamp-3">
                          {blog.excerpt}
                        </p>

                        <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                          <div className="flex items-center space-x-4">
                            <div className="flex items-center">
                              <FaUser className="mr-1" />
                              <span>{blog.author}</span>
                            </div>
                            <div className="flex items-center">
                              <FaCalendarAlt className="mr-1" />
                              <span>
                                {new Date(
                                  blog.published_date
                                ).toLocaleDateString()}
                              </span>
                            </div>
                          </div>
                          <div className="flex items-center">
                            <FaClock className="mr-1" />
                            <span>{blog.read_time}</span>
                          </div>
                        </div>

                        <div className="flex items-center text-burnt-orange font-medium hover:text-orange-600 transition-colors">
                          Read More <FaArrowRight className="ml-2" />
                        </div>
                      </div>
                    </Link>
                  </motion.article>
                ))}
              </motion.div>

              {/* No Results Message */}
              {currentBlogs.length === 0 && !blogsLoading && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-center py-12"
                >
                  <h3 className="text-2xl font-bold text-gray-600 mb-4">
                    No articles found
                  </h3>
                  <p className="text-gray-500">
                    Try adjusting your search or filter criteria.
                  </p>
                </motion.div>
              )}

              {/* Pagination */}
              {pagination.last_page > 1 && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                  className="flex justify-center items-center space-x-2"
                >
                  <button
                    onClick={() =>
                      handlePageChange(pagination.current_page - 1)
                    }
                    disabled={pagination.current_page === 1}
                    className="px-4 py-2 border border-gray-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
                  >
                    Previous
                  </button>

                  {[...Array(pagination.last_page)].map((_, index) => (
                    <button
                      key={index + 1}
                      onClick={() => handlePageChange(index + 1)}
                      className={`px-4 py-2 border rounded-lg ${
                        pagination.current_page === index + 1
                          ? "bg-burnt-orange text-white border-orange-500"
                          : "border-gray-300 hover:bg-gray-50"
                      }`}
                    >
                      {index + 1}
                    </button>
                  ))}

                  <button
                    onClick={() =>
                      handlePageChange(pagination.current_page + 1)
                    }
                    disabled={pagination.current_page === pagination.last_page}
                    className="px-4 py-2 border border-gray-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
                  >
                    Next
                  </button>
                </motion.div>
              )}
            </div>

            {/* Sidebar */}
            <div className="lg:w-1/4">
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="space-y-8"
              >
                {/* Popular Posts */}
                <div className="bg-white rounded-xl p-6 shadow-lg">
                  <div className="flex items-center mb-6">
                    <FaFire className="text-burnt-orange mr-2" />
                    <h3 className="text-xl font-bold text-burnt-orange">
                      Popular Posts
                    </h3>
                  </div>
                  <div className="space-y-4">
                    {currentBlogs.map((blog, index) => (
                      <motion.div
                        key={blog.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4, delay: index * 0.1 }}
                        className="flex items-center space-x-3 p-3 rounded-lg hover:bg-white transition-colors cursor-pointer"
                      >
                        <Link to={`/blog/${blog.slug}`}>
                          <div className="flex-1 min-w-0">
                            <h4 className="text-sm font-semibold text-gray-900 line-clamp-2 hover:text-burnt-orange transition-colors">
                              {blog.title}
                            </h4>
                            <p className="text-xs text-gray-500 mt-1">
                              {new Date(blog.date).toLocaleDateString()}
                            </p>
                          </div>
                        </Link>
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* Categories */}
                <div className="bg-white rounded-xl p-6 shadow-lg">
                  <div className="flex items-center mb-6">
                    <FaTags className="text-burnt-orange mr-2" />
                    <h3 className="text-xl font-bold text-burnt-orange">
                      Categories
                    </h3>
                  </div>
                  <div className="space-y-2">
                    {blogCategories.slice(0, 6).map((category) => (
                      <motion.button
                        key={category.id}
                        whileHover={{ x: 5 }}
                        onClick={() => handleCategorySelect(category.name)}
                        className={`w-full text-left px-3 py-2 rounded-lg transition-colors ${
                          selectedCategory === category.name
                            ? "bg-burnt-orange text-black"
                            : "text-gray-700 hover:bg-white"
                        }`}
                      >
                        <span className="font-medium">{category.name}</span>
                        <span className="float-right text-sm opacity-70">
                          ({category.count || 0})
                        </span>
                      </motion.button>
                    ))}
                  </div>
                </div>

                {/* Popular Tags */}
                <div className="bg-white rounded-xl p-6 shadow-lg">
                  <div className="flex items-center mb-6">
                    <FaBookmark className="text-burnt-orange mr-2" />
                    <h3 className="text-xl font-bold text-burnt-orange">
                      Popular Tags
                    </h3>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {tags.map((tag, index) => (
                      <motion.span
                        key={tag}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.3, delay: index * 0.05 }}
                        className="inline-block bg-white text-gray-700 px-3 py-1 rounded-full text-sm border border-orange-200 hover:bg-burnt-orange hover:text-black transition-colors cursor-pointer"
                      >
                        {tag}
                      </motion.span>
                    ))}
                  </div>
                </div>

                {/* Newsletter Sidebar */}
                <div className="bg-burnt-orange rounded-xl p-6 text-white shadow-lg">
                  <h3 className="text-xl font-bold mb-3">Stay Updated</h3>
                  <p className="text-amber-100 text-sm mb-4">
                    Get the latest design insights directly in your inbox.
                  </p>
                  <div className="space-y-3">
                    <input
                      type="email"
                      placeholder="Your email"
                      className="w-full px-3 py-2 rounded-lg text-white text-sm border border-cream-200 focus:ring-2 focus:ring-white"
                    />
                    <button className="w-full bg-white text-orange-500 py-2 rounded-lg font-semibold text-sm hover:bg-gray-100 transition-colors">
                      Subscribe
                    </button>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className=" bg-burnt-orange rounded-2xl p-8 md:p-12 text-center text-white"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Stay Inspired
            </h2>
            <p className="text-amber-100 mb-6 max-w-2xl mx-auto">
              Get the latest design insights, project showcases, and industry
              trends delivered to your inbox.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 rounded-lg border border-cream-200 text-white focus:ring-2 focus:ring-white"
              />
              <button className="bg-white text-burnt-orange px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
                Subscribe
              </button>
            </div>
          </motion.div>
        </div>
      </section>
      <style jsx>{`
        .bg-cream-50 {
          background-color: #fefaf6;
        }
        .border-cream-200 {
          border-color: #fae8d8;
        }
        .text-burnt-orange {
          color: #be5103;
        }
        .bg-burnt-orange {
          background-color: #be5103;
        }
      `}</style>
    </div>
  );
};

export default BlogPage;
