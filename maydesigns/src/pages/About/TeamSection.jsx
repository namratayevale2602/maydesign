// components/TeamSection.jsx
import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { fadeIn } from "./AboutUsPage";
import {
  useTeam,
  useFetchTeam,
  useAboutUsLoading,
  useAboutUsError,
} from "../../store/useAboutUsStore";

const TeamSection = () => {
  const team = useTeam();
  const fetchTeam = useFetchTeam();
  const loading = useAboutUsLoading();
  const error = useAboutUsError();

  useEffect(() => {
    if (team.length === 0) {
      fetchTeam();
    }
  }, [team, fetchTeam]);

  if (loading && team.length === 0) {
    return (
      <section className="py-20 bg-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">Loading team data...</div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 bg-cream" id="team">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={fadeIn("up", "spring", 0.3, 1)}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
            Meet Our Architects
          </h2>
          <div className="w-24 h-1 bg-burnt-orange mx-auto mb-6"></div>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Our diverse team of architects, designers, and visionaries brings
            together decades of experience and a shared passion for creating
            extraordinary spaces.
          </p>
        </motion.div>

        {error && team.length === 0 && (
          <div className="text-center text-red-600 mb-8">
            Error loading team: {error}
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {team.map((member, index) => (
            <motion.div
              key={member.id || index}
              variants={fadeIn("up", "spring", index * 0.2, 1)}
              whileHover={{ y: -10 }}
              className="group"
            >
              <div className="bg-white rounded-2xl shadow-lg overflow-hidden transition-all duration-300 group-hover:shadow-xl border border-cream">
                <div className="h-80 overflow-hidden relative">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-800 mb-2">
                    {member.name}
                  </h3>
                  <p className="text-burnt-orange font-semibold mb-3">
                    {member.role}
                  </p>
                  <p className="text-gray-600 text-sm mb-4 leading-relaxed">
                    {member.bio}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {member.specialties?.map((specialty, idx) => (
                      <span
                        key={idx}
                        className="bg-cream text-gray-700 px-3 py-1 rounded-full text-xs font-medium"
                      >
                        {specialty}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {team.length === 0 && !loading && (
          <div className="text-center text-gray-600">
            No team members found.
          </div>
        )}
      </div>
    </section>
  );
};

export default TeamSection;
