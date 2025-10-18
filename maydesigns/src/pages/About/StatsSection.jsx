// components/StatsSection.jsx
import React, { forwardRef, useEffect } from "react";
import { motion } from "framer-motion";
import CountUp from "react-countup";
import { Building, Award, Calendar, MapPin } from "lucide-react";
import { zoomIn } from "./AboutUsPage";
import { useStat } from "../../store/StatStore";

// Icon mapping for dynamic icons
const iconMap = {
  Building,
  Award,
  Calendar,
  MapPin,
  // Add more icons as needed
};

const StatsSection = forwardRef(({ isVisible }, ref) => {
  const { stats, loading, error, fetchStats, isEmpty } = useStat();

  // Fetch stats when component mounts
  useEffect(() => {
    if (isEmpty) {
      fetchStats();
    }
  }, [isEmpty, fetchStats]);

  // Default stats in case API data is not available
  const defaultStats = [
    { number: 150, suffix: "+", label: "Projects Completed", icon: "Building" },
    { number: 25, suffix: "+", label: "Awards Won", icon: "Award" },
    { number: 15, suffix: "+", label: "Years Experience", icon: "Calendar" },
    { number: 8, suffix: "", label: "Countries Served", icon: "MapPin" },
  ];

  // Use API data if available, otherwise use defaults
  const displayStats = stats.length > 0 ? stats : defaultStats;

  // Loading state
  if (loading && stats.length === 0) {
    return (
      <section ref={ref} className="py-20 bg-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {[1, 2, 3, 4].map((item) => (
              <div key={item} className="text-center">
                <div className="bg-white rounded-2xl p-8 shadow-lg border border-cream">
                  <div className="bg-gray-200 w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-6 animate-pulse">
                    <div className="w-10 h-10 bg-gray-300 rounded-full"></div>
                  </div>
                  <div className="h-8 bg-gray-200 rounded mb-2 animate-pulse"></div>
                  <div className="h-6 bg-gray-200 rounded animate-pulse"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section ref={ref} className="py-20 bg-cream">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Error Message */}
        {error && (
          <div className="text-center mb-8 p-4 bg-red-50 border border-red-200 rounded-lg max-w-md mx-auto">
            <p className="text-red-600 text-sm">
              Failed to load statistics: {error}
            </p>
            <button
              onClick={fetchStats}
              className="mt-2 px-4 py-2 bg-red-600 text-white rounded-lg text-sm hover:bg-red-700 transition-colors"
            >
              Retry
            </button>
          </div>
        )}

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {displayStats.map((stat, index) => {
            // Get the icon component from the mapping
            const IconComponent = iconMap[stat.icon] || Building;

            return (
              <motion.div
                key={stat.id || index}
                variants={zoomIn(index * 0.2, 1)}
                className="text-center group"
              >
                <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-500 transform hover:-translate-y-2 border border-cream">
                  {/* Icon */}
                  <div className="bg-burnt-orange/10 w-20 h-20 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                    <IconComponent className="text-burnt-orange text-3xl" />
                  </div>

                  {/* Number with CountUp */}
                  <div className="text-4xl font-bold text-gray-800 mb-2">
                    {isVisible && (
                      <CountUp
                        end={stat.number || stat.value || 0}
                        suffix={stat.suffix || ""}
                        duration={3}
                        separator=","
                        className="text-burnt-orange"
                      />
                    )}
                    {!isVisible && (
                      <span className="text-burnt-orange">
                        {stat.number || stat.value || 0}
                        {stat.suffix || ""}
                      </span>
                    )}
                  </div>

                  {/* Label */}
                  <div className="text-gray-600 font-semibold text-lg">
                    {stat.label || stat.title || "Statistic"}
                  </div>

                  {/* Optional Description */}
                  {stat.description && (
                    <p className="text-gray-500 text-sm mt-2">
                      {stat.description}
                    </p>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
});

StatsSection.displayName = "StatsSection";

export default StatsSection;
