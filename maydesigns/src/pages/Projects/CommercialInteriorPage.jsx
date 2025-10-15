import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  FiMapPin,
  FiCalendar,
  FiAward,
  FiArrowRight,
  FiBriefcase,
  FiUsers,
} from "react-icons/fi";
import { Link } from "react-router-dom";

const commercialProjects = [
  {
    id: 6,
    name: "Boutique Hotel Interior",
    type: "Commercial",
    category: "Hospitality",
    description:
      "Luxury boutique hotel with custom furniture, artisanal details, and locally inspired design elements throughout all public spaces and guest rooms.",
    shortDescription: "Luxury boutique hotel experience in urban setting",
    concept: "Local culture meets luxury hospitality",
    designPhilosophy:
      "Creating memorable guest experiences through authentic local storytelling and exceptional attention to detail in every space.",
    highlights: [
      "Custom artisanal furniture",
      "Local artwork curation",
      "Luxury material palette",
      "Signature scent branding",
      "Smart room controls",
      "Spa-like bathrooms",
      "Rooftop lounge",
    ],
    images: [
      "https://images.unsplash.com/photo-1566073771259-6a8506099945?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1611892440504-42a792e24d32?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1584132915806-f4d975f64e78?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
    ],
    location: "Miami, Florida",
    year: "2024",
    area: "45,000 sq ft",
    budget: "$4.2M",
    duration: "10 months",
    team: [
      { name: "Sophia Rodriguez", role: "Hospitality Design Director" },
      { name: "James Wilson", role: "FF&E Specialist" },
      { name: "Lisa Chen", role: "Lighting Designer" },
    ],
    awards: [
      {
        name: "Hospitality Design Award",
        organization: "American Hotel & Lodging Association",
        year: "2024",
      },
    ],
    featured: true,
    tags: ["Hospitality", "Luxury", "Boutique", "Hotel"],
  },
  {
    id: 7,
    name: "Tech Startup Office",
    type: "Commercial",
    category: "Office",
    description:
      "Collaborative workspace for innovative tech company featuring flexible work areas, breakout spaces, and advanced technology integration.",
    shortDescription: "Innovative tech workspace promoting collaboration",
    concept: "Collaboration-driven work environment",
    designPhilosophy:
      "Fostering innovation and teamwork through flexible, technology-enabled spaces that adapt to various work styles and needs.",
    highlights: [
      "Flexible work zones",
      "Advanced AV systems",
      "Collaborative lounges",
      "Phone booth pods",
      "Brand integration",
      "Game room",
      "Wellness rooms",
    ],
    images: [
      "https://images.unsplash.com/photo-1497366754035-f200968a6e72?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1497366216548-37526070297c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1541746972996-4e0b0f43e02a?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
    ],
    location: "San Francisco, CA",
    year: "2023",
    area: "25,000 sq ft",
    budget: "$3.5M",
    duration: "8 months",
    team: [
      { name: "Alex Thompson", role: "Workplace Strategist" },
      { name: "Nina Williams", role: "Technology Integrator" },
    ],
    awards: [
      {
        name: "Innovative Workplace Award",
        organization: "CoreNet Global",
        year: "2023",
      },
    ],
    featured: true,
    tags: ["Office", "Tech", "Collaborative", "Innovation"],
  },
  {
    id: 8,
    name: "Fine Dining Restaurant",
    type: "Commercial",
    category: "Restaurant",
    description:
      "Elegant fine dining establishment with custom millwork, sophisticated lighting, and immersive culinary experience design.",
    shortDescription: "Sophisticated fine dining experience",
    concept: "Culinary theater meets intimate dining",
    designPhilosophy:
      "Creating an immersive dining experience where every design element enhances the culinary journey and creates memorable moments.",
    highlights: [
      "Custom millwork bar",
      "Chef's table experience",
      "Wine display walls",
      "Acoustic optimization",
      "Dramatic lighting",
      "Open kitchen design",
      "Private dining rooms",
    ],
    images: [
      "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1559329007-40df8a9345d8?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1428515613728-6b4607eeb63e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
    ],
    location: "Chicago, Illinois",
    year: "2024",
    area: "8,500 sq ft",
    budget: "$2.1M",
    duration: "6 months",
    team: [
      { name: "Michael Brown", role: "Restaurant Design Specialist" },
      { name: "Sarah Johnson", role: "Lighting Designer" },
    ],
    tags: ["Restaurant", "Fine Dining", "Hospitality", "Luxury"],
  },
  {
    id: 9,
    name: "Medical Clinic Interior",
    type: "Commercial",
    category: "Healthcare",
    description:
      "Modern healthcare facility designed for patient comfort and staff efficiency with calming environments and advanced medical technology integration.",
    shortDescription: "Healing-centered healthcare environment",
    concept: "Patient-centered healing environments",
    designPhilosophy:
      "Creating healthcare spaces that reduce stress, promote healing, and support both patient comfort and clinical efficiency.",
    highlights: [
      "Calming color palette",
      "Natural light optimization",
      "Wayfinding systems",
      "Infection control materials",
      "Staff workflow optimization",
      "Patient privacy features",
      "Family waiting areas",
    ],
    images: [
      "https://images.unsplash.com/photo-1516549655669-df5c66f6a313?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1586773860418-d37222d8fce3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
    ],
    location: "Seattle, Washington",
    year: "2023",
    area: "15,000 sq ft",
    budget: "$2.8M",
    duration: "7 months",
    team: [
      { name: "Dr. Maria Garcia", role: "Healthcare Design Consultant" },
      { name: "David Kim", role: "Medical Planner" },
    ],
    awards: [
      {
        name: "Healthcare Design Excellence",
        organization: "The Center for Health Design",
        year: "2023",
      },
    ],
    tags: ["Healthcare", "Medical", "Wellness", "Clinical"],
  },
  {
    id: 10,
    name: "Retail Flagship Store",
    type: "Commercial",
    category: "Retail",
    description:
      "Brand flagship store with immersive retail experience, digital integration, and flexible space for events and customer engagement.",
    shortDescription: "Immersive brand retail experience",
    concept: "Retail as brand experience destination",
    designPhilosophy:
      "Transforming retail spaces into brand destinations that tell stories, create connections, and offer memorable customer experiences.",
    highlights: [
      "Digital integration walls",
      "Flexible event space",
      "Custom display systems",
      "Interactive fitting rooms",
      "Brand storytelling elements",
      "Customer journey optimization",
      "Sustainable materials",
    ],
    images: [
      "https://images.unsplash.com/photo-1441986300917-64674bd600d8?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1563013546-7eab6c8a2afc?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
    ],
    location: "Los Angeles, California",
    year: "2024",
    area: "12,000 sq ft",
    budget: "$3.2M",
    duration: "9 months",
    team: [
      { name: "Jessica Wong", role: "Retail Design Director" },
      { name: "Kevin Martinez", role: "Brand Experience Specialist" },
    ],
    tags: ["Retail", "Brand", "Flagship", "Experience"],
  },
];

