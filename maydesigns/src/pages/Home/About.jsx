import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useAbout } from "../../store/AboutSectionStore";

const About = () => {
  const { aboutSection, loading, error, fetchAboutSection, clearError } =
    useAbout();

  useEffect(() => {
    fetchAboutSection();
  }, [fetchAboutSection]);

  const handleRefresh = () => {
    clearError();
    fetchAboutSection(true);
  };

  if (loading && !aboutSection) {
    return (
      <section id="about" className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-4">
              <div className="h-12 bg-gray-200 rounded animate-pulse w-3/4"></div>
              <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
              <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
              <div className="h-4 bg-gray-200 rounded animate-pulse w-2/3"></div>
            </div>
            <div className="relative">
              <div className="h-96 bg-gray-200 rounded-2xl animate-pulse"></div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section id="about" className="py-20 bg-white">
        <div className="container mx-auto px-6 text-center">
          <div className="text-red-600 mb-4">Failed to load about section</div>
          <button
            onClick={handleRefresh}
            className="px-6 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors"
          >
            Try Again
          </button>
        </div>
      </section>
    );
  }

  if (!aboutSection) {
    return (
      <section id="about" className="py-20 bg-white">
        <div className="container mx-auto px-6 text-center">
          <p className="text-gray-600">About section not available</p>
        </div>
      </section>
    );
  }

  return (
    <section id="about" className="py-20 bg-white">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
              {aboutSection.title.split(aboutSection.highlighted_text)[0]}
              <span className="text-burnt-orange">
                {aboutSection.highlighted_text}
              </span>
              {aboutSection.title.split(aboutSection.highlighted_text)[1]}
            </h2>
            <p className="text-lg text-gray-600 mb-6 leading-relaxed">
              {aboutSection.description_1}
            </p>
            <p className="text-lg text-gray-600 mb-6 leading-relaxed">
              {aboutSection.description_2}
            </p>
            <p className="text-lg text-gray-600 mb-8 leading-relaxed">
              {aboutSection.description_3}
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link to={aboutSection.primary_button_link}>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-burnt-orange text-white px-8 py-4 rounded-lg font-semibold hover:bg-burnt-orange/90 transition-colors shadow-sm"
                >
                  {aboutSection.primary_button_text}
                </motion.button>
              </Link>
              {aboutSection.secondary_button_link ? (
                <Link to={aboutSection.secondary_button_link}>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="border-2 border-burnt-orange text-burnt-orange px-8 py-4 rounded-lg font-semibold hover:bg-burnt-orange/5 transition-colors"
                  >
                    {aboutSection.secondary_button_text}
                  </motion.button>
                </Link>
              ) : (
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="border-2 border-burnt-orange text-burnt-orange px-8 py-4 rounded-lg font-semibold hover:bg-burnt-orange/5 transition-colors"
                >
                  {aboutSection.secondary_button_text}
                </motion.button>
              )}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <img
              src={
                aboutSection.image ||
                "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
              }
              alt="MAY Designs Team"
              className="rounded-2xl shadow-lg w-full h-96 object-cover"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="absolute -bottom-6 -left-6 bg-burnt-orange text-white p-6 rounded-xl shadow-lg"
            >
              <h3 className="text-2xl font-bold mb-1">
                {aboutSection.experience_years}
              </h3>
              <p className="text-orange-100 font-medium">
                {aboutSection.experience_label}
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="absolute -top-6 -right-6 bg-white p-4 rounded-xl shadow-lg border border-cream-200"
            >
              <div className="text-center">
                <div className="text-2xl font-bold text-burnt-orange mb-1">
                  {aboutSection.projects_count}
                </div>
                <div className="text-sm text-gray-600 font-medium">
                  {aboutSection.projects_label}
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
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
        .border-cream-200 {
          border-color: #fae8d8;
        }
      `}</style>
    </section>
  );
};

export default About;
