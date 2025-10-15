import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { X, ChevronLeft, ChevronRight, Award, Target } from "lucide-react";

// Timeline data
const timelineData = [
  {
    year: "2008",
    title: "Foundation",
    description:
      "MayDesigns was founded with a vision to transform architectural landscapes through innovative design.",
    image:
      "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    details: {
      achievements: [
        "Established with 5 team members",
        "First office in downtown location",
        "Secured 3 major residential projects",
      ],
      impact:
        "Laid the foundation for innovative architectural practices in the region",
    },
  },
  {
    year: "2010",
    title: "First Major Project",
    description:
      "Completed the iconic SkyView Residence, earning our first architectural award.",
    image:
      "https://images.unsplash.com/photo-1513584684374-8bab748fbf90?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    details: {
      achievements: [
        "Won 'Best Residential Design' award",
        "Featured in Architectural Digest",
        "Team expanded to 15 professionals",
      ],
      impact: "Established reputation for innovative residential designs",
    },
  },
  {
    year: "2013",
    title: "International Expansion",
    description:
      "Expanded operations to Europe and Asia, establishing global partnerships.",
    image:
      "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    details: {
      achievements: [
        "Opened offices in London and Singapore",
        "Formed partnerships with 8 international firms",
        "Completed first overseas project in Dubai",
      ],
      impact: "Became a globally recognized architecture firm",
    },
  },
  {
    year: "2016",
    title: "Sustainability Focus",
    description:
      "Launched our green architecture division, focusing on eco-friendly designs.",
    image:
      "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    details: {
      achievements: [
        "Achieved LEED Platinum certification for 5 projects",
        "Reduced carbon footprint by 40% across all projects",
        "Introduced sustainable material sourcing",
      ],
      impact: "Pioneered eco-friendly architectural practices in the industry",
    },
  },
  {
    year: "2019",
    title: "Digital Transformation",
    description:
      "Integrated advanced BIM technologies and virtual reality in our design process.",
    image:
      "https://images.unsplash.com/photo-1558655146-9f40138edfeb?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    details: {
      achievements: [
        "Implemented full BIM workflow",
        "Reduced design time by 30%",
        "Enhanced client collaboration with VR",
      ],
      impact: "Revolutionized design process with cutting-edge technology",
    },
  },
  {
    year: "2023",
    title: "Award-Winning Year",
    description:
      "Received 5 international awards for innovative architectural solutions.",
    image:
      "https://images.unsplash.com/photo-1487958449943-2429e8be8625?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    details: {
      achievements: [
        "Won International Architecture Award",
        "Featured in 12+ global publications",
        "Team grew to 50+ professionals worldwide",
      ],
      impact: "Recognized as industry leaders in innovative architecture",
    },
  },
];

