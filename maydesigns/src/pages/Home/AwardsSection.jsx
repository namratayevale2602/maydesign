import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaTrophy, FaCalendarAlt, FaExternalLinkAlt } from "react-icons/fa";

const AwardsSection = () => {
  const [selectedYear, setSelectedYear] = useState("all");

  const awardsData = [
    {
      id: 1,
      title: "International Architecture Award 2024",
      organization: "World Architecture Festival",
      year: 2024,
      category: "Residential Design",
      description:
        "Recognized for the innovative 'Sky Garden Residence' project that redefines urban living with sustainable design principles.",
      image:
        "https://images.unsplash.com/photo-1613490493576-7fde63acd811?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
      featured: true,
      link: "#",
    },
    {
      id: 2,
      title: "Best Commercial Building Design 2023",
      organization: "Architecture & Design Awards",
      year: 2023,
      category: "Commercial Architecture",
      description:
        "Awarded for the revolutionary 'Urban Oasis Office Complex' that blends workspace functionality with natural elements.",
      image:
        "https://images.unsplash.com/photo-1497366754035-f200968a6e72?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
      featured: false,
      link: "#",
    },
    {
      id: 3,
      title: "Sustainable Design Excellence Award",
      organization: "Green Building Council",
      year: 2023,
      category: "Sustainability",
      description:
        "Honored for outstanding commitment to eco-friendly architecture and innovative sustainable practices.",
      image:
        "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
      featured: false,
      link: "#",
    },
    {
      id: 4,
      title: "Innovation in Urban Planning 2022",
      organization: "Urban Design Institute",
      year: 2022,
      category: "Urban Design",
      description:
        "Recognized for transformative urban planning projects that enhance community living and connectivity.",
      image:
        "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
      featured: false,
      link: "#",
    },
    {
      id: 5,
      title: "Residential Architecture Excellence",
      organization: "National Design Awards",
      year: 2022,
      category: "Residential Design",
      description:
        "Celebrating exceptional residential designs that combine aesthetics with functional living spaces.",
      image:
        "https://images.unsplash.com/photo-1613977257363-707ba9348227?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
      featured: false,
      link: "#",
    },
    {
      id: 6,
      title: "Future Architecture Prize 2021",
      organization: "European Architecture Foundation",
      year: 2021,
      category: "Innovation",
      description:
        "Awarded for visionary approach to future-ready architecture and innovative design methodologies.",
      image:
        "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
      featured: false,
      link: "#",
    },
  ];

  const years = ["all", 2024, 2023, 2022, 2021];
  const filteredAwards =
    selectedYear === "all"
      ? awardsData
      : awardsData.filter((award) => award.year === selectedYear);

  return (
    <section id="awards" className="py-20 bg-white">
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
            Awards & Recognition
          </h2>
          <div className="w-24 h-1 bg-burnt-orange mx-auto mb-8"></div>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Celebrating excellence in architectural innovation and design
            excellence
          </p>
        </motion.div>

        {/* Year Filter */}
        <div className="flex justify-center mb-12">
          <div className="flex flex-wrap justify-center gap-2">
            {years.map((year) => (
              <button
                key={year}
                onClick={() => setSelectedYear(year)}
                className={`px-6 py-3 rounded-full font-medium text-sm transition-all duration-300 border ${
                  selectedYear === year
                    ? "bg-burnt-orange text-white border-burnt-orange"
                    : "text-gray-600 border-gray-300 hover:border-burnt-orange hover:text-burnt-orange"
                }`}
              >
                {year === "all" ? "All Years" : year}
              </button>
            ))}
          </div>
        </div>

        {/* Awards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence>
            {filteredAwards.map((award, index) => (
              <motion.div
                key={award.id}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -50 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="group cursor-pointer"
              >
                <div className="bg-white rounded-none shadow-sm border border-gray-200 hover:shadow-lg transition-all duration-500 h-full flex flex-col">
                  {/* Image Container */}
                  <div className="relative overflow-hidden bg-gray-100">
                    <div className="aspect-w-16 aspect-h-12 relative h-64">
                      <img
                        src={award.image}
                        alt={award.title}
                        className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
                      />
                      <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
                    </div>

                    {/* Award Badge */}
                    <div className="absolute top-4 left-4">
                      <div className="bg-white px-3 py-2 rounded-sm shadow-sm">
                        <FaTrophy className="text-burnt-orange text-lg" />
                      </div>
                    </div>

                    {/* Year Badge */}
                    <div className="absolute top-4 right-4">
                      <div className="bg-burnt-orange text-white px-3 py-1 rounded-sm text-sm font-medium">
                        {award.year}
                      </div>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6 flex-1 flex flex-col">
                    <div className="mb-3">
                      <span className="text-xs font-semibold text-burnt-orange uppercase tracking-wide">
                        {award.category}
                      </span>
                    </div>

                    <h3 className="text-xl font-light text-gray-900 mb-3 leading-tight group-hover:text-burnt-orange transition-colors duration-300">
                      {award.title}
                    </h3>

                    <p className="text-gray-600 text-sm mb-4 font-medium">
                      {award.organization}
                    </p>

                    <p className="text-gray-500 text-sm leading-relaxed mb-6 flex-1">
                      {award.description}
                    </p>

                    <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                      <span className="text-xs text-gray-500 flex items-center">
                        <FaCalendarAlt className="mr-1" />
                        {award.year}
                      </span>
                      <button className="text-burnt-orange text-sm font-medium flex items-center group/btn hover:text-burnt-orange/80 transition-colors">
                        View Details
                        <FaExternalLinkAlt className="ml-2 text-xs group-hover/btn:translate-x-1 transition-transform duration-300" />
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Empty State */}
        {filteredAwards.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <p className="text-gray-500 text-lg">
              No awards found for the selected year.
            </p>
          </motion.div>
        )}
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
      `}</style>
    </section>
  );
};

export default AwardsSection;
