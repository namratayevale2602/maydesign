import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaStar,
  FaChevronLeft,
  FaChevronRight,
  FaQuoteLeft,
} from "react-icons/fa";
import { useTestimonial } from "../../store/TestimonialStore";

const Testimonials = () => {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const {
    testimonials,
    featuredTestimonials,
    loading,
    error,
    fetchTestimonials,
    fetchFeaturedTestimonials,
    clearError,
  } = useTestimonial();

  // Fetch testimonials on component mount
  useEffect(() => {
    fetchTestimonials();
    fetchFeaturedTestimonials();
  }, [fetchTestimonials, fetchFeaturedTestimonials]);

  const nextTestimonial = () => {
    if (testimonials.length === 0) return;
    setCurrentTestimonial((prev) =>
      prev === testimonials.length - 1 ? 0 : prev + 1
    );
  };

  const prevTestimonial = () => {
    if (testimonials.length === 0) return;
    setCurrentTestimonial((prev) =>
      prev === 0 ? testimonials.length - 1 : prev - 1
    );
  };

  const goToTestimonial = (index) => {
    setCurrentTestimonial(index);
  };

  // Auto-play functionality
  useEffect(() => {
    if (!isAutoPlaying || testimonials.length === 0) return;

    const interval = setInterval(() => {
      nextTestimonial();
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoPlaying, currentTestimonial, testimonials.length]);

  const handleRefresh = () => {
    clearError();
    fetchTestimonials(true);
    fetchFeaturedTestimonials(true);
  };

  if (loading && testimonials.length === 0) {
    return (
      <section className="py-20 bg-cream-50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <div className="h-12 bg-gray-200 rounded animate-pulse mx-auto w-64 mb-4"></div>
            <div className="h-6 bg-gray-200 rounded animate-pulse mx-auto w-96"></div>
          </div>
          <div className="max-w-6xl mx-auto">
            <div className="bg-white rounded-2xl shadow-lg p-8 h-96 animate-pulse"></div>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-20 bg-cream-50">
        <div className="container mx-auto px-6 text-center">
          <div className="text-red-600 mb-4">Failed to load testimonials</div>
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

  if (testimonials.length === 0) {
    return (
      <section className="py-20 bg-cream-50">
        <div className="container mx-auto px-6 text-center">
          <p className="text-gray-600">No testimonials available</p>
        </div>
      </section>
    );
  }

  const currentTestimonialData = testimonials[currentTestimonial];

  return (
    <section className="py-20 bg-cream-50">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
            What Our <span className="text-burnt-orange">Clients Say</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Discover why clients trust MAY Designs to bring their vision to life
          </p>
        </motion.div>

        {/* Carousel Container */}
        <div
          className="relative max-w-6xl mx-auto"
          onMouseEnter={() => setIsAutoPlaying(false)}
          onMouseLeave={() => setIsAutoPlaying(true)}
        >
          {/* Main Carousel */}
          <div className="relative h-[600px] md:h-[400px] overflow-hidden rounded-2xl">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentTestimonial}
                initial={{ opacity: 0, x: 300 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -300 }}
                transition={{ duration: 0.5 }}
                className="absolute inset-0"
              >
                <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12 h-full flex flex-col justify-center">
                  {/* Quote Icon */}
                  <div className="flex justify-center mb-6">
                    <div className="w-16 h-16 bg-burnt-orange/10 rounded-full flex items-center justify-center">
                      <FaQuoteLeft className="text-2xl text-burnt-orange" />
                    </div>
                  </div>

                  {/* Rating */}
                  <div className="flex justify-center mb-6">
                    {[...Array(currentTestimonialData.rating)].map((_, i) => (
                      <FaStar key={i} className="text-yellow-400 mx-1" />
                    ))}
                  </div>

                  {/* Content */}
                  <p className="text-xl md:text-2xl text-gray-700 text-center mb-8 leading-relaxed italic">
                    "{currentTestimonialData.content}"
                  </p>

                  {/* Client Info */}
                  <div className="flex items-center justify-center">
                    <img
                      src={currentTestimonialData.image}
                      alt={currentTestimonialData.name}
                      className="w-16 h-16 rounded-full mr-6 object-cover"
                    />
                    <div className="text-left">
                      <h4 className="font-bold text-gray-800 text-lg">
                        {currentTestimonialData.name}
                      </h4>
                      <p className="text-burnt-orange font-semibold">
                        {currentTestimonialData.position}
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Navigation Arrows */}
          <button
            onClick={prevTestimonial}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-white rounded-full shadow-lg hidden md:flex items-center justify-center text-burnt-orange hover:bg-burnt-orange hover:text-white transition-all duration-300 z-10"
          >
            <FaChevronLeft />
          </button>
          <button
            onClick={nextTestimonial}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-white rounded-full shadow-lg hidden md:flex items-center justify-center text-burnt-orange hover:bg-burnt-orange hover:text-white transition-all duration-300 z-10"
          >
            <FaChevronRight />
          </button>

          {/* Indicators */}
          <div className="flex justify-center mt-8 space-x-3">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => goToTestimonial(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentTestimonial
                    ? "bg-burnt-orange w-8"
                    : "bg-gray-300 hover:bg-burnt-orange/50"
                }`}
              />
            ))}
          </div>
        </div>

        {/* Grid of featured testimonials */}
        {featuredTestimonials.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="hidden md:grid grid-cols-1 lg:grid-cols-3 gap-6 mt-16"
          >
            {featuredTestimonials.map((testimonial) => (
              <div
                key={testimonial.id}
                className="bg-white p-6 rounded-xl shadow-sm border border-cream-200 hover:shadow-md transition-all duration-300"
              >
                <div className="flex mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <FaStar key={i} className="text-yellow-400 text-sm" />
                  ))}
                </div>
                <p className="text-gray-600 mb-4 italic text-sm leading-relaxed">
                  "
                  {testimonial.short_content ||
                    testimonial.content.substring(0, 120)}
                  ..."
                </p>
                <div className="flex items-center">
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-10 h-10 rounded-full mr-3 object-cover"
                  />
                  <div>
                    <h4 className="font-semibold text-gray-800 text-sm">
                      {testimonial.name}
                    </h4>
                    <p className="text-burnt-orange text-xs font-medium">
                      {testimonial.position}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </motion.div>
        )}

        {/* Loading indicator for background refresh */}
        {loading && testimonials.length > 0 && (
          <div className="text-center mt-8">
            <div className="inline-flex items-center gap-2 text-gray-500 text-sm">
              <div className="w-4 h-4 border-2 border-orange-500 border-t-transparent rounded-full animate-spin" />
              Updating testimonials...
            </div>
          </div>
        )}
      </div>

      {/* Call to Action Section */}
      <section className="py-20 bg-burnt-orange mt-20">
        <div className="container mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Ready to Transform Your Space?
            </h2>
            <p className="text-xl text-amber-100 mb-8 max-w-3xl mx-auto">
              Let's collaborate to create something extraordinary. Schedule a
              consultation with our team today.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-white text-burnt-orange px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-50 transition-colors shadow-lg"
              >
                Get Free Consultation
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-white hover:text-burnt-orange transition-colors"
              >
                View Our Portfolio
              </motion.button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Add custom styles for the color scheme */}
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
    </section>
  );
};

export default Testimonials;