const ZigzagImageTimeline = () => {
  const [selectedTimelineItem, setSelectedTimelineItem] = useState(null);

  return (
    <div className="min-h-screen bg-white py-16">
      {/* Custom Styles */}
      <style jsx>{`
        .bg-cream {
          background-color: #fefaf6;
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
      <div className="max-w-10xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-20">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-5xl font-bold text-gray-900 mb-6"
          >
            Our Journey Through Time
          </motion.h2>
          <div className="w-24 h-1 bg-burnt-orange mx-auto mb-6"></div>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl text-gray-600 max-w-3xl mx-auto"
          >
            A timeline of innovation and growth. Each milestone represents our
            commitment to pushing the boundaries of architectural excellence.
          </motion.p>
        </div>

        {/* Timeline Container */}
        <div className="relative">
          {/* Center Zigzag Line */}
          <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gray-200 hidden lg:block">
            <motion.div
              className="absolute top-0 w-full bg-burnt-orange rounded-full"
              initial={{ height: 0 }}
              whileInView={{ height: "100%" }}
              transition={{ duration: 2, ease: "easeOut" }}
            />

            {/* Connection points */}
            {timelineData.map((item, index) => (
              <motion.div
                key={index}
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                transition={{ delay: index * 0.3, type: "spring" }}
                className="absolute left-1/2 transform -translate-x-1/2 w-8 h-8 bg-white border-4 border-burnt-orange rounded-full shadow-lg flex items-center justify-center z-10 cursor-pointer"
                style={{
                  top: `${(index * 100) / (timelineData.length - 1)}%`,
                }}
                onClick={() => setSelectedTimelineItem(item)}
                onMouseEnter={() => {}}
              >
                <span className="text-xs font-bold text-burnt-orange">
                  {index + 1}
                </span>
                <motion.div
                  className="absolute inset-0 border-2 border-burnt-orange rounded-full"
                  animate={{ scale: [1, 1.5, 1] }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    delay: index * 0.5,
                  }}
                />
              </motion.div>
            ))}
          </div>

          {/* Mobile vertical line */}
          <div className="absolute left-6 w-0.5 h-full bg-burnt-orange lg:hidden">
            {timelineData.map((_, index) => (
              <motion.div
                key={index}
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                transition={{ delay: index * 0.2 }}
                className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-white border-2 border-blue-500 rounded-full shadow-md"
                style={{
                  top: `${(index / (timelineData.length - 1)) * 100}%`,
                }}
              />
            ))}
          </div>

          {/* Timeline Items */}
          <div className="space-y-20 lg:space-y-32">
            {timelineData.map((item, index) => {
              const isEven = index % 2 === 0;

              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: isEven ? -50 : 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: index * 0.2 }}
                  viewport={{ once: true }}
                  className={`relative flex flex-col lg:flex-row items-center gap-8 ${
                    isEven ? "lg:flex-row" : "lg:flex-row-reverse"
                  }`}
                >
                  {/* Left Side - Image & Year */}
                  <div className="flex-1 w-full max-w-md">
                    <div className="relative">
                      {/* Year Badge */}
                      <div
                        className={`absolute -top-4 ${
                          isEven ? "lg:-left-4" : "lg:-right-4"
                        } z-10 bg-white px-6 py-3 rounded-lg shadow-lg border border-gray-200`}
                      >
                        <span className="text-2xl font-bold text-gray-900">
                          {item.year}
                        </span>
                      </div>

                      {/* Image Container */}
                      <motion.div
                        whileHover={{ scale: 1.02 }}
                        className="relative rounded-xl overflow-hidden shadow-lg border border-gray-200 cursor-pointer"
                        onClick={() => setSelectedTimelineItem(item)}
                      >
                        <img
                          src={item.image}
                          alt={item.title}
                          className="w-full h-90 object-cover"
                        />
                      </motion.div>
                    </div>
                  </div>

                  {/* Right Side - Content */}
                  <div className="flex-1 w-full max-w-md">
                    <motion.div
                      whileHover={{ y: -2 }}
                      className="bg-white rounded-xl p-8 shadow-lg border border-gray-200 hover:shadow-xl transition-all duration-300 cursor-pointer"
                      onClick={() => setSelectedTimelineItem(item)}
                    >
                      {/* Step Number */}
                      <div className="flex items-center gap-3 mb-6">
                        <div className="w-10 h-10 bg-burnt-orange rounded-full flex items-center justify-center text-white font-bold text-sm">
                          {index + 1}
                        </div>
                      </div>

                      {/* Title */}
                      <h3 className="text-2xl font-bold text-gray-900 mb-4">
                        {item.title}
                      </h3>

                      {/* Description */}
                      <p className="text-gray-600 leading-relaxed mb-6">
                        {item.description}
                      </p>

                      {/* Learn More Button */}
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="w-full bg-burnt-orange text-white py-3 px-6 rounded-lg font-semibold hover:shadow-lg transition-all duration-300"
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedTimelineItem(item);
                        }}
                      >
                        Learn More About {item.year}
                      </motion.button>
                    </motion.div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Timeline Popup Modal */}
      <AnimatePresence>
        {selectedTimelineItem && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
            onClick={() => setSelectedTimelineItem(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 50 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 50 }}
              transition={{ type: "spring", damping: 25 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl"
            >
              {/* Header */}
              <div className="relative h-64 sm:h-80">
                <img
                  src={selectedTimelineItem.image}
                  alt={selectedTimelineItem.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                <button
                  onClick={() => setSelectedTimelineItem(null)}
                  className="absolute top-4 right-4 bg-white/20 backdrop-blur-sm rounded-full p-2 hover:bg-white/30 transition-colors"
                >
                  <X className="text-white" size={24} />
                </button>
                <div className="absolute bottom-6 left-6 text-white">
                  <div className="flex items-center mb-2">
                    <div>
                      <h2 className="text-3xl font-bold">
                        {selectedTimelineItem.title}
                      </h2>
                      <div className="text-2xl font-semibold text-blue-200">
                        {selectedTimelineItem.year}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="p-6 sm:p-8">
                <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                  {selectedTimelineItem.description}
                </p>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  {/* Achievements */}
                  <div>
                    <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
                      <Award className="text-blue-600 mr-3" size={24} />
                      Key Achievements
                    </h3>
                    <ul className="space-y-3">
                      {selectedTimelineItem.details.achievements.map(
                        (achievement, idx) => (
                          <motion.li
                            key={idx}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: idx * 0.1 }}
                            className="flex items-start bg-blue-50 rounded-lg p-4 border-l-4 border-blue-500"
                          >
                            <div className="bg-blue-500 rounded-full p-1 mr-3 mt-1 flex-shrink-0">
                              <div className="w-2 h-2 bg-white rounded-full"></div>
                            </div>
                            <span className="text-gray-700">{achievement}</span>
                          </motion.li>
                        )
                      )}
                    </ul>
                  </div>

                  {/* Impact */}
                  <div>
                    <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
                      <Target className="text-blue-600 mr-3" size={24} />
                      Impact & Legacy
                    </h3>
                    <div className="bg-blue-50 rounded-xl p-6 border-l-4 border-blue-500">
                      <p className="text-gray-700 text-lg leading-relaxed">
                        {selectedTimelineItem.details.impact}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Navigation */}
                <div className="flex justify-between items-center mt-8 pt-6 border-t border-gray-200">
                  <button
                    onClick={() => {
                      const currentIndex = timelineData.findIndex(
                        (item) => item.year === selectedTimelineItem.year
                      );
                      const prevIndex =
                        currentIndex > 0
                          ? currentIndex - 1
                          : timelineData.length - 1;
                      setSelectedTimelineItem(timelineData[prevIndex]);
                    }}
                    className="flex items-center text-blue-600 font-semibold hover:text-blue-800 transition-colors px-4 py-2 rounded-lg hover:bg-blue-50"
                  >
                    <ChevronLeft className="w-5 h-5 mr-2" />
                    Previous
                  </button>

                  <div className="text-gray-500 font-medium">
                    {timelineData.findIndex(
                      (item) => item.year === selectedTimelineItem.year
                    ) + 1}{" "}
                    of {timelineData.length}
                  </div>

                  <button
                    onClick={() => {
                      const currentIndex = timelineData.findIndex(
                        (item) => item.year === selectedTimelineItem.year
                      );
                      const nextIndex =
                        currentIndex < timelineData.length - 1
                          ? currentIndex + 1
                          : 0;
                      setSelectedTimelineItem(timelineData[nextIndex]);
                    }}
                    className="flex items-center text-blue-600 font-semibold hover:text-blue-800 transition-colors px-4 py-2 rounded-lg hover:bg-blue-50"
                  >
                    Next
                    <ChevronRight className="w-5 h-5 ml-2" />
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ZigzagImageTimeline;
