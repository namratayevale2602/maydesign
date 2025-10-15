// components/PressSection.jsx
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaNewspaper,
  FaExternalLinkAlt,
  FaCalendarAlt,
  FaTimes,
  FaShare,
  FaGlobe,
  FaQuoteLeft,
} from "react-icons/fa";
import { usePressData } from "../../store/usePressStore";

const PressSection = () => {
  const [selectedPress, setSelectedPress] = useState(null);
  const [activeTab, setActiveTab] = useState("article");

  // Use the press store
  const {
    press,
    featuredPress,
    loading,
    error,
    fetchPress,
    fetchFeaturedPress,
    isEmpty,
  } = usePressData();

  // Fetch data on component mount
  useEffect(() => {
    const loadData = async () => {
      try {
        await fetchPress();
      } catch (err) {
        console.error("Failed to load press data:", err);
      }
    };

    loadData();
  }, [fetchPress]);

  const openModal = (pressItem) => {
    setSelectedPress(pressItem);
    setActiveTab("article");
    document.body.style.overflow = "hidden";
  };

  const closeModal = () => {
    setSelectedPress(null);
    document.body.style.overflow = "auto";
  };

  // Helper function to get featured press items
  const getFeaturedPress = () => {
    return press.filter((item) => item.featured === true);
  };

  // Helper function to get regular press items
  const getRegularPress = () => {
    return press.filter((item) => !item.featured);
  };

  // Show loading state
  if (loading && isEmpty) {
    return (
      <section id="press" className="py-20 bg-gray-50">
        <div className="container mx-auto px-6 text-center">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-300 rounded w-1/4 mx-auto mb-4"></div>
            <div className="h-4 bg-gray-300 rounded w-1/2 mx-auto mb-8"></div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="bg-white rounded-none shadow-sm p-6">
                  <div className="h-48 bg-gray-300 rounded mb-4"></div>
                  <div className="h-4 bg-gray-300 rounded mb-2"></div>
                  <div className="h-4 bg-gray-300 rounded w-3/4"></div>
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
      <section id="press" className="py-20 bg-gray-50">
        <div className="container mx-auto px-6 text-center">
          <div className="text-red-600 mb-4">
            Error loading press data: {error}
          </div>
          <button
            onClick={() => fetchPress(true)}
            className="bg-burnt-orange text-white px-6 py-2 rounded hover:bg-burnt-orange/80 transition-colors"
          >
            Retry
          </button>
        </div>
      </section>
    );
  }

  const featuredPressItems = getFeaturedPress();
  const regularPressItems = getRegularPress();

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
          {featuredPressItems.map((item) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="lg:col-span-2 group cursor-pointer"
            >
              <div
                className="bg-white rounded-none shadow-sm border border-gray-200 hover:shadow-lg transition-all duration-500 overflow-hidden"
                onClick={() => openModal(item)}
              >
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
              </div>
            </motion.div>
          ))}

          {/* Regular Press Items */}
          {regularPressItems.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group cursor-pointer"
              onClick={() => openModal(item)}
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
        </div>

        {/* Show empty state */}
        {isEmpty && !loading && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No press articles found.</p>
          </div>
        )}

        {/* Press Details Modal */}
        <AnimatePresence>
          {selectedPress && (
            <PressModal
              selectedPress={selectedPress}
              activeTab={activeTab}
              setActiveTab={setActiveTab}
              closeModal={closeModal}
            />
          )}
        </AnimatePresence>
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

