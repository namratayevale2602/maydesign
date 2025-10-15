// layout/Layout.js (alternative approach)
import React, { useState, useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Footer/Footer";
import WhatsAppPopup from "../components/PopUp/WhatsAppPopup";
import ScrollToTop from "../components/ScrollToTop/ScrollToTop";
import Loader from "../components/Loader/Loader";
import ProjectsSidebar from "../components/ProjectsSidebar/ProjectsSidebar";

const Layout = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isInitialLoad, setIsInitialLoad] = useState(true);
  const location = useLocation();

  // Check if current route is a project route
  const isProjectRoute = location.pathname.startsWith("/projects");
  // Check if current route is the index page
  const isIndexPage = location.pathname === "/";

  useEffect(() => {
    // Only apply loading logic for index page
    if (isIndexPage) {
      const timer = setTimeout(() => {
        setIsLoading(false);
      }, 2000); // Adjust timing as needed

      return () => clearTimeout(timer);
    } else {
      // For non-index pages, skip loading immediately
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

      {/* Only wrap with Loader for index page */}
      <Loader
        isLoading={isLoading}
        onLoadingComplete={handleLoadingComplete}
        text="MAY Designs"
        useVideo={true}
      >
        <div className="flex flex-col min-h-screen">
          <Navbar />

          {/* Conditionally render sidebar and main content */}
          <div className="flex flex-1 ">
            {/* Show sidebar only for project routes */}
            {isProjectRoute && <ProjectsSidebar />}

            <div className="flex-1">
              <AnimatePresence mode="wait">
                <motion.main
                  key={location.pathname}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                  className="h-full"
                >
                  <Outlet />
                </motion.main>
              </AnimatePresence>
            </div>
          </div>

          <WhatsAppPopup />
          <Footer />
        </div>
      </Loader>
    </div>
  );
};

export default Layout;
