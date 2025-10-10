// pages/Projects/ProjectDetailPage.js
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useParams, Link, useNavigate } from "react-router-dom";
import {
  FiMapPin,
  FiCalendar,
  FiAward,
  FiArrowLeft,
  FiShare2,
  FiHeart,
  FiMaximize,
  FiChevronLeft,
  FiChevronRight,
  FiUsers,
  FiLayers,
} from "react-icons/fi";

// Mock data - in real app, you'd fetch this based on the ID
const projectDatabase = {
  1: {
    id: 1,
    name: "Modern Cliffside Villa",
    category: "architecture",
    subCategory: "residential",
    type: "Residential Villa",
    description:
      "A stunning contemporary villa built into a cliffside with panoramic ocean views. This project represents our commitment to sustainable luxury and seamless integration with natural landscapes.",
    fullDescription: `
      Nestled into the dramatic cliffs of Malibu, this contemporary villa represents the pinnacle of sustainable luxury living. 
      The design philosophy centered around creating a harmonious relationship between the built environment and the natural landscape.

      Key architectural features include floor-to-ceiling glass walls that disappear into pockets, blurring the boundaries between 
      indoor and outdoor spaces. The use of locally sourced sustainable materials and passive solar design principles ensures 
      minimal environmental impact while maximizing energy efficiency.

      The villa spans three levels, each carefully terraced into the cliffside to preserve the natural topography. The main living 
      area features a double-height ceiling with exposed timber beams, while the master suite cantilevers over the ocean below, 
      offering breathtaking panoramic views.
    `,
    concept:
      "Harmony with nature through minimalist design and sustainable principles",
    designPhilosophy: `
      Our approach was guided by three core principles: sustainability, connection to nature, and timeless elegance. 
      We believe that great architecture should enhance its surroundings while providing comfort and inspiration to its inhabitants.
      
      The design incorporates passive solar strategies, natural ventilation, and rainwater harvesting systems that reduce 
      the environmental footprint while maintaining luxurious living standards. Every element was carefully considered 
      to create a home that feels both grounded and elevated.
    `,
    highlights: [
      "Sustainable material selection",
      "Passive solar design",
      "Indoor-outdoor living integration",
      "Smart home automation",
      "Earth-sheltered construction",
      "Green roof system",
      "Rainwater harvesting",
      "Natural ventilation",
    ],
    images: [
      "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1513584684374-8bab748fbf90?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1493809842364-78817add7ffb?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
    ],
    beforeAfter: [
      {
        before:
          "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
        after:
          "https://images.unsplash.com/photo-1513584684374-8bab748fbf90?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
        caption: "Main facade transformation",
      },
    ],
    videos: ["https://example.com/video1.mp4"],
    location: "Malibu, California",
    year: "2024",
    area: "4500 sq ft",
    budget: "Confidential",
    duration: "18 months",
    team: [
      { name: "Maria Rodriguez", role: "Lead Architect" },
      { name: "James Chen", role: "Project Manager" },
      { name: "Sarah Johnson", role: "Interior Designer" },
      { name: "David Kim", role: "Landscape Architect" },
      { name: "Alex Thompson", role: "Structural Engineer" },
    ],
    awards: [
      {
        name: "AIA Design Award 2024",
        organization: "American Institute of Architects",
        year: "2024",
        description:
          "Recognizing excellence in architectural design and innovation",
      },
      {
        name: "Sustainable Architecture Prize",
        organization: "Green Building Council",
        year: "2024",
        description:
          "Awarded for outstanding achievement in sustainable design practices",
      },
    ],
    testimonials: [
      {
        text: "Working with this architecture firm was an exceptional experience. They transformed our vision into a breathtaking reality that exceeds all expectations. The attention to detail and commitment to sustainable design is remarkable.",
        author: "Sarah & John Miller",
        role: "Homeowners",
        image:
          "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80",
      },
    ],
    similarProjects: [2, 4],
    tags: ["Sustainable", "Luxury", "Ocean View", "Modern", "Residential"],
  },
};

const ProjectDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("overview");
  const [activeImage, setActiveImage] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);

  const project = projectDatabase[id];

  if (!project) {
    return (
      <div className="min-h-screen bg-gray-50 pt-20 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Project Not Found
          </h1>
          <p className="text-gray-600 mb-8">
            The project you're looking for doesn't exist.
          </p>
          <Link
            to="/projects"
            className="bg-orange-500 text-white px-6 py-3 rounded-lg hover:bg-orange-600"
          >
            Back to Projects
          </Link>
        </div>
      </div>
    );
  }

  const tabs = [
    { id: "overview", name: "Overview" },
    { id: "gallery", name: "Gallery" },
    { id: "design", name: "Design Philosophy" },
    { id: "beforeAfter", name: "Before & After" },
    { id: "team", name: "Project Team" },
    { id: "testimonials", name: "Testimonials" },
    { id: "awards", name: "Awards" },
  ];

  const nextImage = () => {
    setActiveImage((prev) => (prev + 1) % project.images.length);
  };

  const prevImage = () => {
    setActiveImage(
      (prev) => (prev - 1 + project.images.length) % project.images.length
    );
  };

  return (
    <div className="min-h-screen bg-white pt-40">
      {/* Navigation */}
      <div className="container mx-auto px-6 py-6">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center text-gray-600 hover:text-orange-500 transition-colors group"
        >
          <FiArrowLeft className="mr-2 group-hover:-translate-x-1 transition-transform" />
          Back to Projects
        </button>
      </div>

      {/* Hero Section */}
      <section className="relative h-96 md:h-[500px]">
        <AnimatePresence mode="wait">
          <motion.img
            key={activeImage}
            src={project.images[activeImage]}
            alt={project.name}
            className="w-full h-full object-cover"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          />
        </AnimatePresence>

        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />

        {/* Image Navigation */}
        <button
          onClick={prevImage}
          className="absolute left-4 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-colors"
        >
          <FiChevronLeft size={24} />
        </button>
        <button
          onClick={nextImage}
          className="absolute right-4 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-colors"
        >
          <FiChevronRight size={24} />
        </button>

        {/* Image Counter */}
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black/50 text-white px-4 py-2 rounded-full text-sm">
          {activeImage + 1} / {project.images.length}
        </div>

        {/* Action Buttons */}
        <div className="absolute top-6 right-6 flex space-x-2">
          <button
            onClick={() => setIsFavorite(!isFavorite)}
            className={`w-12 h-12 rounded-full backdrop-blur-sm flex items-center justify-center transition-colors ${
              isFavorite
                ? "bg-red-500/20 text-red-500"
                : "bg-white/20 text-white hover:bg-white/30"
            }`}
          >
            <FiHeart className={isFavorite ? "fill-current" : ""} />
          </button>
          <button className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-white hover:bg-white/30 transition-colors">
            <FiShare2 />
          </button>
          <button
            onClick={() => setIsLightboxOpen(true)}
            className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-white hover:bg-white/30 transition-colors"
          >
            <FiMaximize />
          </button>
        </div>

        {/* Project Info Overlay */}
        <div className="absolute bottom-8 left-8 text-white">
          <span className="bg-orange-500 px-4 py-2 rounded-full text-sm font-semibold mb-4 inline-block">
            {project.category}
          </span>
          <h1 className="text-4xl md:text-5xl font-bold mb-2">
            {project.name}
          </h1>
          <p className="text-xl opacity-90">{project.type}</p>
        </div>
      </section>

      {/* Image Thumbnails */}
      <div className="container mx-auto px-6 py-4">
        <div className="flex space-x-2 overflow-x-auto pb-2">
          {project.images.map((image, index) => (
            <button
              key={index}
              onClick={() => setActiveImage(index)}
              className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-all ${
                activeImage === index
                  ? "border-orange-500 scale-105"
                  : "border-gray-300 hover:border-gray-400"
              }`}
            >
              <img
                src={image}
                alt={`${project.name} view ${index + 1}`}
                className="w-full h-full object-cover"
              />
            </button>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Main Content */}
            <div className="lg:col-span-2">
              {/* Tabs */}
              <div className="border-b border-gray-200 mb-8 overflow-x-auto">
                <nav className="flex space-x-8 min-w-max">
                  {tabs.map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`py-4 px-1 border-b-2 font-medium text-sm whitespace-nowrap ${
                        activeTab === tab.id
                          ? "border-orange-500 text-orange-600"
                          : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                      }`}
                    >
                      {tab.name}
                    </button>
                  ))}
                </nav>
              </div>

              {/* Tab Content */}
              <div className="prose max-w-none">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeTab}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                  >
                    {activeTab === "overview" && (
                      <OverviewTab project={project} />
                    )}
                    {activeTab === "gallery" && (
                      <GalleryTab project={project} />
                    )}
                    {activeTab === "design" && <DesignTab project={project} />}
                    {activeTab === "beforeAfter" && (
                      <BeforeAfterTab project={project} />
                    )}
                    {activeTab === "team" && <TeamTab project={project} />}
                    {activeTab === "testimonials" && (
                      <TestimonialsTab project={project} />
                    )}
                    {activeTab === "awards" && <AwardsTab project={project} />}
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              <ProjectInfoCard project={project} />
              <CTACard />
            </div>
          </div>
        </div>
      </section>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {isLightboxOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center"
            onClick={() => setIsLightboxOpen(false)}
          >
            <div className="relative max-w-7xl max-h-full">
              <img
                src={project.images[activeImage]}
                alt={project.name}
                className="max-w-full max-h-full object-contain"
              />

              <button
                onClick={() => setIsLightboxOpen(false)}
                className="absolute top-4 right-4 w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-colors"
              >
                ×
              </button>

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  prevImage();
                }}
                className="absolute left-4 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-colors"
              >
                <FiChevronLeft size={24} />
              </button>

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  nextImage();
                }}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-colors"
              >
                <FiChevronRight size={24} />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// Tab Components
const OverviewTab = ({ project }) => (
  <div className="space-y-8">
    <div>
      <h2 className="text-3xl font-bold text-gray-900 mb-6">
        Project Overview
      </h2>
      <p className="text-gray-600 leading-relaxed text-lg">
        {project.fullDescription}
      </p>
    </div>

    <div>
      <h3 className="text-2xl font-bold text-gray-900 mb-4">
        Design Highlights
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {project.highlights.map((highlight, index) => (
          <div key={index} className="flex items-start space-x-3">
            <div className="w-2 h-2 bg-orange-500 rounded-full mt-2 flex-shrink-0"></div>
            <span className="text-gray-600">{highlight}</span>
          </div>
        ))}
      </div>
    </div>

    <div>
      <h3 className="text-2xl font-bold text-gray-900 mb-4">Project Tags</h3>
      <div className="flex flex-wrap gap-2">
        {project.tags.map((tag, index) => (
          <span
            key={index}
            className="bg-gray-100 text-gray-700 px-4 py-2 rounded-full text-sm font-medium"
          >
            {tag}
          </span>
        ))}
      </div>
    </div>
  </div>
);

const GalleryTab = ({ project }) => (
  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
    {project.images.map((image, index) => (
      <div
        key={index}
        className="rounded-lg overflow-hidden group cursor-zoom-in"
      >
        <img
          src={image}
          alt={`${project.name} - View ${index + 1}`}
          className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
        />
      </div>
    ))}
  </div>
);

const DesignTab = ({ project }) => (
  <div className="space-y-8">
    <div>
      <h3 className="text-2xl font-bold text-gray-900 mb-4">Design Concept</h3>
      <p className="text-gray-600 leading-relaxed">{project.concept}</p>
    </div>

    <div>
      <h3 className="text-2xl font-bold text-gray-900 mb-4">
        Design Philosophy
      </h3>
      <p className="text-gray-600 leading-relaxed whitespace-pre-line">
        {project.designPhilosophy}
      </p>
    </div>
  </div>
);

const BeforeAfterTab = ({ project }) => (
  <div className="space-y-12">
    {project.beforeAfter.map((comparison, index) => (
      <div key={index} className="text-center">
        <h3 className="text-2xl font-bold text-gray-900 mb-8">
          {comparison.caption}
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h4 className="text-lg font-semibold text-gray-700 mb-4">Before</h4>
            <img
              src={comparison.before}
              alt="Before"
              className="w-full h-80 object-cover rounded-xl shadow-lg"
            />
          </div>
          <div>
            <h4 className="text-lg font-semibold text-gray-700 mb-4">After</h4>
            <img
              src={comparison.after}
              alt="After"
              className="w-full h-80 object-cover rounded-xl shadow-lg"
            />
          </div>
        </div>
      </div>
    ))}
  </div>
);

const TeamTab = ({ project }) => (
  <div className="space-y-6">
    <h3 className="text-2xl font-bold text-gray-900 mb-6">Project Team</h3>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {project.team.map((member, index) => (
        <div key={index} className="bg-gray-50 rounded-lg p-6">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
              <FiUsers className="text-orange-500" />
            </div>
            <div>
              <h4 className="font-semibold text-gray-900">{member.name}</h4>
              <p className="text-gray-600 text-sm">{member.role}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
);

const TestimonialsTab = ({ project }) => (
  <div className="space-y-6">
    {project.testimonials.map((testimonial, index) => (
      <div key={index} className="bg-gray-50 rounded-xl p-8">
        <div className="flex items-start space-x-4">
          <img
            src={testimonial.image}
            alt={testimonial.author}
            className="w-16 h-16 rounded-full object-cover"
          />
          <div className="flex-1">
            <p className="text-gray-600 italic text-lg mb-4">
              "{testimonial.text}"
            </p>
            <div>
              <p className="font-semibold text-gray-900">
                {testimonial.author}
              </p>
              <p className="text-gray-500 text-sm">{testimonial.role}</p>
            </div>
          </div>
        </div>
      </div>
    ))}
  </div>
);

const AwardsTab = ({ project }) => (
  <div className="space-y-6">
    {project.awards.map((award, index) => (
      <div key={index} className="border-l-4 border-orange-500 pl-6 py-4">
        <h3 className="font-semibold text-gray-900 text-lg">{award.name}</h3>
        <p className="text-gray-600">{award.organization}</p>
        <p className="text-gray-500 text-sm mt-1">{award.year}</p>
        {award.description && (
          <p className="text-gray-600 text-sm mt-2">{award.description}</p>
        )}
      </div>
    ))}
  </div>
);

const ProjectInfoCard = ({ project }) => (
  <div className="bg-gray-50 rounded-xl p-6 sticky top-6">
    <h3 className="text-lg font-semibold text-gray-900 mb-4">
      Project Details
    </h3>
    <div className="space-y-4">
      <div className="flex items-center text-gray-600">
        <FiMapPin className="mr-3 text-orange-500 flex-shrink-0" />
        <span>{project.location}</span>
      </div>
      <div className="flex items-center text-gray-600">
        <FiCalendar className="mr-3 text-orange-500 flex-shrink-0" />
        <span>Completed {project.year}</span>
      </div>
      <div className="flex items-center text-gray-600">
        <FiLayers className="mr-3 text-orange-500 flex-shrink-0" />
        <span>{project.area}</span>
      </div>
      <div className="flex items-center text-gray-600">
        <FiUsers className="mr-3 text-orange-500 flex-shrink-0" />
        <span>{project.duration}</span>
      </div>
      {project.awards.length > 0 && (
        <div className="flex items-center text-gray-600">
          <FiAward className="mr-3 text-orange-500 flex-shrink-0" />
          <span>{project.awards.length} Awards</span>
        </div>
      )}
    </div>

    <div className="mt-6 pt-6 border-t border-gray-200">
      <h4 className="font-semibold text-gray-900 mb-3">Project Categories</h4>
      <div className="flex flex-wrap gap-2">
        <span className="bg-orange-100 text-orange-700 px-3 py-1 rounded-full text-sm">
          {project.category}
        </span>
        <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm">
          {project.subCategory}
        </span>
        <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm">
          {project.type}
        </span>
      </div>
    </div>
  </div>
);

const CTACard = () => (
  <div className="bg-orange-50 rounded-xl p-6 border border-orange-200">
    <h3 className="text-lg font-semibold text-gray-900 mb-3">
      Inspired by this project?
    </h3>
    <p className="text-gray-600 mb-4 text-sm">
      Let's discuss how we can bring your vision to life with the same level of
      craftsmanship and attention to detail.
    </p>
    <Link
      to="/contact-us"
      className="block w-full bg-orange-500 text-white text-center py-3 rounded-lg hover:bg-orange-600 transition-colors font-semibold mb-3"
    >
      Start Your Project
    </Link>
    <p className="text-center text-gray-500 text-xs">
      Let's design your space together
    </p>
  </div>
);

export default ProjectDetailPage;
