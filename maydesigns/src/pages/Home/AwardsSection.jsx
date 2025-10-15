// components/AwardsSection.jsx
import React, { useState, useEffect } from "react";
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
import { useAwardData } from "../../store/useAwardStore";

const AwardsSection = () => {
  const [selectedYear, setSelectedYear] = useState("all");
  const [selectedAward, setSelectedAward] = useState(null);
  const [activeTab, setActiveTab] = useState("details");

  // Use the award store
  const {
    awards,
    featuredAwards,
    years,
    loading,
    error,
    fetchAwards,
    fetchAwardYears,
    isEmpty,
  } = useAwardData();

  // Fetch data on component mount
  useEffect(() => {
    const loadData = async () => {
      try {
        await Promise.all([fetchAwards(), fetchAwardYears()]);
      } catch (err) {
        console.error("Failed to load award data:", err);
      }
    };

    loadData();
  }, [fetchAwards, fetchAwardYears]);

  // Fetch awards when year filter changes
  useEffect(() => {
    const loadFilteredAwards = async () => {
      try {
        await fetchAwards(true, selectedYear);
      } catch (err) {
        console.error("Failed to load filtered awards:", err);
      }
    };

    loadFilteredAwards();
  }, [selectedYear, fetchAwards]);

  const openModal = (award) => {
    setSelectedAward(award);
    setActiveTab("details");
    document.body.style.overflow = "hidden";
  };

  const closeModal = () => {
    setSelectedAward(null);
    document.body.style.overflow = "auto";
  };

  // Prepare years for filter including "all"
  const availableYears = ["all", ...years].sort((a, b) => {
    if (a === "all") return -1;
    if (b === "all") return 1;
    return b - a;
  });

  // Show loading state
  if (loading && isEmpty) {
    return (
      <section id="awards" className="py-20 bg-white">
        <div className="container mx-auto px-6 text-center">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-300 rounded w-1/4 mx-auto mb-4"></div>
            <div className="h-4 bg-gray-300 rounded w-1/2 mx-auto mb-8"></div>

            {/* Year Filter Skeleton */}
            <div className="flex justify-center mb-12">
              <div className="flex gap-2">
                {[...Array(5)].map((_, i) => (
                  <div
                    key={i}
                    className="h-10 bg-gray-300 rounded-full w-20"
                  ></div>
                ))}
              </div>
            </div>

            {/* Awards Grid Skeleton */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="bg-white rounded-none shadow-sm p-6">
                  <div className="h-48 bg-gray-300 rounded mb-4"></div>
                  <div className="h-4 bg-gray-300 rounded mb-2"></div>
                  <div className="h-4 bg-gray-300 rounded w-3/4 mb-2"></div>
                  <div className="h-4 bg-gray-300 rounded w-1/2"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    );
  }

  // Show error state
  if (error && isEmpty) {
    return (
      <section id="awards" className="py-20 bg-white">
        <div className="container mx-auto px-6 text-center">
          <div className="text-red-600 mb-4">Error loading awards: {error}</div>
          <button
            onClick={() => fetchAwards(true)}
            className="bg-burnt-orange text-white px-6 py-2 rounded hover:bg-burnt-orange/80 transition-colors"
          >
            Retry
          </button>
        </div>
      </section>
    );
  }

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
            {availableYears.map((year) => (
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
            {awards.map((award, index) => (
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
        {isEmpty && !loading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <p className="text-gray-500 text-lg">
              No awards found{" "}
              {selectedYear !== "all" ? `for ${selectedYear}` : ""}.
            </p>
          </motion.div>
        )}
      </div>

      {/* Award Details Modal */}
      <AnimatePresence>
        {selectedAward && (
          <AwardModal
            selectedAward={selectedAward}
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            closeModal={closeModal}
          />
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

// Separate modal component
const AwardModal = ({ selectedAward, activeTab, setActiveTab, closeModal }) => {
  return (
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
                    {selectedAward.details?.fullDescription}
                  </p>
                </div>
                {selectedAward.details?.projectTeam && (
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">
                      Project Team
                    </h3>
                    <ul className="text-gray-600 space-y-1">
                      {selectedAward.details.projectTeam.map(
                        (member, index) => (
                          <li key={index}>• {member.member}</li>
                        )
                      )}
                    </ul>
                  </div>
                )}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">
                      Location
                    </h3>
                    <p className="text-gray-600">
                      {selectedAward.details?.location}
                    </p>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">
                      Completion Date
                    </h3>
                    <p className="text-gray-600">
                      {selectedAward.details?.completionDate}
                    </p>
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">
                    Award Significance
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {selectedAward.details?.awardSignificance}
                  </p>
                </div>
              </div>
            )}

            {activeTab === "photos" && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {selectedAward.photos?.map((photo, index) => (
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

            {activeTab === "video" && selectedAward.video && (
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
  );
};

export default AwardsSection;
