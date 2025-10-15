import React, { useState, useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Footer/Footer";
import WhatsAppPopup from "../components/PopUp/WhatsAppPopup";
import ScrollToTop from "../components/ScrollToTop/ScrollToTop";
import Loader from "../components/Loader/Loader";

const Layout = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isInitialLoad, setIsInitialLoad] = useState(true);
  const location = useLocation();

  useEffect(() => {
    // Only show loader for initial load and home page
    if (isInitialLoad && location.pathname === "/") {
      setIsLoading(true);

      // For video loader, we'll let the video duration control the timing
      // Set a maximum timeout as fallback (adjust based on your video length)
      const videoDuration = 5000; // 5 seconds as fallback
      const timer = setTimeout(() => {
        setIsLoading(false);
        setIsInitialLoad(false);
      }, videoDuration);

      return () => clearTimeout(timer);
    } else {
      // For other pages or after initial load, don't show loader
      setIsLoading(false);
      setIsInitialLoad(false);
    }
  }, [location.pathname, isInitialLoad]);

  const handleLoadingComplete = () => {
    setIsLoading(false);
    setIsInitialLoad(false);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <ScrollToTop />

      {/* <Loader
        isLoading={isLoading}
        onLoadingComplete={handleLoadingComplete}
        text="MAY Designs"
        useVideo={true} // Enable video loader
      > */}
      <div className="flex flex-col min-h-screen">
        <Navbar />

        {/* Smooth page transitions */}
        <AnimatePresence mode="wait">
          <motion.main
            key={location.pathname}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="flex-1"
          >
            <Outlet />
          </motion.main>
        </AnimatePresence>

        <WhatsAppPopup />
        <Footer />
      </div>
      {/* </Loader> */}
    </div>
  );
};

export default Layout;
