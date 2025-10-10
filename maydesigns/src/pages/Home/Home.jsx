import React from "react";
import { motion } from "framer-motion";
import { FaArrowRight, FaStar, FaPlay } from "react-icons/fa";
import Services from "./Services";
import HeroSection from "./HeroSection";
import Testimonials from "./Testimonials";
import Stats from "./Stats";
import About from "./About";
import PublicationsPage from "./PublicationsPage";

// Sample data
const servicesData = [
  {
    id: 1,
    title: "Architectural Design",
    description:
      "Innovative architectural solutions that blend form and function seamlessly.",
    image:
      "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
    icon: "🏛️",
  },
  {
    id: 2,
    title: "Interior Design",
    description:
      "Creating beautiful, functional interiors that reflect your personality.",
    image:
      "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
    icon: "🛋️",
  },
  {
    id: 3,
    title: "Landscape Design",
    description:
      "Transforming outdoor spaces into beautiful, sustainable environments.",
    image:
      "https://images.unsplash.com/photo-1560717789-0ac7c58ac90a?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
    icon: "🌿",
  },
  {
    id: 4,
    title: "3D Visualization",
    description:
      "Bringing your vision to life with stunning 3D renderings and walkthroughs.",
    image:
      "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
    icon: "🎨",
  },
];

const testimonialsData = [
  {
    id: 1,
    name: "Sarah Johnson",
    position: "Homeowner",
    content:
      "MAY Designs transformed our outdated home into a modern masterpiece. Their attention to detail is exceptional!",
    rating: 5,
    image:
      "https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80",
  },
  {
    id: 2,
    name: "Michael Chen",
    position: "Business Owner",
    content:
      "The commercial space designed by MAY Designs has significantly improved our workflow and client impressions.",
    rating: 5,
    image:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80",
  },
  {
    id: 3,
    name: "Priya Sharma",
    position: "Real Estate Developer",
    content:
      "Working with MAY Designs was a game-changer for our residential project. Their innovative approach stands out.",
    rating: 5,
    image:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80",
  },
];

const statsData = [
  { number: "150+", label: "Projects Completed" },
  { number: "50+", label: "Happy Clients" },
  { number: "15+", label: "Years Experience" },
  { number: "25+", label: "Awards Won" },
];

const Home = () => {
  const scrollToSection = (sectionId) => {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-white">
      <HeroSection />
      <Stats />
      <About />
      <Services />
      <Testimonials />
      <PublicationsPage />
    </div>
  );
};

export default Home;
