import React from "react";
import { motion } from "framer-motion";

const Stats = () => {
  const statsData = [
    {
      number: "150+",
      label: "Projects Completed",
    },
    {
      number: "15+",
      label: "Years Experience",
    },
    {
      number: "50+",
      label: "Happy Clients",
    },
    {
      number: "12+",
      label: "Awards Won",
    },
  ];

  return (
    <section className="py-16 bg-cream-100">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {statsData.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="text-center"
            >
              <h3 className="text-4xl md:text-5xl font-bold text-burnt-orange mb-2">
                {stat.number}
              </h3>
              <p className="text-gray-600 font-medium">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </div>

      <style jsx>{`
        .bg-cream-100 {
          background-color: #fdf6f0;
        }
        .text-burnt-orange {
          color: #be5103;
        }
      `}</style>
    </section>
  );
};

export default Stats;
