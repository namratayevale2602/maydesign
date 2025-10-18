// components/MissionVisionSection.jsx
import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { Target, Eye } from "lucide-react";
import { fadeIn } from "./AboutUsPage";
import {
  useMissionVision,
  useFetchMissionVision,
  useAboutUsLoading,
  useAboutUsError,
} from "../../store/useAboutUsStore";

const MissionVisionSection = () => {
  const missionVision = useMissionVision();
  const fetchMissionVision = useFetchMissionVision();
  const loading = useAboutUsLoading();
  const error = useAboutUsError();

  useEffect(() => {
    if (!missionVision) {
      fetchMissionVision();
    }
  }, [missionVision, fetchMissionVision]);

  if (loading && !missionVision) {
    return (
      <section className="py-20 bg-burnt-orange text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">Loading mission and vision...</div>
        </div>
      </section>
    );
  }

  if (error && !missionVision) {
    return (
      <section className="py-20 bg-burnt-orange text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center text-red-200">Error: {error}</div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 bg-burnt-orange text-white" id="vision">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <motion.div
            variants={fadeIn("right", "spring", 0.3, 1)}
            className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20"
          >
            <div className="flex items-center mb-6">
              <div className="bg-white/20 p-3 rounded-2xl mr-4">
                <Target className="text-white" size={32} />
              </div>
              <h3 className="text-3xl font-bold">Our Mission</h3>
            </div>
            <p className="text-lg leading-relaxed text-white/90">
              {missionVision?.mission ||
                "To create innovative, sustainable, and human-centric architectural solutions that enhance the quality of life while respecting the environment."}
            </p>
          </motion.div>

          <motion.div
            variants={fadeIn("left", "spring", 0.3, 1)}
            className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20"
          >
            <div className="flex items-center mb-6">
              <div className="bg-white/20 p-3 rounded-2xl mr-4">
                <Eye className="text-white" size={32} />
              </div>
              <h3 className="text-3xl font-bold">Our Vision</h3>
            </div>
            <p className="text-lg leading-relaxed text-white/90">
              {missionVision?.vision ||
                "To be the world's most innovative architecture firm, recognized for transforming urban landscapes through sustainable practices and cutting-edge design."}
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default MissionVisionSection;
