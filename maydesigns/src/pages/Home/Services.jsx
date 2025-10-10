import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { FaArrowRight, FaBuilding, FaHome, FaTree } from "react-icons/fa";

const Services = () => {
  const [activeService, setActiveService] = useState(0);
  const [isHovering, setIsHovering] = useState(false);

  const servicesData = [
    {
      id: 1,
      title: "Architecture",
      description:
        "Innovative architectural designs that blend form and function",
      icon: FaBuilding,
      path: "/projects/architecture",
      image:
        "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80",
      count: "12 Projects",
      features: [
        "Residential Architecture",
        "Commercial Buildings",
        "Structural Engineering",
        "Sustainable Design",
        "Project Management",
      ],
    },
    {
      id: 2,
      title: "Interior Design",
      description: "Beautiful and functional interior spaces for modern living",
      icon: FaHome,
      path: "/projects/interior",
      image:
        "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80",
      count: "18 Projects",
      features: [
        "Residential Interiors",
        "Commercial Spaces",
        "Space Planning",
        "Custom Furniture",
        "Lighting Design",
      ],
    },
    {
      id: 3,
      title: "Landscape Design",
      description: "Sustainable outdoor spaces that harmonize with nature",
      icon: FaTree,
      path: "/projects/landscape",
      image:
        "https://images.unsplash.com/photo-1560717789-0ac7c58ac90a?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80",
      count: "8 Projects",
      features: [
        "Garden Design",
        "Outdoor Living Spaces",
        "Sustainable Landscaping",
        "Irrigation Systems",
        "Hardscape Design",
      ],
    },
  ];

  return (
    <div className="min-h-screen  relative overflow-hidden">
      {/* Background Image Container with Light Overlay */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeService}
            initial={{ opacity: 0 }}
            animate={{ opacity: isHovering ? 0.15 : 0.05 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
            className="w-full h-full flex items-center justify-center"
          >
            <img
              src={servicesData[activeService].image}
              alt={servicesData[activeService].title}
              className="w-full h-full object-cover"
            />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Light Overlay */}
      <div className="absolute inset-0 bg-white opacity-0 z-0"></div>

      {/* Content */}
      <div className="relative z-10 pt-20">
        {/* Hero Section */}
        <section className="py-16 px-6">
          <div className="container mx-auto max-w-6xl">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center"
            >
              <h1 className="text-5xl md:text-7xl font-bold text-gray-800 mb-6">
                Our <span className="text-burnt-orange">Services</span>
              </h1>
              <p className="text-xl md:text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
                Explore our comprehensive design services that transform your
                vision into reality. From architectural marvels to intimate
                interior spaces, we craft experiences that inspire.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Services Grid */}
        <section className="py-12 px-6">
          <div className="container mx-auto max-w-6xl">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {servicesData.map((service, index) => {
                const IconComponent = service.icon;
                return (
                  <motion.div
                    key={service.id}
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.2 }}
                    onMouseEnter={() => {
                      setActiveService(index);
                      setIsHovering(true);
                    }}
                    onMouseLeave={() => setIsHovering(false)}
                    className="group cursor-pointer h-full"
                  >
                    <Link to={service.path}>
                      <div className="rounded-2xl overflow-hidden bg-white border border-cream-200 shadow-sm hover:shadow-lg transition-all duration-300 h-full group-hover:border-burnt-orange/30">
                        <div className="relative h-48 overflow-hidden">
                          <img
                            src={service.image}
                            alt={service.title}
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                          />
                          <div className="absolute inset-0 bg-black/10 group-hover:bg-black/5 transition-colors duration-300" />

                          {/* Icon Overlay */}
                          <div className="absolute top-4 right-4 w-12 h-12 rounded-full bg-white/95 backdrop-blur-sm flex items-center justify-center shadow-sm">
                            <IconComponent className="text-xl text-burnt-orange" />
                          </div>
                        </div>

                        {/* Content */}
                        <div className="p-6">
                          <h3 className="text-2xl font-bold text-gray-800 mb-2">
                            {service.title}
                          </h3>
                          <p className="text-gray-600 mb-4 leading-relaxed">
                            {service.description}
                          </p>

                          {/* Features List */}
                          <ul className="space-y-2 mb-4">
                            {service.features
                              .slice(0, 3)
                              .map((feature, featureIndex) => (
                                <li
                                  key={featureIndex}
                                  className="flex items-center text-gray-600 text-sm"
                                >
                                  <div className="w-1.5 h-1.5 bg-burnt-orange rounded-full mr-3"></div>
                                  {feature}
                                </li>
                              ))}
                          </ul>

                          <div className="flex items-center justify-between mt-4">
                            <span className="text-sm font-semibold px-3 py-1 rounded-full bg-burnt-orange/10 text-burnt-orange">
                              {service.count}
                            </span>
                            <motion.div
                              whileHover={{ x: 5 }}
                              className="flex items-center font-semibold text-burnt-orange"
                            >
                              Explore
                              <FaArrowRight className="ml-2" />
                            </motion.div>
                          </div>
                        </div>
                      </div>

                      {/* Subtle Glow Effect */}
                      <div className="absolute inset-0 rounded-2xl bg-burnt-orange/5 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10" />
                    </Link>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>
        <section className="py-20 px-6">
          <div className="container mx-auto max-w-4xl text-center">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="bg-white rounded-2xl p-12 border border-cream-200 shadow-sm"
            >
              <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
                Ready to Start Your Project?
              </h2>
              <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
                Let's discuss how we can bring your vision to life with our
                expert design services.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-4 rounded-lg font-semibold text-lg text-white bg-burnt-orange hover:bg-burnt-orange/90 transition-colors shadow-sm"
                >
                  Start Your Project
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-4 rounded-lg font-semibold text-lg border-2 border-burnt-orange text-burnt-orange bg-white hover:bg-burnt-orange/5 transition-colors"
                >
                  View Our Process
                </motion.button>
              </div>
            </motion.div>
          </div>
        </section>
        {/* Process Section */}
        <section className="py-20 px-6 bg-cream-100/50">
          <div className="container mx-auto max-w-6xl">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
                Our <span className="text-burnt-orange">Process</span>
              </h2>
              <p className="text-xl text-gray-600">
                A seamless journey from concept to completion
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              {[
                {
                  step: "01",
                  title: "Consultation",
                  desc: "Understanding your vision and requirements",
                },
                {
                  step: "02",
                  title: "Concept Design",
                  desc: "Creating initial concepts and mood boards",
                },
                {
                  step: "03",
                  title: "Development",
                  desc: "Detailed planning and technical drawings",
                },
                {
                  step: "04",
                  title: "Execution",
                  desc: "Quality implementation and project management",
                },
              ].map((step, index) => (
                <motion.div
                  key={step.step}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="text-center"
                >
                  <div className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold bg-burnt-orange text-white shadow-sm">
                    {step.step}
                  </div>
                  <h3 className="text-xl font-bold text-gray-800 mb-2">
                    {step.title}
                  </h3>
                  <p className="text-gray-600">{step.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
      </div>

      {/* Add custom styles for the color scheme */}
      <style jsx>{`
        .bg-cream-50 {
          background-color: #fefaf6;
        }
        .bg-cream-100 {
          background-color: #fdf6f0;
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
        .border-burnt-orange {
          border-color: #be5103;
        }
      `}</style>
    </div>
  );
};

export default Services;
