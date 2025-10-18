// components/ValuesSection.jsx
import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { Leaf, Lightbulb, HeartHandshake, Target } from "lucide-react";
import { fadeIn } from "./AboutUsPage";
import {
  useValues,
  useFetchValues,
  useAboutUsLoading,
  useAboutUsError,
} from "../../store/useAboutUsStore";

const iconMap = {
  Leaf,
  Lightbulb,
  HeartHandshake,
  Target,
};

const ValuesSection = () => {
  const values = useValues();
  const fetchValues = useFetchValues();
  const loading = useAboutUsLoading();
  const error = useAboutUsError();

  useEffect(() => {
    if (values.length === 0) {
      fetchValues();
    }
  }, [values, fetchValues]);

  if (loading && values.length === 0) {
    return (
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">Loading values...</div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={fadeIn("up", "spring", 0.3, 1)}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
            Our Core Values
          </h2>
          <div className="w-24 h-1 bg-burnt-orange mx-auto mb-6"></div>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            The principles that guide every decision we make and every design we
            create
          </p>
        </motion.div>

        {error && values.length === 0 && (
          <div className="text-center text-red-600 mb-8">
            Error loading values: {error}
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {values.map((value, index) => {
            const IconComponent = iconMap[value.icon] || Target;

            return (
              <motion.div
                key={value.id || index}
                variants={fadeIn("up", "spring", index * 0.2, 1)}
                whileHover={{ y: -10 }}
                className="group"
              >
                <div className="bg-cream rounded-2xl p-8 h-full transform transition-all duration-300 group-hover:scale-105 shadow-lg group-hover:shadow-xl border border-cream hover:border-burnt-orange/20">
                  <div className="bg-burnt-orange/10 w-16 h-16 rounded-2xl flex items-center justify-center mb-6 group-hover:rotate-12 transition-transform">
                    <IconComponent className="text-burnt-orange text-2xl" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-800 mb-4">
                    {value.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {value.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>

        {values.length === 0 && !loading && (
          <div className="text-center text-gray-600">No values found.</div>
        )}
      </div>
    </section>
  );
};

export default ValuesSection;
