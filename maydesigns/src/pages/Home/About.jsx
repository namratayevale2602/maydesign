import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const About = () => {
  return (
    <section id="about" className="py-20 bg-white">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
              About <span className="text-burnt-orange">MAY Designs</span>
            </h2>
            <p className="text-lg text-gray-600 mb-6 leading-relaxed">
              With over 15 years of experience in the architecture and design
              industry, MAY Designs has established itself as a leader in
              creating innovative spaces that inspire and transform lives.
            </p>
            <p className="text-lg text-gray-600 mb-6 leading-relaxed">
              Our team of passionate designers and architects work closely with
              clients to understand their vision and bring it to life through
              meticulous planning, creative solutions, and exceptional
              craftsmanship that stands the test of time.
            </p>
            <p className="text-lg text-gray-600 mb-8 leading-relaxed">
              We believe that great design is not just about aesthetics, but
              about creating functional, sustainable spaces that enhance the way
              people live and work.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/about-us">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-burnt-orange text-white px-8 py-4 rounded-lg font-semibold hover:bg-burnt-orange/90 transition-colors shadow-sm"
                >
                  Our Story
                </motion.button>
              </Link>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="border-2 border-burnt-orange text-burnt-orange px-8 py-4 rounded-lg font-semibold hover:bg-burnt-orange/5 transition-colors"
              >
                Meet Our Team
              </motion.button>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <img
              src="https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
              alt="MAY Designs Team"
              className="rounded-2xl shadow-lg"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="absolute -bottom-6 -left-6 bg-burnt-orange text-white p-6 rounded-xl shadow-lg"
            >
              <h3 className="text-2xl font-bold mb-1">15+ Years</h3>
              <p className="text-orange-100 font-medium">Of Excellence</p>
            </motion.div>

            {/* Additional floating element */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="absolute -top-6 -right-6 bg-white p-4 rounded-xl shadow-lg border border-cream-200"
            >
              <div className="text-center">
                <div className="text-2xl font-bold text-burnt-orange mb-1">
                  150+
                </div>
                <div className="text-sm text-gray-600 font-medium">
                  Projects
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
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
        .border-cream-200 {
          border-color: #fae8d8;
        }
      `}</style>
    </section>
  );
};

export default About;