// Separate modal component for better readability
const PressModal = ({ selectedPress, activeTab, setActiveTab, closeModal }) => {
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
        className="bg-white rounded-lg max-w-6xl w-full max-h-[90vh] overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="relative">
          <img
            src={selectedPress.image}
            alt={selectedPress.title}
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
              {selectedPress.category}
            </div>
          </div>
        </div>

        {/* Modal Content */}
        <div className="p-8">
          <div className="mb-6">
            <span className="text-xs font-semibold text-burnt-orange uppercase tracking-wide">
              {selectedPress.publication}
            </span>
            <h2 className="text-3xl font-light text-gray-900 mt-2 mb-3">
              {selectedPress.title}
            </h2>
            <div className="flex items-center text-gray-500 text-sm">
              <FaCalendarAlt className="mr-2" />
              <span>{selectedPress.date}</span>
            </div>
          </div>

          {/* Tabs */}
          <div className="border-b border-gray-200 mb-6">
            <div className="flex space-x-8">
              {[
                {
                  id: "article",
                  label: "Full Article",
                  icon: FaNewspaper,
                },
                {
                  id: "publication",
                  label: "Publication",
                  icon: FaGlobe,
                },
                {
                  id: "quotes",
                  label: "Key Quotes",
                  icon: FaQuoteLeft,
                },
                { id: "gallery", label: "Gallery", icon: FaShare },
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
            {activeTab === "article" && (
              <div className="space-y-6">
                <div
                  className="prose prose-lg max-w-none"
                  dangerouslySetInnerHTML={{
                    __html: selectedPress.details?.fullArticle || "",
                  }}
                />
                {selectedPress.details?.projectTeam && (
                  <div className="border-t pt-6">
                    <h4 className="font-semibold text-gray-900 mb-3">
                      Project Team
                    </h4>
                    <ul className="text-gray-600 space-y-2">
                      {selectedPress.details.projectTeam.map(
                        (member, index) => (
                          <li key={index}>• {member.member}</li>
                        )
                      )}
                    </ul>
                  </div>
                )}
              </div>
            )}

            {activeTab === "publication" && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">
                      Publication Details
                    </h4>
                    <div className="space-y-2 text-gray-600">
                      <p>
                        <strong>Website:</strong>{" "}
                        <a
                          href={
                            selectedPress.details?.publicationDetails?.website
                          }
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-burnt-orange hover:underline"
                        >
                          {selectedPress.details?.publicationDetails?.website}
                        </a>
                      </p>
                      <p>
                        <strong>Circulation:</strong>{" "}
                        {selectedPress.details?.publicationDetails?.circulation}
                      </p>
                      <p>
                        <strong>Primary Audience:</strong>{" "}
                        {selectedPress.details?.publicationDetails?.audience}
                      </p>
                      <p>
                        <strong>Founded:</strong>{" "}
                        {selectedPress.details?.publicationDetails?.founded}
                      </p>
                    </div>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">
                      About the Publication
                    </h4>
                    <p className="text-gray-600 leading-relaxed">
                      {selectedPress.publication} is a leading voice in the
                      architecture and design community, known for its critical
                      analysis and coverage of innovative projects worldwide.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "quotes" && (
              <div className="space-y-4">
                <h4 className="font-semibold text-gray-900 mb-4">
                  Notable Quotes from the Article
                </h4>
                {selectedPress.details?.keyQuotes?.map((quoteObj, index) => (
                  <div
                    key={index}
                    className="bg-gray-50 p-4 rounded-lg border-l-4 border-burnt-orange"
                  >
                    <FaQuoteLeft className="text-burnt-orange mb-2" />
                    <p className="text-gray-700 italic">"{quoteObj.quote}"</p>
                  </div>
                ))}
              </div>
            )}

            {activeTab === "gallery" && (
              <div className="space-y-6">
                {selectedPress.details?.additionalImages && (
                  <>
                    <h4 className="font-semibold text-gray-900 mb-4">
                      Additional Images
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {selectedPress.details.additionalImages.map(
                        (image, index) => (
                          <div key={index} className="group cursor-pointer">
                            <img
                              src={image}
                              alt={`${selectedPress.title} - Image ${
                                index + 1
                              }`}
                              className="w-full h-48 object-cover rounded-lg group-hover:opacity-90 transition-opacity"
                            />
                          </div>
                        )
                      )}
                    </div>
                  </>
                )}

                {selectedPress.details?.videoInterview && (
                  <div className="mt-6">
                    <h4 className="font-semibold text-gray-900 mb-4">
                      Video Interview
                    </h4>
                    <div className="aspect-w-16 aspect-h-9">
                      <iframe
                        src={selectedPress.details.videoInterview}
                        className="w-full h-64 rounded-lg"
                        frameBorder="0"
                        allow="autoplay; fullscreen; picture-in-picture"
                        allowFullScreen
                      ></iframe>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default PressSection;
