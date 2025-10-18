// components/HeroSection.jsx
import React from "react";
import { motion } from "framer-motion";
import { fadeIn } from "./AboutUsPage";

const HeroSection = () => {
  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-burnt-orange/10 to-cream">
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1487958449943-2429e8be8625?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
          alt="Architectural Excellence"
          className="w-full h-full object-cover opacity-20"
        />
      </div>

      <motion.div
        variants={fadeIn("up", "spring", 0.5, 1)}
        className="relative text-center px-4 max-w-6xl"
      >
        <div className="mb-8">
          <div className="w-24 h-1 bg-burnt-orange mx-auto mb-6"></div>
          <h1 className="text-5xl md:text-7xl font-bold text-gray-800 mb-6 leading-tight">
            Crafting Spaces,
            <br />
            <span className="text-burnt-orange">Building Legacies</span>
          </h1>
        </div>
        <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
          15 years of architectural excellence, innovation, and sustainable
          design that transforms visions into reality
        </p>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="bg-burnt-orange text-white px-8 py-4 rounded-lg text-lg font-semibold transition-all duration-300 hover:bg-burnt-orange/90 shadow-lg hover:shadow-xl"
        >
          Explore Our Portfolio
        </motion.button>
      </motion.div>
    </section>
  );
};

export default HeroSection;
