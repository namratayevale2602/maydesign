import React, { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import {
  FaCalendarAlt,
  FaUser,
  FaClock,
  FaArrowLeft,
  FaShareAlt,
  FaFacebook,
  FaTwitter,
  FaLinkedin,
} from "react-icons/fa";
import { useBlogData } from "../../store/BlogStore";

const BlogDetailPage = () => {
  const { slug } = useParams();
  const {
    blogDetail,
    blogDetailLoading,
    blogDetailError,
    recentPosts,
    fetchBlogDetail,
    fetchRecentPosts,
    clearBlogDetail,
  } = useBlogData();

  useEffect(() => {
    if (slug) {
      fetchBlogDetail(slug);
      fetchRecentPosts(slug, 3);
    }

    return () => {
      clearBlogDetail();
    };
  }, [slug, fetchBlogDetail, fetchRecentPosts, clearBlogDetail]);

  if (blogDetailLoading) {
    return (
      <div className="min-h-screen bg-gray-50 pt-20 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading article...</p>
        </div>
      </div>
    );
  }

  if (blogDetailError || !blogDetail) {
    return (
      <div className="min-h-screen bg-gray-50 pt-20 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Article Not Found
          </h2>
          <p className="text-gray-600 mb-6">
            The requested blog post could not be found.
          </p>
          <Link
            to="/blog"
            className="text-orange-500 hover:text-orange-600 font-medium"
          >
            ← Back to Blog
          </Link>
        </div>
      </div>
    );
  }

  const shareUrl = window.location.href;
  const shareText = `Check out this article: ${blogDetail.title}`;

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      {/* Navigation */}
      <div className="container mx-auto px-6 py-6">
        <Link
          to="/blog"
          className="inline-flex items-center text-orange-500 hover:text-orange-600 font-medium"
        >
          <FaArrowLeft className="mr-2" />
          Back to Blog
        </Link>
      </div>

      {/* Article Header */}
      <section className="container mx-auto px-6 py-8">
        <motion.article
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto"
        >
          {/* Category and Metadata */}
          <div className="flex items-center justify-between mb-6">
            <span className="bg-orange-100 text-orange-800 px-3 py-1 rounded-full text-sm font-medium">
              {blogDetail.category}
            </span>
            <div className="flex items-center space-x-4 text-sm text-gray-500">
              <div className="flex items-center">
                <FaCalendarAlt className="mr-1" />
                <span>
                  {new Date(blogDetail.published_date).toLocaleDateString()}
                </span>
              </div>
              <div className="flex items-center">
                <FaClock className="mr-1" />
                <span>{blogDetail.read_time}</span>
              </div>
            </div>
          </div>

          {/* Title */}
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            {blogDetail.title}
          </h1>

          {/* Excerpt */}
          <p className="text-xl text-gray-600 mb-8 leading-relaxed">
            {blogDetail.excerpt}
          </p>

          {/* Author Info */}
          <div className="flex items-center space-x-4 mb-8 p-4 bg-white rounded-lg shadow-sm">
            <img
              src={blogDetail.author_image}
              alt={blogDetail.author}
              className="w-12 h-12 rounded-full"
            />
            <div>
              <h4 className="font-semibold text-gray-900">
                {blogDetail.author}
              </h4>
              <p className="text-gray-600 text-sm">{blogDetail.author_role}</p>
            </div>
          </div>

          {/* Featured Image */}
          <div className="mb-8 rounded-xl overflow-hidden">
            <img
              src={blogDetail.image}
              alt={blogDetail.title}
              className="w-full h-64 md:h-96 object-cover"
            />
          </div>

          {/* Article Content */}
          <div
            className="prose prose-lg max-w-none mb-8"
            dangerouslySetInnerHTML={{ __html: blogDetail.content }}
          />

          {/* Tags */}
          {blogDetail.tags && blogDetail.tags.length > 0 && (
            <div className="mb-8">
              <h3 className="font-semibold text-gray-900 mb-3">Tags:</h3>
              <div className="flex flex-wrap gap-2">
                {blogDetail.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Share Buttons */}
          <div className="border-t border-b border-gray-200 py-6 mb-8">
            <h3 className="font-semibold text-gray-900 mb-4">
              Share this article:
            </h3>
            <div className="flex space-x-4">
              <a
                href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
                  shareUrl
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-blue-600 text-white p-2 rounded-lg hover:bg-blue-700 transition-colors"
              >
                <FaFacebook size={20} />
              </a>
              <a
                href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(
                  shareText
                )}&url=${encodeURIComponent(shareUrl)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-blue-400 text-white p-2 rounded-lg hover:bg-blue-500 transition-colors"
              >
                <FaTwitter size={20} />
              </a>
              <a
                href={`https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(
                  shareUrl
                )}&title=${encodeURIComponent(blogDetail.title)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-blue-700 text-white p-2 rounded-lg hover:bg-blue-800 transition-colors"
              >
                <FaLinkedin size={20} />
              </a>
            </div>
          </div>
        </motion.article>
      </section>

      {/* Recent Posts */}
      <section className="container mx-auto px-6 py-16">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
            You Might Also Like
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {recentPosts.map((post, index) => (
              <motion.article
                key={post.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
              >
                <Link to={`/blog/${post.slug}`}>
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-6">
                    <span className="bg-orange-100 text-orange-800 px-2 py-1 rounded text-xs font-medium mb-2 inline-block">
                      {post.category}
                    </span>
                    <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2 hover:text-orange-500 transition-colors">
                      {post.title}
                    </h3>
                    <p className="text-gray-600 text-sm line-clamp-2 mb-4">
                      {post.excerpt}
                    </p>
                    <div className="flex items-center justify-between text-xs text-gray-500">
                      <span>{post.read_time}</span>
                      <span>
                        {new Date(post.published_date).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                </Link>
              </motion.article>
            ))}
          </div>
        </motion.div>
      </section>
    </div>
  );
};

export default BlogDetailPage;
