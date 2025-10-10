import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  FiMapPin,
  FiCalendar,
  FiAward,
  FiArrowRight,
  FiHome,
  FiUsers,
} from "react-icons/fi";
import { Link } from "react-router-dom";

const residentialProjects = [
  {
    id: 1,
    name: "Urban Loft Transformation",
    type: "Residential",
    style: "Industrial Chic",
    description:
      "Complete transformation of a downtown industrial space into a modern living loft with smart home integration and custom storage solutions.",
    shortDescription: "Industrial chic loft conversion in heart of downtown",
    concept: "Urban industrial meets contemporary comfort",
    designPhilosophy:
      "Preserving historical character while introducing modern amenities and maximizing space efficiency in urban environments.",
    highlights: [
      "Custom built-in storage",
      "Smart home automation",
      "Exposed brick preservation",
      "Open concept living",
      "Industrial materials",
      "Floating mezzanine",
      "Custom lighting design",
    ],
    images: [
      "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
    ],
    location: "New York, NY",
    year: "2023",
    area: "1800 sq ft",
    budget: "$250,000",
    duration: "4 months",
    team: [
      { name: "Emily Chen", role: "Lead Interior Designer" },
      { name: "Marcus Johnson", role: "Space Planning Specialist" },
    ],
    awards: [
      {
        name: "Residential Design Excellence",
        organization: "Interior Design Society",
        year: "2023",
      },
    ],
    featured: true,
    tags: ["Industrial", "Smart Home", "Urban", "Loft"],
  },
  {
    id: 2,
    name: "Modern Family Residence",
    type: "Residential",
    style: "Contemporary",
    description:
      "Complete interior design for a growing family home with kid-friendly spaces, smart storage, and durable luxury materials.",
    shortDescription: "Family-focused modern interior with smart solutions",
    concept: "Modern family living with style and function",
    designPhilosophy:
      "Designing beautiful spaces that work for real family life, combining durability with sophisticated design elements.",
    highlights: [
      "Kid-friendly materials",
      "Custom storage solutions",
      "Open family spaces",
      "Home office integration",
      "Outdoor living connection",
      "Durable luxury finishes",
      "Flexible living areas",
    ],
    images: [
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1600607687644-c7171b42498b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
    ],
    location: "Denver, Colorado",
    year: "2024",
    area: "3200 sq ft",
    budget: "$180,000",
    duration: "3 months",
    team: [
      { name: "Rachel Kim", role: "Residential Designer" },
      { name: "Tom Anderson", role: "Family Space Specialist" },
    ],
    featured: true,
    tags: ["Family", "Modern", "Contemporary", "Functional"],
  },
  {
    id: 3,
    name: "Lakeside Retreat Interior",
    type: "Residential",
    style: "Rustic Modern",
    description:
      "Warm and inviting cabin interior with modern amenities, featuring natural materials and panoramic lake views.",
    shortDescription: "Modern rustic cabin with lake views",
    concept: "Rustic elegance meets modern comfort",
    designPhilosophy:
      "Creating cozy, inviting spaces that celebrate natural materials while providing all the comforts of modern living.",
    highlights: [
      "Reclaimed wood features",
      "Stone fireplace",
      "Window wall views",
      "Custom cabinetry",
      "Heated floors",
      "Outdoor living integration",
      "Natural material palette",
    ],
    images: [
      "https://images.unsplash.com/photo-1449247613801-ab06418e2861?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1571508601891-ca5e7a713859?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1513584684374-8bab748fbf90?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
    ],
    location: "Lake Tahoe, California",
    year: "2023",
    area: "2800 sq ft",
    budget: "$220,000",
    duration: "5 months",
    team: [
      { name: "Michael Brown", role: "Rustic Design Specialist" },
      { name: "Sarah Wilson", role: "Interior Architect" },
    ],
    tags: ["Rustic", "Cabin", "Lake House", "Natural"],
  },
  {
    id: 4,
    name: "Penthouse Sky Residence",
    type: "Residential",
    style: "Luxury Modern",
    description:
      "Ultra-luxurious penthouse with panoramic city views, custom millwork, and high-end finishes throughout.",
    shortDescription: "Luxury penthouse with breathtaking views",
    concept: "Urban sophistication with timeless elegance",
    designPhilosophy:
      "Creating bespoke luxury interiors that reflect the client's personality while maximizing the incredible views and natural light.",
    highlights: [
      "Custom millwork throughout",
      "Premium material selection",
      "Smart home integration",
      "Wine cellar",
      "Home theater",
      "Spa-like bathrooms",
      "Private terrace",
    ],
    images: [
      "https://images.unsplash.com/photo-1616594039964-ae9021a400a0?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1600607687644-c7171b42498b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
    ],
    location: "Chicago, Illinois",
    year: "2024",
    area: "4500 sq ft",
    budget: "$650,000",
    duration: "6 months",
    team: [
      { name: "James Wilson", role: "Luxury Design Director" },
      { name: "Lisa Martinez", role: "Custom Millwork Specialist" },
    ],
    awards: [
      {
        name: "Luxury Design Award",
        organization: "International Design Awards",
        year: "2024",
      },
    ],
    tags: ["Luxury", "Penthouse", "Modern", "High-End"],
  },
  {
    id: 5,
    name: "Historic Townhouse Restoration",
    type: "Residential",
    style: "Traditional Revival",
    description:
      "Careful restoration of a historic townhouse with modern updates while preserving original architectural details.",
    shortDescription: "Historic preservation with modern living",
    concept: "Honoring history with contemporary comfort",
    designPhilosophy:
      "Respecting the original architecture while seamlessly integrating modern amenities and creating functional living spaces for today's lifestyle.",
    highlights: [
      "Original detail preservation",
      "Modern kitchen integration",
      "Period-appropriate materials",
      "Custom moldings",
      "Updated mechanical systems",
      "Garden restoration",
      "Heritage color palette",
    ],
    images: [
      "https://images.unsplash.com/photo-1513694203232-719a280e022f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
    ],
    location: "Boston, Massachusetts",
    year: "2023",
    area: "3500 sq ft",
    budget: "$380,000",
    duration: "7 months",
    team: [
      { name: "Robert Thompson", role: "Historic Preservation Specialist" },
      { name: "Amanda Lee", role: "Traditional Design Expert" },
    ],
    awards: [
      {
        name: "Historic Preservation Award",
        organization: "National Trust for Historic Preservation",
        year: "2023",
      },
    ],
    tags: ["Historic", "Traditional", "Restoration", "Heritage"],
  },
];

