// components/Loader/Loader.jsx
import React from "react";
import { MayLogo } from "../../assets";

const Loader = ({ isLoading, onLoadingComplete, text, children }) => {
  // Auto-complete after a delay when using PNG
  React.useEffect(() => {
    if (isLoading) {
      const timer = setTimeout(() => {
        onLoadingComplete();
      }, 4500); // Adjust timing as needed

      return () => clearTimeout(timer);
    }
  }, [isLoading, onLoadingComplete]);

  if (!isLoading) {
    return children;
  }

  return (
    <div className="fixed inset-0 bg-white z-50 flex flex-col items-center justify-center">
      {/* PNG Logo with smooth animation */}
      <div className="flex flex-col items-center justify-center">
        <img
          src={MayLogo}
          alt="May Designs Logo"
          className="w-96 h-96 md:w-96 md:h-96 object-contain animate-pulse"
        />
      </div>
    </div>
  );
};

export default Loader;
