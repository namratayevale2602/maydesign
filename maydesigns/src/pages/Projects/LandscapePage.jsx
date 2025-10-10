// pages/Projects/LandscapePage.js
import React, { useState } from "react";
import { motion } from "framer-motion";
import { FiMapPin, FiCalendar, FiAward, FiArrowRight } from "react-icons/fi";
import { Link } from "react-router-dom";

const landscapeProjects = [
  {
    id: 1,
    name: "Zen Garden Retreat",
    type: "Residential Garden",
    description:
      "Serene Japanese-inspired garden with water features and meditation spaces designed for urban tranquility.",
    shortDescription: "Japanese-inspired urban oasis",
    concept:
      "Harmony of nature and human spirit through traditional Japanese garden principles",
    designPhilosophy:
      "Creating spaces that promote mindfulness and connection with nature through carefully curated elements and natural materials.",
    highlights: [
      "Koi pond with waterfall",
      "Stone meditation path",
      "Cherry blossom trees",
      "Traditional tea house",
      "Zen rock garden",
    ],
    images: [
      "https://images.unsplash.com/photo-1560717789-0ac7c58ac90a?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1585325698552-58a5e46b150d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
    ],
    location: "Portland, Oregon",
    year: "2024",
    area: "1.2 acres",
    budget: "$150,000",
    duration: "3 months",
    team: [
      { name: "Lisa Tanaka", role: "Lead Landscape Designer" },
      { name: "Kenji Yamamoto", role: "Japanese Garden Specialist" },
    ],
    awards: [
      {
        name: "ASLA Residential Design Award",
        organization: "American Society of Landscape Architects",
        year: "2024",
      },
    ],
    featured: true,
    tags: ["Japanese", "Meditation", "Water Features", "Residential"],
  },
  {
    id: 2,
    name: "Public Park Redevelopment",
    type: "Public Space",
    description:
      "Community park with interactive installations, sustainable landscaping, and accessible design for all ages.",
    shortDescription: "Sustainable community park transformation",
    concept: "Community engagement through interactive natural spaces",
    designPhilosophy:
      "Designing public spaces that foster community interaction while promoting environmental education and sustainability.",
    highlights: [
      "Rainwater harvesting system",
      "Native plant restoration",
      "Interactive water features",
      "Community garden plots",
      "Accessible pathways",
    ],
    images: [
      "https://images.unsplash.com/photo-1518623489648-a173ef7824f3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1573588028698-f4759befb09a?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
    ],
    location: "Chicago, Illinois",
    year: "2023",
    area: "5 acres",
    budget: "$2.5M",
    duration: "8 months",
    team: [
      { name: "Michael Chen", role: "Lead Landscape Architect" },
      { name: "Sarah Johnson", role: "Community Engagement Specialist" },
    ],
    awards: [
      {
        name: "Urban Design Excellence Award",
        organization: "Urban Land Institute",
        year: "2023",
      },
    ],
    featured: true,
    tags: ["Public Space", "Sustainable", "Community", "Urban"],
  },
  {
    id: 3,
    name: "Rooftop Urban Farm",
    type: "Commercial",
    description:
      "Transformative rooftop space combining urban agriculture with recreational areas in downtown setting.",
    shortDescription: "Productive rooftop landscape",
    concept: "Urban agriculture meets recreational space",
    designPhilosophy:
      "Maximizing underutilized urban spaces for food production, community gathering, and environmental benefits.",
    highlights: [
      "Hydroponic systems",
      "Composting facility",
      "Outdoor kitchen",
      "Beehives",
      "Green roof technology",
    ],
    images: [
      "https://images.unsplash.com/photo-1464226184884-fa280b87c399?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1494522358652-f30e61ad16d7?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
    ],
    location: "Brooklyn, New York",
    year: "2023",
    area: "15,000 sq ft",
    budget: "$800,000",
    duration: "6 months",
    team: [
      { name: "David Kim", role: "Urban Agriculture Specialist" },
      { name: "Maria Rodriguez", role: "Landscape Architect" },
    ],
    tags: ["Urban Farm", "Sustainable", "Commercial", "Green Roof"],
  },
  {
    id: 4,
    name: "Coastal Residence Gardens",
    type: "Residential",
    description:
      "Drought-tolerant landscape design for coastal property with native plants and ocean views.",
    shortDescription: "Sustainable coastal garden design",
    concept: "Resilient beauty in coastal environments",
    designPhilosophy:
      "Creating landscapes that thrive in coastal conditions while preserving views and supporting local ecosystems.",
    highlights: [
      "Native drought-tolerant plants",
      "Salt-resistant materials",
      "Erosion control systems",
      "Ocean view preservation",
      "Outdoor living spaces",
    ],
    images: [
      "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1510798831973-ede8d50215dc?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
    ],
    location: "Malibu, California",
    year: "2024",
    area: "2.5 acres",
    budget: "$300,000",
    duration: "4 months",
    team: [
      { name: "Jessica Wong", role: "Coastal Landscape Specialist" },
      { name: "Robert Brown", role: "Irrigation Designer" },
    ],
    tags: ["Coastal", "Drought-tolerant", "Residential", "Native Plants"],
  },
  {
    id: 5,
    name: "Corporate Campus Green Space",
    type: "Commercial",
    description:
      "Employee-focused outdoor spaces with walking trails, collaboration areas, and sustainable features.",
    shortDescription: "Employee wellness landscape",
    concept: "Nature-inspired workplace environments",
    designPhilosophy:
      "Enhancing employee wellbeing and productivity through thoughtfully designed outdoor spaces that encourage movement and connection.",
    highlights: [
      "Walking meditation paths",
      "Outdoor meeting spaces",
      "Native pollinator gardens",
      "Stormwater management",
      "Shaded seating areas",
    ],
    images: [
      "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1571624436279-b272aff752b5?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
    ],
    location: "Austin, Texas",
    year: "2023",
    area: "8 acres",
    budget: "$1.2M",
    duration: "7 months",
    team: [
      { name: "Thomas Wilson", role: "Corporate Landscape Architect" },
      { name: "Amanda Lee", role: "Wellness Design Consultant" },
    ],
    awards: [
      {
        name: "Workplace Design Award",
        organization: "International Interior Design Association",
        year: "2023",
      },
    ],
    tags: ["Corporate", "Wellness", "Sustainable", "Commercial"],
  },
];

