import React from "react";
import { motion } from "framer-motion";
import { FaNewspaper, FaExternalLinkAlt, FaCalendarAlt } from "react-icons/fa";

const PressSection = () => {
  const pressData = [
    {
      id: 1,
      publication: "Architectural Digest",
      title: "Redefining Modern Luxury: The MAY Designs Approach",
      date: "March 2024",
      excerpt:
        "An exclusive feature on how MAY Designs is transforming the landscape of luxury residential architecture with innovative sustainable practices.",
      image:
        "https://images.unsplash.com/photo-1589994965851-a8f479c573a9?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
      category: "Feature",
      link: "#",
      featured: true,
    },
    {
      id: 2,
      publication: "Dezeen",
      title: "Urban Regeneration Projects That Are Changing Cityscapes",
      date: "February 2024",
      excerpt:
        "MAY Designs featured among top architecture firms leading urban regeneration initiatives worldwide.",
      image:
        "https://images.unsplash.com/photo-1487958449943-2429e8be8625?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
      category: "Cover Story",
      link: "#",
      featured: false,
    },
    {
      id: 3,
      publication: "Wallpaper*",
      title: "The Future of Sustainable Architecture: 10 Innovators to Watch",
      date: "January 2024",
      excerpt:
        "Recognized as one of the top 10 architectural innovators shaping the future of sustainable design.",
      image:
        "https://images.unsplash.com/photo-1497366754035-f200968a6e72?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
      category: "Feature",
      link: "#",
      featured: false,
    },
    {
      id: 4,
      publication: "The Architectural Review",
      title: "Material Innovation in Contemporary Architecture",
      date: "December 2023",
      excerpt:
        "Deep dive into MAY Designs' pioneering use of sustainable materials in commercial projects.",
      image:
        "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
      category: "Interview",
      link: "#",
      featured: false,
    },
    {
      id: 5,
      publication: "Domus",
      title: "Cultural Architecture: Blending Tradition with Modernity",
      date: "November 2023",
      excerpt:
        "Exploring how MAY Designs integrates cultural elements into contemporary architectural expressions.",
      image:
        "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
      category: "Feature",
      link: "#",
      featured: false,
    },
    {
      id: 6,
      publication: "Frame Magazine",
      title: "Interior Architecture: Creating Emotional Spaces",
      date: "October 2023",
      excerpt:
        "Featured for innovative interior architecture that creates emotional connections with spaces.",
      image:
        "https://images.unsplash.com/photo-1613977257363-707ba9348227?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
      category: "Profile",
      link: "#",
      featured: false,
    },
  ];

  return (
    <section id="press" className="py-20 bg-gray-50">
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
            Press & Media
          </h2>
          <div className="w-24 h-1 bg-burnt-orange mx-auto mb-8"></div>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Featured in leading architecture and design publications worldwide
          </p>
        </motion.div>

        {/* Press Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Featured Press Item */}
          {pressData
            .filter((item) => item.featured)
            .map((item) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="lg:col-span-2 group cursor-pointer"
              >
                <div className="bg-white rounded-none shadow-sm border border-gray-200 hover:shadow-lg transition-all duration-500 overflow-hidden">
                  <div className="grid grid-cols-1 lg:grid-cols-2">
                    {/* Image */}
                    <div className="relative overflow-hidden bg-gray-100">
                      <div className="aspect-w-16 aspect-h-9 h-80 lg:h-full">
                        <img
                          src={item.image}
                          alt={item.title}
                          className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
                        />
                        <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
                      </div>
                      <div className="absolute top-4 left-4">
                        <div className="bg-white px-3 py-2 rounded-sm shadow-sm">
                          <FaNewspaper className="text-burnt-orange text-lg" />
                        </div>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-8 lg:p-12 flex flex-col justify-center">
                      <div className="mb-4">
                        <span className="text-xs font-semibold text-burnt-orange uppercase tracking-wide">
                          {item.category}
                        </span>
                      </div>

                      <h3 className="text-2xl lg:text-3xl font-light text-gray-900 mb-4 leading-tight group-hover:text-burnt-orange transition-colors duration-300">
                        {item.title}
                      </h3>

                      <p className="text-gray-600 text-lg mb-2 font-medium">
                        {item.publication}
                      </p>

                      <p className="text-gray-500 leading-relaxed mb-6">
                        {item.excerpt}
                      </p>

                      <div className="flex items-center justify-between pt-6 border-t border-gray-100">
                        <span className="text-sm text-gray-500 flex items-center">
                          <FaCalendarAlt className="mr-2" />
                          {item.date}
                        </span>
                        <button className="text-burnt-orange font-medium flex items-center group/btn hover:text-burnt-orange/80 transition-colors">
                          Read Article
                          <FaExternalLinkAlt className="ml-2 text-sm group-hover/btn:translate-x-1 transition-transform duration-300" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}

          {/* Regular Press Items */}
          {pressData
            .filter((item) => !item.featured)
            .map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="group cursor-pointer"
              >
                <div className="bg-white rounded-none shadow-sm border border-gray-200 hover:shadow-lg transition-all duration-500 h-full flex flex-col">
                  {/* Image */}
                  <div className="relative overflow-hidden bg-gray-100">
                    <div className="aspect-w-16 aspect-h-12 h-64">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
                      />
                      <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6 flex-1 flex flex-col">
                    <div className="mb-3">
                      <span className="text-xs font-semibold text-burnt-orange uppercase tracking-wide">
                        {item.category}
                      </span>
                    </div>

                    <h3 className="text-xl font-light text-gray-900 mb-3 leading-tight group-hover:text-burnt-orange transition-colors duration-300">
                      {item.title}
                    </h3>

                    <p className="text-gray-600 text-sm mb-2 font-medium">
                      {item.publication}
                    </p>

                    <p className="text-gray-500 text-sm leading-relaxed mb-4 flex-1">
                      {item.excerpt}
                    </p>

                    <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                      <span className="text-xs text-gray-500 flex items-center">
                        <FaCalendarAlt className="mr-1" />
                        {item.date}
                      </span>
                      <button className="text-burnt-orange text-sm font-medium flex items-center group/btn hover:text-burnt-orange/80 transition-colors">
                        Read More
                        <FaExternalLinkAlt className="ml-2 text-xs group-hover/btn:translate-x-1 transition-transform duration-300" />
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
        </div>
      </div>

      <style jsx>{`
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

export default PressSection;
