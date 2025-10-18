// components/CTASection.jsx
import React from "react";
import { motion } from "framer-motion";
import { fadeIn } from "./AboutUsPage";

const CTASection = () => {
  return (
    <section className="py-20 bg-burnt-orange">
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
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-white text-burnt-orange px-8 py-4 rounded-lg text-lg font-semibold transition-all duration-300 hover:bg-gray-50 shadow-lg"
            >
              Start Your Journey
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="border-2 border-white text-white px-8 py-4 rounded-lg text-lg font-semibold transition-all duration-300 hover:bg-white hover:text-burnt-orange"
            >
              View Our Work
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CTASection;
