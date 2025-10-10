import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaStar,
  FaChevronLeft,
  FaChevronRight,
  FaQuoteLeft,
} from "react-icons/fa";

const Testimonials = () => {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const testimonialsData = [
    {
      id: 1,
      name: "Sarah Johnson",
      position: "Homeowner",
      content:
        "MAY Designs transformed our outdated home into a modern sanctuary. Their attention to detail and creative vision exceeded all our expectations. The entire process was seamless and professional.",
      rating: 5,
      image:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80",
    },
    {
      id: 2,
      name: "Michael Chen",
      position: "Business Owner",
      content:
        "The commercial space design completely revitalized our office environment. The team understood our brand identity and created a space that boosts productivity and impresses clients daily.",
      rating: 5,
      image:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80",
    },
    {
      id: 3,
      name: "Emily Rodriguez",
      position: "Restaurant Owner",
      content:
        "From concept to completion, MAY Designs delivered exceptional results. Our restaurant's ambiance has received countless compliments, and the functional layout has improved our service efficiency.",
      rating: 5,
      image:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80",
    },
    {
      id: 4,
      name: "David Thompson",
      position: "Real Estate Developer",
      content:
        "Working with MAY Designs on multiple projects has been outstanding. Their architectural solutions are both innovative and practical, adding significant value to our properties.",
      rating: 5,
      image:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80",
    },
    {
      id: 5,
      name: "Lisa Wang",
      position: "Interior Design Client",
      content:
        "The interior design service was phenomenal. They captured our style perfectly while introducing creative elements we never would have considered. Our home now feels truly personalized.",
      rating: 5,
      image:
        "https://images.unsplash.com/photo-1544725176-7c40e5a71c5e?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80",
    },
  ];

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) =>
      prev === testimonialsData.length - 1 ? 0 : prev + 1
    );
  };

  const prevTestimonial = () => {
    setCurrentTestimonial((prev) =>
      prev === 0 ? testimonialsData.length - 1 : prev - 1
    );
  };

  const goToTestimonial = (index) => {
    setCurrentTestimonial(index);
  };

  // Auto-play functionality
  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      nextTestimonial();
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoPlaying, currentTestimonial]);

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
                    {[
                      ...Array(testimonialsData[currentTestimonial].rating),
                    ].map((_, i) => (
                      <FaStar key={i} className="text-yellow-400 mx-1" />
                    ))}
                  </div>

                  {/* Content */}
                  <p className="text-xl md:text-2xl text-gray-700 text-center mb-8 leading-relaxed italic">
                    "{testimonialsData[currentTestimonial].content}"
                  </p>

                  {/* Client Info */}
                  <div className="flex items-center justify-center">
                    <img
                      src={testimonialsData[currentTestimonial].image}
                      alt={testimonialsData[currentTestimonial].name}
                      className="w-16 h-16 rounded-full mr-6  object-contain"
                    />
                    <div className="text-left">
                      <h4 className="font-bold text-gray-800 text-lg">
                        {testimonialsData[currentTestimonial].name}
                      </h4>
                      <p className="text-burnt-orange font-semibold">
                        {testimonialsData[currentTestimonial].position}
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
            className="absolute  left-4 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-white rounded-full shadow-lg hidden md:flex items-center justify-center text-burnt-orange hover:bg-burnt-orange hover:text-white transition-all duration-300 z-10"
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
            {testimonialsData.map((_, index) => (
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

        {/* Grid of additional testimonials (hidden on mobile) */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="hidden md:grid grid-cols-1 lg:grid-cols-3 gap-6 mt-16"
        >
          {testimonialsData.slice(0, 3).map((testimonial, index) => (
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
                "{testimonial.content.substring(0, 120)}..."
              </p>
              <div className="flex items-center">
                <img
                  src={testimonial.image}
                  alt={testimonial.name}
                  className="w-10 h-10 rounded-full mr-3"
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
      </div>

      {/* Call to Action Section */}
      <section className="py-20 bg-gradient-to-r from-burnt-orange to-amber-600 mt-20">
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