const LandscapePage = () => {
  const [filter, setFilter] = useState("all");

  const projectTypes = [
    { id: "all", name: "All Projects", count: landscapeProjects.length },
    {
      id: "residential",
      name: "Residential",
      count: landscapeProjects.filter((p) => p.type.includes("Residential"))
        .length,
    },
    {
      id: "commercial",
      name: "Commercial",
      count: landscapeProjects.filter((p) => p.type === "Commercial").length,
    },
    {
      id: "public",
      name: "Public Space",
      count: landscapeProjects.filter((p) => p.type === "Public Space").length,
    },
  ];

  const filteredProjects = landscapeProjects.filter(
    (project) =>
      filter === "all" ||
      (filter === "residential" && project.type.includes("Residential")) ||
      (filter === "commercial" && project.type === "Commercial") ||
      (filter === "public" && project.type === "Public Space")
  );

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      {/* Header */}
      <section className="bg-white py-20">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <div className="text-6xl mb-6">🌿</div>
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
              Landscape Design
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Creating outdoor spaces that harmonize with nature while providing
              functional and beautiful environments for living and recreation.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-12 bg-green-50">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <div className="text-3xl font-bold text-gray-900 mb-2">
                {landscapeProjects.length}+
              </div>
              <div className="text-gray-600">Landscapes Designed</div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <div className="text-3xl font-bold text-gray-900 mb-2">12+</div>
              <div className="text-gray-600">Years Experience</div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <div className="text-3xl font-bold text-gray-900 mb-2">8</div>
              <div className="text-gray-600">Awards Won</div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              <div className="text-3xl font-bold text-gray-900 mb-2">100%</div>
              <div className="text-gray-600">Client Satisfaction</div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Filters */}
      <section className="py-8 bg-white">
        <div className="container mx-auto px-6">
          <div className="flex flex-wrap gap-4 justify-center">
            {projectTypes.map((type) => (
              <button
                key={type.id}
                onClick={() => setFilter(type.id)}
                className={`px-6 py-3 rounded-full font-medium transition-all ${
                  filter === type.id
                    ? "bg-green-500 text-white shadow-lg"
                    : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                }`}
              >
                {type.name} ({type.count})
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {filteredProjects.map((project, index) => (
              <LandscapeProjectCard
                key={project.id}
                project={project}
                index={index}
              />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              Ready to Transform Your Outdoor Space?
            </h2>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              Let's create a landscape that enhances your property and connects
              you with nature.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/contact-us"
                className="bg-green-500 text-white px-8 py-4 rounded-lg font-semibold hover:bg-green-600 transition-colors flex items-center justify-center"
              >
                Start Your Project
                <FiArrowRight className="ml-2" />
              </Link>
              <button className="border-2 border-gray-300 text-gray-700 px-8 py-4 rounded-lg font-semibold hover:border-green-500 hover:text-green-500 transition-colors">
                View Design Process
              </button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

const LandscapeProjectCard = ({ project, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.2 }}
      className="bg-white rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-all cursor-pointer group"
    >
      <div className="relative overflow-hidden">
        <img
          src={project.images[0]}
          alt={project.name}
          className="w-full h-80 object-cover group-hover:scale-110 transition-transform duration-700"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        <div className="absolute top-6 left-6">
          <span
            className={`px-4 py-2 rounded-full text-sm font-semibold ${
              project.featured
                ? "bg-green-500 text-white"
                : "bg-white/90 text-gray-700"
            }`}
          >
            {project.featured ? "Featured" : project.type}
          </span>
        </div>

        <div className="absolute bottom-6 left-6 right-6 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <p className="text-sm line-clamp-2">{project.shortDescription}</p>
        </div>
      </div>

      <div className="p-8">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-2xl font-bold text-gray-900 group-hover:text-green-500 transition-colors">
            {project.name}
          </h3>
          <span className="text-gray-500 flex items-center">
            <FiCalendar className="mr-1" />
            {project.year}
          </span>
        </div>

        <p className="text-gray-600 mb-6 line-clamp-3">{project.description}</p>

        <div className="space-y-4 mb-6">
          <div>
            <h4 className="font-semibold text-gray-900 mb-2">
              Design Concept:
            </h4>
            <p className="text-gray-600 text-sm">{project.concept}</p>
          </div>

          <div>
            <h4 className="font-semibold text-gray-900 mb-2">Key Features:</h4>
            <div className="flex flex-wrap gap-2">
              {project.highlights.slice(0, 4).map((highlight, idx) => (
                <span
                  key={idx}
                  className="bg-green-50 text-green-700 px-3 py-1 rounded-full text-sm"
                >
                  {highlight}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between pt-6 border-t border-gray-100">
          <div className="flex items-center space-x-4 text-sm text-gray-500">
            <span className="flex items-center">
              <FiMapPin className="mr-1" />
              {project.location}
            </span>
            <span>{project.area}</span>
          </div>

          <div className="flex items-center space-x-2">
            {project.awards && project.awards.length > 0 && (
              <span className="flex items-center text-green-500 text-sm">
                <FiAward className="mr-1" />
                Awarded
              </span>
            )}
            <Link
              to={`/projects/${project.id}`}
              className="bg-green-500 text-white px-6 py-2 rounded-lg hover:bg-green-600 transition-colors font-semibold flex items-center group/link"
            >
              Explore
              <FiArrowRight className="ml-2 group-hover/link:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default LandscapePage;