const CommercialInteriorPage = () => {
  const [filter, setFilter] = useState("all");

  const categoryTypes = [
    { id: "all", name: "All Categories", count: commercialProjects.length },
    {
      id: "hospitality",
      name: "Hospitality",
      count: commercialProjects.filter((p) => p.category === "Hospitality")
        .length,
    },
    {
      id: "office",
      name: "Office",
      count: commercialProjects.filter((p) => p.category === "Office").length,
    },
    {
      id: "restaurant",
      name: "Restaurant",
      count: commercialProjects.filter((p) => p.category === "Restaurant")
        .length,
    },
    {
      id: "healthcare",
      name: "Healthcare",
      count: commercialProjects.filter((p) => p.category === "Healthcare")
        .length,
    },
    {
      id: "retail",
      name: "Retail",
      count: commercialProjects.filter((p) => p.category === "Retail").length,
    },
  ];

  const filteredProjects = commercialProjects.filter(
    (project) => filter === "all" || project.category.toLowerCase() === filter
  );

  return (
    <div className="min-h-screen pt-20">
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
      {/* Header */}
      <section className="bg-white py-20">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
              Commercial Interior
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Designing functional and inspiring commercial spaces that enhance
              productivity, brand identity, customer experience, and business
              success.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-12 bg-orange-50">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <div className="text-3xl font-bold text-gray-900 mb-2">
                {commercialProjects.length}+
              </div>
              <div className="text-gray-600">Commercial Projects</div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <div className="text-3xl font-bold text-gray-900 mb-2">12+</div>
              <div className="text-gray-600">Industries Served</div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <div className="text-3xl font-bold text-gray-900 mb-2">9</div>
              <div className="text-gray-600">Business Awards</div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              <div className="text-3xl font-bold text-gray-900 mb-2">100%</div>
              <div className="text-gray-600">Client ROI Focus</div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Category Filters */}
      <section className="py-8 bg-white">
        <div className="container mx-auto px-6">
          <div className="flex flex-wrap gap-4 justify-center">
            {categoryTypes.map((category) => (
              <button
                key={category.id}
                onClick={() => setFilter(category.id)}
                className={`px-6 py-3 rounded-full font-medium transition-all flex items-center ${
                  filter === category.id
                    ? "bg-burnt-orange text-white shadow-lg"
                    : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                }`}
              >
                <FiBriefcase className="mr-2" />
                {category.name} ({category.count})
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
              <CommercialProjectCard
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
              Ready to Elevate Your Business Space?
            </h2>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              Let's create a commercial interior that enhances your brand,
              impresses your clients, and supports your business growth.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/contact-us"
                className="bg-burnt-orange text-white px-8 py-4 rounded-lg font-semibold hover:bg-indigo-600 transition-colors flex items-center justify-center"
              >
                Start Your Commercial Project
                <FiArrowRight className="ml-2" />
              </Link>
              <button className="border-2 border-gray-300 text-gray-700 px-8 py-4 rounded-lg font-semibold hover:border-burnt-orange hover:text-burnt-orange transition-colors">
                View Business Benefits
              </button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

const CommercialProjectCard = ({ project, index }) => {
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
                ? "bg-burnt-orange text-white"
                : "bg-white/90 text-gray-700"
            }`}
          >
            {project.featured ? "Featured" : project.category}
          </span>
        </div>

        <div className="absolute bottom-6 left-6 right-6 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <p className="text-sm line-clamp-2">{project.shortDescription}</p>
        </div>
      </div>

      <div className="p-8">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-2xl font-bold text-gray-900 group-hover:text-burnt-orange transition-colors">
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
              Business Concept:
            </h4>
            <p className="text-gray-600 text-sm">{project.concept}</p>
          </div>

          <div>
            <h4 className="font-semibold text-gray-900 mb-2">Key Features:</h4>
            <div className="flex flex-wrap gap-2">
              {project.highlights.slice(0, 4).map((highlight, idx) => (
                <span
                  key={idx}
                  className="bg-orange-50 text-burnt-orange px-3 py-1 rounded-full text-sm"
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
              <span className="flex items-center text-burnt-orange text-sm">
                <FiAward className="mr-1" />
                Awarded
              </span>
            )}
            <Link
              to={`/projects/${project.id}`}
              className="bg-burnt-orange text-white px-6 py-2 rounded-lg hover:bg-indigo-600 transition-colors font-semibold flex items-center group/link"
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

export default CommercialInteriorPage;