const ResidentialInteriorPage = () => {
  const [filter, setFilter] = useState("all");

  const styleTypes = [
    { id: "all", name: "All Styles", count: residentialProjects.length },
    {
      id: "modern",
      name: "Modern",
      count: residentialProjects.filter((p) => p.style.includes("Modern"))
        .length,
    },
    {
      id: "industrial",
      name: "Industrial",
      count: residentialProjects.filter((p) => p.style.includes("Industrial"))
        .length,
    },
    {
      id: "rustic",
      name: "Rustic",
      count: residentialProjects.filter((p) => p.style.includes("Rustic"))
        .length,
    },
    {
      id: "traditional",
      name: "Traditional",
      count: residentialProjects.filter((p) => p.style.includes("Traditional"))
        .length,
    },
  ];

  const filteredProjects = residentialProjects.filter(
    (project) =>
      filter === "all" || project.style.toLowerCase().includes(filter)
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
            <div className="text-6xl mb-6">🏡</div>
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
              Residential Interior
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Creating personalized living spaces that reflect your style and
              enhance your daily life with comfort, elegance, and functionality.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-12 bg-blue-50">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <div className="text-3xl font-bold text-gray-900 mb-2">
                {residentialProjects.length}+
              </div>
              <div className="text-gray-600">Homes Transformed</div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <div className="text-3xl font-bold text-gray-900 mb-2">10+</div>
              <div className="text-gray-600">Years Experience</div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <div className="text-3xl font-bold text-gray-900 mb-2">7</div>
              <div className="text-gray-600">Design Awards</div>
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

      {/* Style Filters */}
      <section className="py-8 bg-white">
        <div className="container mx-auto px-6">
          <div className="flex flex-wrap gap-4 justify-center">
            {styleTypes.map((style) => (
              <button
                key={style.id}
                onClick={() => setFilter(style.id)}
                className={`px-6 py-3 rounded-full font-medium transition-all flex items-center ${
                  filter === style.id
                    ? "bg-blue-500 text-white shadow-lg"
                    : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                }`}
              >
                <FiHome className="mr-2" />
                {style.name} ({style.count})
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
              <ResidentialProjectCard
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
              Ready to Transform Your Home?
            </h2>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              Let's create a space that reflects your personality and enhances
              your everyday life with beautiful, functional design.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/contact-us"
                className="bg-blue-500 text-white px-8 py-4 rounded-lg font-semibold hover:bg-blue-600 transition-colors flex items-center justify-center"
              >
                Start Your Home Project
                <FiArrowRight className="ml-2" />
              </Link>
              <button className="border-2 border-gray-300 text-gray-700 px-8 py-4 rounded-lg font-semibold hover:border-blue-500 hover:text-blue-500 transition-colors">
                View Design Process
              </button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

const ResidentialProjectCard = ({ project, index }) => {
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
                ? "bg-blue-500 text-white"
                : "bg-white/90 text-gray-700"
            }`}
          >
            {project.featured ? "Featured" : project.style}
          </span>
        </div>

        <div className="absolute bottom-6 left-6 right-6 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <p className="text-sm line-clamp-2">{project.shortDescription}</p>
        </div>
      </div>

      <div className="p-8">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-2xl font-bold text-gray-900 group-hover:text-blue-500 transition-colors">
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
                  className="bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-sm"
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
              <span className="flex items-center text-blue-500 text-sm">
                <FiAward className="mr-1" />
                Awarded
              </span>
            )}
            <Link
              to={`/projects/${project.id}`}
              className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition-colors font-semibold flex items-center group/link"
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

export default ResidentialInteriorPage;
