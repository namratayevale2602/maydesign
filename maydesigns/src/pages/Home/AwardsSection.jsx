import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaTrophy,
  FaCalendarAlt,
  FaExternalLinkAlt,
  FaTimes,
  FaPlay,
  FaImages,
  FaVideo,
} from "react-icons/fa";

const AwardsSection = () => {
  const [selectedYear, setSelectedYear] = useState("all");
  const [selectedAward, setSelectedAward] = useState(null);
  const [activeTab, setActiveTab] = useState("details");

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
      details: {
        fullDescription:
          "The Sky Garden Residence represents a paradigm shift in urban residential design. This award-winning project integrates vertical gardens, passive cooling systems, and community spaces within a high-density urban context. The design addresses climate challenges while creating beautiful, functional living environments that promote wellbeing and social interaction.",
        projectTeam: [
          "Lead Architect: Maria Rodriguez",
          "Project Manager: James Chen",
          "Landscape Designer: Sarah Johnson",
        ],
        location: "Singapore",
        completionDate: "March 2024",
        awardSignificance:
          "This prestigious international award recognizes projects that demonstrate exceptional innovation in sustainable urban living and community-focused design.",
      },
      photos: [
        "https://images.unsplash.com/photo-1613490493576-7fde63acd811?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1513584684374-8bab748fbf90?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1497366754035-f200968a6e72?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      ],
      video: "https://player.vimeo.com/video/76979871?h=8272103f6e",
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
      details: {
        fullDescription:
          "The Urban Oasis Office Complex transforms traditional workspace design by integrating biophilic principles throughout the building. The complex features indoor gardens, natural ventilation systems, and communal spaces that encourage collaboration and wellbeing. The design has shown measurable improvements in employee satisfaction and productivity.",
        projectTeam: [
          "Lead Architect: David Kim",
          "Interior Designer: Elena Martinez",
          "Structural Engineer: Robert Brown",
        ],
        location: "San Francisco, USA",
        completionDate: "January 2023",
        awardSignificance:
          "This award celebrates commercial buildings that successfully merge aesthetic excellence with functional innovation and employee wellbeing.",
      },
      photos: [
        "https://images.unsplash.com/photo-1497366754035-f200968a6e72?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1497366216548-37526070297c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      ],
      video: "https://player.vimeo.com/video/76979871?h=8272103f6e",
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
      details: {
        fullDescription:
          "This recognition celebrates our firm's comprehensive approach to sustainable design across multiple projects. Our methodology incorporates renewable energy systems, water conservation strategies, sustainable material selection, and lifecycle analysis to minimize environmental impact while maximizing building performance and occupant comfort.",
        projectTeam: [
          "Sustainability Director: Dr. Amanda Wilson",
          "Lead Architect: Thomas Reed",
          "Environmental Consultant: GreenTech Solutions",
        ],
        location: "Multiple Projects Worldwide",
        completionDate: "Ongoing",
        awardSignificance:
          "The Sustainable Design Excellence Award honors firms that demonstrate consistent leadership and innovation in environmentally responsible architecture.",
      },
      photos: [
        "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1516937941344-00b4e0337589?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1487958449943-2429e8be8625?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      ],
      video: "https://player.vimeo.com/video/76979871?h=8272103f6e",
    },
    // ... other awards with similar structure
  ];

  const years = ["all", 2024, 2023, 2022, 2021];
  const filteredAwards =
    selectedYear === "all"
      ? awardsData
      : awardsData.filter((award) => award.year === selectedYear);

  const openModal = (award) => {
    setSelectedAward(award);
    setActiveTab("details");
    document.body.style.overflow = "hidden"; // Prevent background scrolling
  };

  const closeModal = () => {
    setSelectedAward(null);
    document.body.style.overflow = "auto"; // Re-enable scrolling
  };

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
                      <button
                        onClick={() => openModal(award)}
                        className="text-burnt-orange text-sm font-medium flex items-center group/btn hover:text-burnt-orange/80 transition-colors"
                      >
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

      {/* Award Details Modal */}
      <AnimatePresence>
        {selectedAward && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
            onClick={closeModal}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 50 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 50 }}
              transition={{ type: "spring", damping: 25 }}
              className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Header */}
              <div className="relative">
                <img
                  src={selectedAward.image}
                  alt={selectedAward.title}
                  className="w-full h-64 object-cover"
                />
                <button
                  onClick={closeModal}
                  className="absolute top-4 right-4 bg-white rounded-full p-2 hover:bg-gray-100 transition-colors"
                >
                  <FaTimes className="text-gray-600" />
                </button>
                <div className="absolute bottom-4 left-4">
                  <div className="bg-burnt-orange text-white px-3 py-1 rounded-sm text-sm font-medium">
                    {selectedAward.year}
                  </div>
                </div>
              </div>

              {/* Modal Content */}
              <div className="p-6">
                <div className="mb-4">
                  <span className="text-xs font-semibold text-burnt-orange uppercase tracking-wide">
                    {selectedAward.category}
                  </span>
                  <h2 className="text-2xl font-light text-gray-900 mt-1">
                    {selectedAward.title}
                  </h2>
                  <p className="text-gray-600 font-medium">
                    {selectedAward.organization}
                  </p>
                </div>

                {/* Tabs */}
                <div className="border-b border-gray-200 mb-6">
                  <div className="flex space-x-8">
                    {[
                      { id: "details", label: "Details", icon: FaTrophy },
                      { id: "photos", label: "Photos", icon: FaImages },
                      { id: "video", label: "Video", icon: FaVideo },
                    ].map((tab) => (
                      <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={`flex items-center py-2 px-1 border-b-2 font-medium text-sm transition-colors ${
                          activeTab === tab.id
                            ? "border-burnt-orange text-burnt-orange"
                            : "border-transparent text-gray-500 hover:text-gray-700"
                        }`}
                      >
                        <tab.icon className="mr-2" />
                        {tab.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Tab Content */}
                <div className="max-h-96 overflow-y-auto">
                  {activeTab === "details" && (
                    <div className="space-y-4">
                      <div>
                        <h3 className="font-semibold text-gray-900 mb-2">
                          Project Description
                        </h3>
                        <p className="text-gray-600 leading-relaxed">
                          {selectedAward.details.fullDescription}
                        </p>
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900 mb-2">
                          Project Team
                        </h3>
                        <ul className="text-gray-600 space-y-1">
                          {selectedAward.details.projectTeam.map(
                            (member, index) => (
                              <li key={index}>• {member}</li>
                            )
                          )}
                        </ul>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <h3 className="font-semibold text-gray-900 mb-2">
                            Location
                          </h3>
                          <p className="text-gray-600">
                            {selectedAward.details.location}
                          </p>
                        </div>
                        <div>
                          <h3 className="font-semibold text-gray-900 mb-2">
                            Completion Date
                          </h3>
                          <p className="text-gray-600">
                            {selectedAward.details.completionDate}
                          </p>
                        </div>
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900 mb-2">
                          Award Significance
                        </h3>
                        <p className="text-gray-600 leading-relaxed">
                          {selectedAward.details.awardSignificance}
                        </p>
                      </div>
                    </div>
                  )}

                  {activeTab === "photos" && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {selectedAward.photos.map((photo, index) => (
                        <div key={index} className="group cursor-pointer">
                          <img
                            src={photo}
                            alt={`${selectedAward.title} - Photo ${index + 1}`}
                            className="w-full h-48 object-cover rounded-lg group-hover:opacity-90 transition-opacity"
                          />
                        </div>
                      ))}
                    </div>
                  )}

                  {activeTab === "video" && (
                    <div className="aspect-w-16 aspect-h-9">
                      <iframe
                        src={selectedAward.video}
                        className="w-full h-80 rounded-lg"
                        frameBorder="0"
                        allow="autoplay; fullscreen; picture-in-picture"
                        allowFullScreen
                      ></iframe>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

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
