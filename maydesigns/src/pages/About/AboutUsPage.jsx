// AboutUsPage.jsx
import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { fadeIn, staggerContainer, zoomIn } from "../../../utils/motion";
import CountUp from "react-countup";
import {
  Users,
  Target,
  Eye,
  Award,
  Calendar,
  MapPin,
  Building,
  Leaf,
  Lightbulb,
  HeartHandshake,
  X,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

const AboutUsPage = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [selectedTimelineItem, setSelectedTimelineItem] = useState(null);
  const statsRef = useRef(null);
  const timelineRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    if (statsRef.current) {
      observer.observe(statsRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // Timeline data
  const timelineData = [
    {
      year: "2008",
      title: "Foundation",
      description:
        "MayDesigns was founded with a vision to transform architectural landscapes through innovative design.",
      icon: "🏛️",
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
      icon: "🏆",
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
      icon: "🌍",
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
      icon: "🌱",
      image:
        "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      details: {
        achievements: [
          "Achieved LEED Platinum certification for 5 projects",
          "Reduced carbon footprint by 40% across all projects",
          "Introduced sustainable material sourcing",
        ],
        impact:
          "Pioneered eco-friendly architectural practices in the industry",
      },
    },
    {
      year: "2019",
      title: "Digital Transformation",
      description:
        "Integrated advanced BIM technologies and virtual reality in our design process.",
      icon: "💻",
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
      icon: "⭐",
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

  // Team members
  const teamMembers = [
    {
      name: "Sarah Chen",
      role: "Principal Architect",
      image:
        "https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=400&crop=face",
      bio: "20+ years of experience in commercial and residential architecture. Harvard Graduate School of Design alumni.",
      specialties: [
        "Sustainable Design",
        "Urban Planning",
        "Project Management",
      ],
    },
    {
      name: "Marcus Rodriguez",
      role: "Design Director",
      image:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=400&crop=face",
      bio: "Specialized in sustainable design and urban planning. Award-winning designer with international experience.",
      specialties: ["Green Architecture", "3D Modeling", "Client Relations"],
    },
    {
      name: "Emily Watson",
      role: "Project Manager",
      image:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=400&crop=face",
      bio: "Expert in managing large-scale architectural projects. PMP certified with 15 years of experience.",
      specialties: [
        "Budget Management",
        "Timeline Coordination",
        "Team Leadership",
      ],
    },
    {
      name: "David Kim",
      role: "Interior Design Lead",
      image:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=400&crop=face",
      bio: "Creates harmonious spaces that blend functionality with aesthetics. RISD graduate with multiple awards.",
      specialties: ["Space Planning", "Material Selection", "Lighting Design"],
    },
  ];

  // Statistics
  const stats = [
    { number: 150, suffix: "+", label: "Projects Completed", icon: Building },
    { number: 25, suffix: "+", label: "Awards Won", icon: Award },
    { number: 15, suffix: "+", label: "Years Experience", icon: Calendar },
    { number: 8, suffix: "", label: "Countries Served", icon: MapPin },
  ];

  // Values
  const values = [
    {
      icon: Leaf,
      title: "Sustainability",
      description:
        "We prioritize eco-friendly materials and energy-efficient designs in every project.",
      color: "from-green-500 to-emerald-600",
    },
    {
      icon: Lightbulb,
      title: "Innovation",
      description:
        "Constantly pushing boundaries with new technologies and creative design solutions.",
      color: "from-yellow-500 to-orange-500",
    },
    {
      icon: HeartHandshake,
      title: "Collaboration",
      description:
        "Working closely with clients to bring their unique vision to life.",
      color: "from-blue-500 to-cyan-500",
    },
    {
      icon: Target,
      title: "Excellence",
      description:
        "Committed to delivering exceptional quality in every detail of our work.",
      color: "from-purple-500 to-pink-500",
    },
  ];

  // Road Timeline Component
  const RoadTimeline = () => {
    return (
      <div className="relative py-20">
        {/* Road Container */}
        <div className="relative max-w-6xl mx-auto">
          {/* Main Road Path */}
          <div className="absolute left-1/2 transform -translate-x-1/2 w-2 h-full bg-gradient-to-b from-gray-300 to-gray-400 rounded-lg shadow-2xl">
            {/* Road Center Line */}
            <div
              className="absolute left-1/2 transform -translate-x-1/2 w-1 h-8 bg-yellow-400 rounded-full shadow-lg animate-pulse"
              style={{ animationDelay: "0.5s" }}
            ></div>
            <div
              className="absolute left-1/2 transform -translate-x-1/2 w-1 h-8 bg-yellow-400 rounded-full shadow-lg animate-pulse top-1/4"
              style={{ animationDelay: "1s" }}
            ></div>
            <div
              className="absolute left-1/2 transform -translate-x-1/2 w-1 h-8 bg-yellow-400 rounded-full shadow-lg animate-pulse top-2/4"
              style={{ animationDelay: "1.5s" }}
            ></div>
            <div
              className="absolute left-1/2 transform -translate-x-1/2 w-1 h-8 bg-yellow-400 rounded-full shadow-lg animate-pulse top-3/4"
              style={{ animationDelay: "2s" }}
            ></div>
          </div>

          {/* Road Side Lines */}
          <div className="absolute left-1/2 transform -translate-x-1/2 -ml-12 w-6 h-full border-l-4 border-r-4 border-gray-200 border-dashed"></div>
          <div className="absolute left-1/2 transform -translate-x-1/2 ml-12 w-6 h-full border-l-4 border-r-4 border-gray-200 border-dashed"></div>

          {/* Timeline Items */}
          {timelineData.map((item, index) => {
            const isEven = index % 2 === 0;
            const positionClass = isEven ? "left-0" : "right-0";
            const translateClass = isEven
              ? "translate-x-[-100%]"
              : "translate-x-[100%]";

            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: isEven ? -100 : 100 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                viewport={{ once: true, margin: "-100px" }}
                className={`absolute ${positionClass} w-1/2 px-8`}
                style={{ top: `${(index / (timelineData.length - 1)) * 100}%` }}
              >
                {/* Content Card */}
                <motion.div
                  whileHover={{ scale: 1.05, y: -5 }}
                  onClick={() => setSelectedTimelineItem(item)}
                  className={`bg-white rounded-2xl shadow-2xl p-6 cursor-pointer group border-2 border-transparent hover:border-burnt-orange transition-all duration-300 ${
                    isEven ? "ml-auto mr-4" : "mr-auto ml-4"
                  } max-w-md`}
                >
                  {/* Year Marker on Road */}
                  <div
                    className={`absolute top-1/2 transform -translate-y-1/2 ${
                      isEven
                        ? "right-0 translate-x-1/2"
                        : "left-0 -translate-x-1/2"
                    }`}
                  >
                    <motion.div
                      whileHover={{ scale: 1.2 }}
                      className="w-12 h-12 bg-gradient-to-br from-burnt-orange to-orange-500 rounded-full flex items-center justify-center shadow-2xl border-4 border-white"
                    >
                      <span className="text-white font-bold text-sm">
                        {item.year}
                      </span>
                    </motion.div>
                  </div>

                  {/* Content */}
                  <div className="flex items-start mb-4">
                    <span className="text-3xl mr-4">{item.icon}</span>
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 group-hover:text-burnt-orange transition-colors">
                        {item.title}
                      </h3>
                      <p className="text-gray-600 text-sm mt-2 leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center text-burnt-orange text-sm font-semibold">
                    <span>Explore Milestone</span>
                    <ChevronRight className="w-4 h-4 ml-1 transform group-hover:translate-x-1 transition-transform" />
                  </div>
                </motion.div>
              </motion.div>
            );
          })}
        </div>

        {/* Start and End Road Signs */}
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-4">
          <div className="bg-green-500 text-white px-4 py-2 rounded-lg shadow-2xl font-bold text-sm">
            START 2008
          </div>
        </div>
        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-4">
          <div className="bg-red-500 text-white px-4 py-2 rounded-lg shadow-2xl font-bold text-sm">
            CURRENT 2023
          </div>
        </div>
      </div>
    );
  };

  return (
    <motion.div
      initial="hidden"
      whileInView="show"
      viewport={{ once: true }}
      variants={staggerContainer}
      className="min-h-screen bg-white"
    >
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1487958449943-2429e8be8625?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
            alt="Architectural Excellence"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-burnt-orange/90 to-gray-900/90"></div>
        </div>

        <motion.div
          variants={fadeIn("up", "spring", 0.5, 1)}
          className="relative text-center text-white px-4 max-w-6xl"
        >
          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
            Shaping Spaces,
            <br />
            Creating Legacies
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto leading-relaxed">
            15 years of architectural excellence, innovation, and sustainable
            design that transforms visions into reality
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-white text-[#BE5103] px-8 py-4 rounded-lg text-lg font-semibold transition-colors hover:bg-gray-100 shadow-2xl"
          >
            Explore Our Portfolio
          </motion.button>
        </motion.div>
      </section>

      {/* Story Section with Road Timeline */}
      <section
        ref={timelineRef}
        className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50 relative overflow-hidden"
      >
        <div className="max-w-7xl mx-auto">
          <motion.div
            variants={fadeIn("up", "spring", 0.3, 1)}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Our Journey
            </h2>
            <div className="w-24 h-1 bg-burnt-orange mx-auto mb-6"></div>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
              Follow our path from humble beginnings to international
              recognition. Each milestone represents our commitment to
              architectural excellence and innovation.
            </p>
          </motion.div>

          {/* Road Timeline */}
          <div className="relative h-[1200px]">
            <RoadTimeline />
          </div>
        </div>
      </section>

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
                    <span className="text-4xl mr-4">
                      {selectedTimelineItem.icon}
                    </span>
                    <div>
                      <h2 className="text-3xl font-bold">
                        {selectedTimelineItem.title}
                      </h2>
                      <div className="text-2xl font-semibold text-orange-300">
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
                    <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                      <Award className="text-burnt-orange mr-3" size={24} />
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
                            className="flex items-start bg-orange-50 rounded-lg p-4"
                          >
                            <div className="bg-burnt-orange rounded-full p-1 mr-3 mt-1 flex-shrink-0">
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
                    <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                      <Target className="text-burnt-orange mr-3" size={24} />
                      Impact & Legacy
                    </h3>
                    <div className="bg-gradient-to-r from-orange-50 to-red-50 rounded-xl p-6 border-l-4 border-burnt-orange">
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
                    className="flex items-center text-burnt-orange font-semibold hover:text-orange-700 transition-colors px-4 py-2 rounded-lg hover:bg-orange-50"
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
                    className="flex items-center text-burnt-orange font-semibold hover:text-orange-700 transition-colors px-4 py-2 rounded-lg hover:bg-orange-50"
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

      {/* Stats Section */}
      <section ref={statsRef} className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                variants={zoomIn(index * 0.2, 1)}
                className="text-center group"
              >
                <div className="bg-gradient-to-br from-gray-50 to-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-3 border border-gray-100">
                  <div className="bg-burnt-orange bg-opacity-10 w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                    <stat.icon className="text-burnt-orange text-3xl" />
                  </div>
                  <div className="text-4xl font-bold text-gray-900 mb-2">
                    {isVisible && (
                      <CountUp
                        end={stat.number}
                        suffix={stat.suffix}
                        duration={3}
                        className="bg-gradient-to-r from-burnt-orange to-orange-600 bg-clip-text text-transparent"
                      />
                    )}
                  </div>
                  <div className="text-gray-600 font-semibold text-lg">
                    {stat.label}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20 bg-gradient-to-br from-gray-900 to-burnt-orange text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <motion.div
              variants={fadeIn("right", "spring", 0.3, 1)}
              className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20"
            >
              <div className="flex items-center mb-6">
                <div className="bg-white/20 p-3 rounded-2xl mr-4">
                  <Target className="text-white" size={32} />
                </div>
                <h3 className="text-3xl font-bold">Our Mission</h3>
              </div>
              <p className="text-lg leading-relaxed text-white/90">
                To create innovative, sustainable, and human-centric
                architectural solutions that enhance the quality of life while
                respecting the environment. We strive to push the boundaries of
                design while maintaining functionality, beauty, and timeless
                elegance in every project we undertake.
              </p>
            </motion.div>

            <motion.div
              variants={fadeIn("left", "spring", 0.3, 1)}
              className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20"
            >
              <div className="flex items-center mb-6">
                <div className="bg-white/20 p-3 rounded-2xl mr-4">
                  <Eye className="text-white" size={32} />
                </div>
                <h3 className="text-3xl font-bold">Our Vision</h3>
              </div>
              <p className="text-lg leading-relaxed text-white/90">
                To be the world's most innovative architecture firm, recognized
                for transforming urban landscapes through sustainable practices
                and cutting-edge design. We envision a future where architecture
                and nature coexist in perfect harmony, creating spaces that
                inspire and endure for generations to come.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={fadeIn("up", "spring", 0.3, 1)}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Our Values
            </h2>
            <div className="w-24 h-1 bg-burnt-orange mx-auto mb-6"></div>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              The principles that guide every decision we make and every design
              we create
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={index}
                variants={fadeIn("up", "spring", index * 0.2, 1)}
                whileHover={{ y: -10 }}
                className="group"
              >
                <div
                  className={`bg-gradient-to-br ${value.color} text-white rounded-2xl p-8 h-full transform transition-all duration-300 group-hover:scale-105 shadow-lg group-hover:shadow-2xl`}
                >
                  <div className="bg-white/20 w-16 h-16 rounded-2xl flex items-center justify-center mb-6 group-hover:rotate-12 transition-transform">
                    <value.icon className="text-white text-2xl" />
                  </div>
                  <h3 className="text-2xl font-bold mb-4">{value.title}</h3>
                  <p className="text-white/90 leading-relaxed">
                    {value.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={fadeIn("up", "spring", 0.3, 1)}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Meet Our Architects
            </h2>
            <div className="w-24 h-1 bg-burnt-orange mx-auto mb-6"></div>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our diverse team of architects, designers, and visionaries brings
              together decades of experience and a shared passion for creating
              extraordinary spaces.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamMembers.map((member, index) => (
              <motion.div
                key={index}
                variants={fadeIn("up", "spring", index * 0.2, 1)}
                whileHover={{ y: -15 }}
                className="group"
              >
                <div className="bg-white rounded-2xl shadow-xl overflow-hidden transition-all duration-300 group-hover:shadow-2xl">
                  <div className="h-80 overflow-hidden relative">
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-gray-900 mb-2">
                      {member.name}
                    </h3>
                    <p className="text-burnt-orange font-semibold mb-3">
                      {member.role}
                    </p>
                    <p className="text-gray-600 text-sm mb-4 leading-relaxed">
                      {member.bio}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {member.specialties.map((specialty, idx) => (
                        <span
                          key={idx}
                          className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-xs font-medium"
                        >
                          {specialty}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-burnt-orange to-orange-600">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={fadeIn("up", "spring", 0.3, 1)}
            className="text-white"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Ready to Start Your Project?
            </h2>
            <p className="text-xl mb-8 text-white/90 max-w-2xl mx-auto">
              Let's collaborate to create something extraordinary. Schedule a
              consultation with our team today.
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-white text-[#BE5103] px-8 py-4 rounded-lg text-lg font-semibold transition-colors hover:bg-gray-100 shadow-2xl"
            >
              Start Your Journey
            </motion.button>
          </motion.div>
        </div>
      </section>
    </motion.div>
  );
};

export default AboutUsPage;
