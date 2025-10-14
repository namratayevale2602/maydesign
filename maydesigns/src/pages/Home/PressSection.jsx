import React, { useState } from "react";
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

const PressSection = () => {
  const [selectedPress, setSelectedPress] = useState(null);
  const [activeTab, setActiveTab] = useState("article");

  const pressData = [
    {
      id: 1,
      publication: "Architectural Digest",
      title: "Redefining Modern Luxury: The MAY Designs Approach",
      date: "March 2024",
      excerpt:
        "An exclusive feature on how MAY Designs is transforming the landscape of luxury residential architecture with innovative sustainable practices.",
      image:
        "https://images.unsplash.com/photo-1589994965851-a8f479c573a9?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
      category: "Feature",
      link: "#",
      featured: true,
      details: {
        fullArticle: `
          <p>In an era where luxury and sustainability were once considered mutually exclusive, MAY Designs has emerged as a pioneering force that seamlessly blends opulence with environmental responsibility. Their latest residential project, "The Canopy Residence," stands as a testament to this philosophy.</p>
          
          <h3>Sustainable Opulence</h3>
          <p>The 15,000-square-foot residence incorporates geothermal heating, rainwater harvesting systems, and locally sourced materials without compromising on the luxurious experience. "We believe true luxury lies in spaces that are both beautiful and responsible," says lead architect Maria Rodriguez.</p>
          
          <h3>Innovative Material Use</h3>
          <p>The project features reclaimed teak flooring, recycled glass countertops, and a revolutionary carbon-sequestering concrete that actually removes CO2 from the atmosphere. These materials are combined with smart home technology that optimizes energy usage based on occupancy patterns.</p>
          
          <h3>Community Impact</h3>
          <p>Beyond the individual residence, MAY Designs has implemented community gardens and shared green spaces that extend the project's sustainable impact to the surrounding neighborhood.</p>
        `,
        publicationDetails: {
          website: "www.architecturaldigest.com",
          circulation: "850,000+",
          audience: "Luxury Design Enthusiasts",
          founded: "1920",
        },
        keyQuotes: [
          "MAY Designs is redefining what luxury means in the 21st century.",
          "The seamless integration of technology and nature sets a new standard for residential architecture.",
          "This approach proves that sustainability can enhance rather than limit design possibilities.",
        ],
        projectTeam: [
          "Lead Architect: Maria Rodriguez",
          "Sustainability Consultant: Dr. James Chen",
          "Interior Designer: Sarah Yamamoto",
          "Landscape Architect: Robert Kim",
        ],
        additionalImages: [
          "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
          "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
          "https://images.unsplash.com/photo-1600607687644-c7171b42498b?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
        ],
        videoInterview: "https://player.vimeo.com/video/76979871?h=8272103f6e",
      },
    },
    {
      id: 2,
      publication: "Dezeen",
      title: "Urban Regeneration Projects That Are Changing Cityscapes",
      date: "February 2024",
      excerpt:
        "MAY Designs featured among top architecture firms leading urban regeneration initiatives worldwide.",
      image:
        "https://images.unsplash.com/photo-1487958449943-2429e8be8625?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
      category: "Cover Story",
      link: "#",
      featured: false,
      details: {
        fullArticle: `
          <p>MAY Designs has been recognized as one of the leading firms transforming urban landscapes through innovative regeneration projects. Their "Riverfront Revival" initiative in downtown Chicago has become a benchmark for sustainable urban development.</p>
          
          <h3>Community-Centered Approach</h3>
          <p>The project transformed 50 acres of industrial wasteland into a vibrant mixed-use community featuring affordable housing, commercial spaces, and extensive public parks. "We engaged with over 2,000 local residents during the planning phase," explains urban designer Michael Chen.</p>
          
          <h3>Sustainable Infrastructure</h3>
          <p>The development incorporates green roofs, permeable paving, and an advanced stormwater management system that has reduced runoff by 80% compared to conventional developments.</p>
          
          <h3>Economic Impact</h3>
          <p>Since completion, the area has seen a 45% increase in local business revenue and created over 1,200 permanent jobs, demonstrating the economic viability of sustainable urban regeneration.</p>
        `,
        publicationDetails: {
          website: "www.dezeen.com",
          circulation: "2.5M Monthly Readers",
          audience: "Architecture Professionals",
          founded: "2006",
        },
        keyQuotes: [
          "MAY Designs demonstrates how urban regeneration can be both beautiful and functional.",
          "Their community engagement process sets a new standard for inclusive urban planning.",
          "This project proves that sustainable development can drive economic growth.",
        ],
        projectTeam: [
          "Urban Designer: Michael Chen",
          "Community Liaison: Elena Martinez",
          "Environmental Engineer: Dr. Amanda Wilson",
          "Project Manager: David Brown",
        ],
        additionalImages: [
          "https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
          "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
          "https://images.unsplash.com/photo-1486325212027-8081e485255e?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
        ],
        videoInterview: "https://player.vimeo.com/video/76979871?h=8272103f6e",
      },
    },
    {
      id: 3,
      publication: "Wallpaper*",
      title: "The Future of Sustainable Architecture: 10 Innovators to Watch",
      date: "January 2024",
      excerpt:
        "Recognized as one of the top 10 architectural innovators shaping the future of sustainable design.",
      image:
        "https://images.unsplash.com/photo-1497366754035-f200968a6e72?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
      category: "Feature",
      link: "#",
      featured: false,
      details: {
        fullArticle: `
          <p>Wallpaper* has named MAY Designs among its annual list of 10 architectural innovators who are redefining sustainable design. The recognition comes after the firm's groundbreaking work on the "Zero-Carbon Campus" project.</p>
          
          <h3>Carbon-Neutral Achievement</h3>
          <p>The campus not only achieves net-zero carbon emissions but actually generates 120% of its energy needs through integrated solar panels and wind turbines. Excess energy is returned to the local grid, making it a net-positive energy project.</p>
          
          <h3>Biophilic Integration</h3>
          <p>Every workspace features direct access to natural light, living walls, and indoor gardens that improve air quality and employee wellbeing. Studies conducted post-occupancy show a 30% increase in productivity and a 25% reduction in sick days.</p>
          
          <h3>Circular Economy Principles</h3>
          <p>The project implements circular economy principles, with 95% of construction waste being recycled or repurposed, and all materials selected for their potential for future reuse or recycling.</p>
        `,
        publicationDetails: {
          website: "www.wallpaper.com",
          circulation: "1.2M Global Readers",
          audience: "Design Connoisseurs",
          founded: "1996",
        },
        keyQuotes: [
          "MAY Designs represents the vanguard of sustainable architectural practice.",
          "Their work demonstrates that environmental responsibility and design excellence are not mutually exclusive.",
          "This firm is setting the standard for the next generation of architects.",
        ],
        projectTeam: [
          "Project Lead: Sarah Johnson",
          "Sustainability Director: Thomas Reed",
          "Energy Consultant: GreenTech Solutions",
          "Structural Engineer: Robert Wilson",
        ],
        additionalImages: [
          "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
          "https://images.unsplash.com/photo-1516937941344-00b4e0337589?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
          "https://images.unsplash.com/photo-1487958449943-2429e8be8625?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
        ],
        videoInterview: "https://player.vimeo.com/video/76979871?h=8272103f6e",
      },
    },
    {
      id: 4,
      publication: "The Architectural Review",
      title: "Material Innovation in Contemporary Architecture",
      date: "December 2023",
      excerpt:
        "Deep dive into MAY Designs' pioneering use of sustainable materials in commercial projects.",
      image:
        "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
      category: "Interview",
      link: "#",
      featured: false,
      details: {
        fullArticle: `
          <p>The Architectural Review features an in-depth interview with MAY Designs' material innovation team, exploring their revolutionary approach to sustainable material selection and development.</p>
          
          <h3>Bio-Based Composites</h3>
          <p>The firm has developed a proprietary bio-composite material made from agricultural waste and mycelium that outperforms traditional concrete in compression strength while being completely biodegradable.</p>
          
          <h3>Local Material Sourcing</h3>
          <p>MAY Designs prioritizes locally sourced materials, reducing transportation emissions by up to 75% while supporting regional economies. Their "100-mile material policy" ensures that at least 80% of materials come from within 100 miles of the construction site.</p>
          
          <h3>Lifecycle Analysis</h3>
          <p>Every material undergoes rigorous lifecycle analysis, considering not just initial environmental impact but also maintenance requirements, durability, and end-of-life recyclability.</p>
        `,
        publicationDetails: {
          website: "www.architectural-review.com",
          circulation: "45,000 Professionals",
          audience: "Architecture Industry",
          founded: "1896",
        },
        keyQuotes: [
          "MAY Designs' material research is pushing the boundaries of what's possible in sustainable construction.",
          "Their commitment to local sourcing demonstrates a holistic approach to sustainability.",
          "This firm understands that true innovation happens at the material level.",
        ],
        projectTeam: [
          "Material Specialist: Dr. Lisa Brown",
          "Research Lead: Alex Thompson",
          "Supply Chain Manager: Maria Garcia",
          "Testing Coordinator: James Wilson",
        ],
        additionalImages: [
          "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
          "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
          "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
        ],
        videoInterview: "https://player.vimeo.com/video/76979871?h=8272103f6e",
      },
    },
    {
      id: 5,
      publication: "Domus",
      title: "Cultural Architecture: Blending Tradition with Modernity",
      date: "November 2023",
      excerpt:
        "Exploring how MAY Designs integrates cultural elements into contemporary architectural expressions.",
      image:
        "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
      category: "Feature",
      link: "#",
      featured: false,
      details: {
        fullArticle: `
          <p>Domus magazine explores MAY Designs' sensitive approach to cultural architecture through their award-winning "Heritage Center" project in Kyoto, Japan.</p>
          
          <h3>Cultural Sensitivity</h3>
          <p>The design team spent six months living in the local community, studying traditional building techniques and understanding cultural significance before beginning the design process.</p>
          
          <h3>Modern Interpretation</h3>
          <p>Traditional Japanese architectural elements like engawa (verandas) and shōji screens are reinterpreted using modern materials and construction techniques, creating a dialogue between past and present.</p>
          
          <h3>Sustainable Preservation</h3>
          <p>The project incorporates earthquake-resistant technology and sustainable climate control systems that preserve the building's historical integrity while ensuring its longevity and reduced environmental impact.</p>
        `,
        publicationDetails: {
          website: "www.domusweb.it",
          circulation: "50,000 International",
          audience: "Architecture Critics",
          founded: "1928",
        },
        keyQuotes: [
          "MAY Designs demonstrates remarkable sensitivity in their cultural architecture work.",
          "This project shows how modernity can enhance rather than erase cultural identity.",
          "Their approach to cultural preservation sets a new standard for international architecture.",
        ],
        projectTeam: [
          "Cultural Consultant: Kenji Tanaka",
          "Lead Architect: Sophie Williams",
          "Historical Preservation: Dr. Yuki Nakamura",
          "Local Crafts Coordinator: Hiroshi Sato",
        ],
        additionalImages: [
          "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
          "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
          "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
        ],
        videoInterview: "https://player.vimeo.com/video/76979871?h=8272103f6e",
      },
    },
    {
      id: 6,
      publication: "Frame Magazine",
      title: "Interior Architecture: Creating Emotional Spaces",
      date: "October 2023",
      excerpt:
        "Featured for innovative interior architecture that creates emotional connections with spaces.",
      image:
        "https://images.unsplash.com/photo-1613977257363-707ba9348227?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
      category: "Profile",
      link: "#",
      featured: false,
      details: {
        fullArticle: `
          <p>Frame Magazine profiles MAY Designs' unique approach to interior architecture that prioritizes emotional experience and psychological wellbeing.</p>
          
          <h3>Emotional Mapping</h3>
          <p>The firm uses advanced emotional mapping techniques to understand how different spatial configurations, lighting conditions, and material textures affect occupant mood and behavior.</p>
          
          <h3>Sensory Design</h3>
          <p>Projects incorporate multi-sensory elements including carefully curated acoustics, scent diffusion systems, and tactile material experiences that create rich, immersive environments.</p>
          
          <h3>Adaptive Spaces</h3>
          <p>Interiors are designed to be adaptable, with movable partitions and flexible furniture systems that allow spaces to evolve based on changing needs and moods.</p>
        `,
        publicationDetails: {
          website: "www.frameweb.com",
          circulation: "35,000 Design Professionals",
          audience: "Interior Design Community",
          founded: "1997",
        },
        keyQuotes: [
          "MAY Designs understands that great interiors are experienced emotionally, not just visually.",
          "Their sensory approach to design creates spaces that truly resonate with occupants.",
          "This firm is pioneering a new language of emotional architecture.",
        ],
        projectTeam: [
          "Interior Architect: Elena Rodriguez",
          "Psychology Consultant: Dr. Amanda Green",
          "Lighting Designer: Michael Chen",
          "Acoustic Specialist: Robert Kim",
        ],
        additionalImages: [
          "https://images.unsplash.com/photo-1613977257363-707ba9348227?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
          "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
          "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
        ],
        videoInterview: "https://player.vimeo.com/video/76979871?h=8272103f6e",
      },
    },
  ];

  const openModal = (pressItem) => {
    setSelectedPress(pressItem);
    setActiveTab("article");
    document.body.style.overflow = "hidden";
  };

  const closeModal = () => {
    setSelectedPress(null);
    document.body.style.overflow = "auto";
  };

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
          {pressData
            .filter((item) => item.featured)
            .map((item) => (
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
                        <button className="text-burnt-orange font-medium flex items-center group/btn hover:text-burnt-orange/80 transition-colors">
                          Read Article
                          <FaExternalLinkAlt className="ml-2 text-sm group-hover/btn:translate-x-1 transition-transform duration-300" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}

          {/* Regular Press Items */}
          {pressData
            .filter((item) => !item.featured)
            .map((item, index) => (
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
                      <button className="text-burnt-orange text-sm font-medium flex items-center group/btn hover:text-burnt-orange/80 transition-colors">
                        Read More
                        <FaExternalLinkAlt className="ml-2 text-xs group-hover/btn:translate-x-1 transition-transform duration-300" />
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
        </div>

        {/* Press Details Modal */}
        <AnimatePresence>
          {selectedPress && (
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
                            __html: selectedPress.details.fullArticle,
                          }}
                        />
                        <div className="border-t pt-6">
                          <h4 className="font-semibold text-gray-900 mb-3">
                            Project Team
                          </h4>
                          <ul className="text-gray-600 space-y-2">
                            {selectedPress.details.projectTeam.map(
                              (member, index) => (
                                <li key={index}>• {member}</li>
                              )
                            )}
                          </ul>
                        </div>
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
                                {
                                  selectedPress.details.publicationDetails
                                    .website
                                }
                              </p>
                              <p>
                                <strong>Circulation:</strong>{" "}
                                {
                                  selectedPress.details.publicationDetails
                                    .circulation
                                }
                              </p>
                              <p>
                                <strong>Primary Audience:</strong>{" "}
                                {
                                  selectedPress.details.publicationDetails
                                    .audience
                                }
                              </p>
                              <p>
                                <strong>Founded:</strong>{" "}
                                {
                                  selectedPress.details.publicationDetails
                                    .founded
                                }
                              </p>
                            </div>
                          </div>
                          <div>
                            <h4 className="font-semibold text-gray-900 mb-2">
                              About the Publication
                            </h4>
                            <p className="text-gray-600 leading-relaxed">
                              {selectedPress.publication} is a leading voice in
                              the architecture and design community, known for
                              its critical analysis and coverage of innovative
                              projects worldwide.
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
                        {selectedPress.details.keyQuotes.map((quote, index) => (
                          <div
                            key={index}
                            className="bg-gray-50 p-4 rounded-lg border-l-4 border-burnt-orange"
                          >
                            <FaQuoteLeft className="text-burnt-orange mb-2" />
                            <p className="text-gray-700 italic">"{quote}"</p>
                          </div>
                        ))}
                      </div>
                    )}

                    {activeTab === "gallery" && (
                      <div className="space-y-6">
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

                        {selectedPress.details.videoInterview && (
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

export default PressSection;
