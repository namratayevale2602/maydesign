// In your main page component
import React from "react";
import AwardsSection from "./AwardsSection";
import PressSection from "./PressSection";
import ArticlesSection from "./ArticlesSection";

const PublicationsPage = () => {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-6 text-center">
          <h1 className="text-5xl md:text-7xl font-light text-gray-900 mb-6">
            Publications
          </h1>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto">
            Our achievements and contributions to architecture
          </p>
        </div>
      </section>

      {/* Use sections separately */}
      <AwardsSection />
      <PressSection />
      <ArticlesSection />
    </div>
  );
};

export default PublicationsPage;
