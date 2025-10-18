// AboutUsPage.jsx
import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import HeroSection from "./HeroSection";
import ZigzagImageTimeline from "./ZigzagTimeline";
import StatsSection from "./StatsSection";
import MissionVisionSection from "./MissionVisionSection";
import ValuesSection from "./ValuesSection";
import TeamSection from "./TeamSection";
import CTASection from "./CTASection";

// Motion variants
export const fadeIn = (direction, type, delay, duration) => ({
  hidden: {
    x: direction === "left" ? 100 : direction === "right" ? -100 : 0,
    y: direction === "up" ? 100 : direction === "down" ? -100 : 0,
    opacity: 0,
  },
  show: {
    x: 0,
    y: 0,
    opacity: 1,
    transition: {
      type,
      delay,
      duration,
      ease: "easeOut",
    },
  },
});

export const staggerContainer = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

export const zoomIn = (delay, duration) => ({
  hidden: {
    scale: 0,
    opacity: 0,
  },
  show: {
    scale: 1,
    opacity: 1,
    transition: {
      type: "spring",
      delay,
      duration,
      ease: "easeOut",
    },
  },
});

const AboutUsPage = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [selectedTimelineItem, setSelectedTimelineItem] = useState(null);
  const statsRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    if (statsRef.current) {
      observer.observe(statsRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <motion.div
      initial="hidden"
      whileInView="show"
      viewport={{ once: true }}
      variants={staggerContainer}
      className="min-h-screen bg-cream"
    >
      <HeroSection />
      <ZigzagImageTimeline />
      <StatsSection />
      <MissionVisionSection />
      <ValuesSection />
      <TeamSection />
      <CTASection />

      <style jsx>{`
        .bg-cream {
          background-color: #fefaf6;
        }
      `}</style>
    </motion.div>
  );
};

export default AboutUsPage;
