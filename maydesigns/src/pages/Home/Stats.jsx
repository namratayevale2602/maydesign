import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { useStat } from "../../store/StatStore"; // Adjust path as needed

const Stats = () => {
  const { stats, loading, error, fetchStats, clearError } = useStat();

  // Fetch stats on component mount
  useEffect(() => {
    fetchStats();
  }, [fetchStats]);

  // Refresh data function
  const handleRefresh = () => {
    clearError();
    fetchStats(true);
  };

  if (error) {
    return (
      <section className="py-16 bg-cream-100">
        <div className="container mx-auto px-6 text-center">
          <div className="text-red-600 mb-4">Failed to load statistics</div>
          <button
            onClick={handleRefresh}
            className="px-6 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors"
          >
            Try Again
          </button>
        </div>
      </section>
    );
  }

  if (loading && stats.length === 0) {
    return (
      <section className="py-16 bg-cream-100">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[1, 2, 3, 4].map((item) => (
              <div key={item} className="text-center">
                <div className="h-12 bg-gray-300 rounded-lg mb-2 animate-pulse mx-auto w-24"></div>
                <div className="h-4 bg-gray-300 rounded animate-pulse mx-auto w-32"></div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (stats.length === 0) {
    return (
      <section className="py-16 bg-cream-100">
        <div className="container mx-auto px-6 text-center">
          <p className="text-gray-600">No statistics available</p>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 bg-cream-100">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="text-center"
            >
              <h3 className="text-4xl md:text-5xl font-bold text-burnt-orange mb-2">
                {stat.formatted_number || stat.number}
              </h3>
              <p className="text-gray-600 font-medium">{stat.label}</p>
            </motion.div>
          ))}
        </div>

        {/* Loading indicator for background refresh */}
        {loading && stats.length > 0 && (
          <div className="text-center mt-4">
            <div className="inline-flex items-center gap-2 text-gray-500 text-sm">
              <div className="w-4 h-4 border-2 border-orange-500 border-t-transparent rounded-full animate-spin" />
              Updating statistics...
            </div>
          </div>
        )}
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
