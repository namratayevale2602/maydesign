// pages/Projects/ProjectDetailPage.js
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useParams, Link, useNavigate } from "react-router-dom";
import {
  FiMapPin,
  FiCalendar,
  FiAward,
  FiArrowLeft,
  FiShare2,
  FiHeart,
  FiMaximize,
  FiChevronLeft,
  FiChevronRight,
  FiUsers,
  FiLayers,
} from "react-icons/fi";
import {
  useCurrentProject,
  useFetchProjectBySlug,
  useFetchSimilarProjects,
  useClearCurrentProject,
  useProjectsLoading,
} from "../../store/useProjectStore";

const ProjectDetailPage = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("overview");
  const [activeImage, setActiveImage] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  const [similarProjects, setSimilarProjects] = useState([]);
  const [detailLoading, setDetailLoading] = useState(true);
  const [similarLoading, setSimilarLoading] = useState(false);

  const currentProject = useCurrentProject();
  const fetchProjectBySlug = useFetchProjectBySlug();
  const fetchSimilarProjects = useFetchSimilarProjects();
  const clearCurrentProject = useClearCurrentProject();
  const globalLoading = useProjectsLoading();

  useEffect(() => {
    console.log("🔍 ProjectDetailPage - Slug from URL:", slug);
    console.log("🔍 ProjectDetailPage - Current Project:", currentProject);

    if (slug) {
      setDetailLoading(true);
      console.log("🔄 Fetching project by slug:", slug);

      fetchProjectBySlug(slug)
        .then((project) => {
          console.log("✅ Project fetched successfully:", project);
        })
        .catch((error) => {
          console.error("❌ Error fetching project:", error);
        })
        .finally(() => {
          setDetailLoading(false);
        });
    }

    return () => {
      clearCurrentProject();
    };
  }, [slug, fetchProjectBySlug, clearCurrentProject]);

  useEffect(() => {
    if (currentProject?.id && !detailLoading) {
      setSimilarLoading(true);
      fetchSimilarProjects(currentProject.id)
        .then((projects) => {
          console.log("✅ Similar projects fetched:", projects);
          setSimilarProjects(projects);
        })
        .catch((error) => {
          console.error("❌ Error fetching similar projects:", error);
          setSimilarProjects([]);
        })
        .finally(() => {
          setSimilarLoading(false);
        });
    }
  }, [currentProject?.id, fetchSimilarProjects, detailLoading]);

  // Show loading state only for detail page, not global loading
  if (detailLoading || (!currentProject && globalLoading)) {
    return <DetailLoading />;
  }

  if (!currentProject && !detailLoading) {
    return <ProjectNotFound navigate={navigate} />;
  }

  const project = currentProject;

  const tabs = [
    { id: "overview", name: "Overview" },
    { id: "gallery", name: "Gallery" },
    { id: "design", name: "Design Philosophy" },
    { id: "team", name: "Project Team" },
    { id: "awards", name: "Awards" },
  ];

  const nextImage = () => {
    setActiveImage((prev) => (prev + 1) % (project.images?.length || 1));
  };

  const prevImage = () => {
    setActiveImage(
      (prev) =>
        (prev - 1 + (project.images?.length || 1)) %
        (project.images?.length || 1)
    );
  };

  return (
    <div className="min-h-screen bg-white pt-20">
      {/* Navigation */}
      <div className="container mx-auto px-6 py-6">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center text-gray-600 hover:text-orange-500 transition-colors group"
        >
          <FiArrowLeft className="mr-2 group-hover:-translate-x-1 transition-transform" />
          Back to Projects
        </button>
      </div>

      {/* Hero Section */}
      <section className="relative h-96 md:h-[500px]">
        <AnimatePresence mode="wait">
          <motion.img
            key={activeImage}
            src={project.images?.[activeImage]}
            alt={project.name}
            className="w-full h-full object-cover"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          />
        </AnimatePresence>

        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />

        {/* Image Navigation */}
        {project.images && project.images.length > 1 && (
          <>
            <button
              onClick={prevImage}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-colors"
            >
              <FiChevronLeft size={24} />
            </button>
            <button
              onClick={nextImage}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-colors"
            >
              <FiChevronRight size={24} />
            </button>
          </>
        )}

        {/* Image Counter */}
        {project.images && project.images.length > 1 && (
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black/50 text-white px-4 py-2 rounded-full text-sm">
            {activeImage + 1} / {project.images.length}
          </div>
        )}

        {/* Action Buttons */}
        <div className="absolute top-6 right-6 flex space-x-2">
          <button
            onClick={() => setIsFavorite(!isFavorite)}
            className={`w-12 h-12 rounded-full backdrop-blur-sm flex items-center justify-center transition-colors ${
              isFavorite
                ? "bg-red-500/20 text-red-500"
                : "bg-white/20 text-white hover:bg-white/30"
            }`}
          >
            <FiHeart className={isFavorite ? "fill-current" : ""} />
          </button>
          <button className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-white hover:bg-white/30 transition-colors">
            <FiShare2 />
          </button>
          <button
            onClick={() => setIsLightboxOpen(true)}
            className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-white hover:bg-white/30 transition-colors"
          >
            <FiMaximize />
          </button>
        </div>

        {/* Project Info Overlay */}
        <div className="absolute bottom-8 left-8 text-white">
          <span className="bg-orange-500 px-4 py-2 rounded-full text-sm font-semibold mb-4 inline-block">
            {project.category || "Project"}
          </span>
          <h1 className="text-4xl md:text-5xl font-bold mb-2">
            {project.name || "Project Name"}
          </h1>
          <p className="text-xl opacity-90">{project.type || "Architecture"}</p>
        </div>
      </section>

      {/* Image Thumbnails */}
      {project.images && project.images.length > 1 && (
        <div className="container mx-auto px-6 py-4">
          <div className="flex space-x-2 overflow-x-auto pb-2">
            {project.images.map((image, index) => (
              <button
                key={index}
                onClick={() => setActiveImage(index)}
                className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-all ${
                  activeImage === index
                    ? "border-orange-500 scale-105"
                    : "border-gray-300 hover:border-gray-400"
                }`}
              >
                <img
                  src={image}
                  alt={`${project.name} view ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Main Content */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Main Content */}
            <div className="lg:col-span-2">
              {/* Tabs */}
              <div className="border-b border-gray-200 mb-8 overflow-x-auto">
                <nav className="flex space-x-8 min-w-max">
                  {tabs.map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`py-4 px-1 border-b-2 font-medium text-sm whitespace-nowrap ${
                        activeTab === tab.id
                          ? "border-orange-500 text-orange-600"
                          : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                      }`}
                    >
                      {tab.name}
                    </button>
                  ))}
                </nav>
              </div>

              {/* Tab Content */}
              <div className="prose max-w-none">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeTab}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                  >
                    {activeTab === "overview" && (
                      <OverviewTab project={project} />
                    )}
                    {activeTab === "gallery" && (
                      <GalleryTab project={project} />
                    )}
                    {activeTab === "design" && <DesignTab project={project} />}
                    {activeTab === "team" && <TeamTab project={project} />}
                    {activeTab === "awards" && <AwardsTab project={project} />}
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              <ProjectInfoCard project={project} />
              <CTACard />

              {/* Similar Projects */}
              {similarLoading ? (
                <SimilarProjectsLoading />
              ) : similarProjects.length > 0 ? (
                <SimilarProjectsCard projects={similarProjects} />
              ) : null}
            </div>
          </div>
        </div>
      </section>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {isLightboxOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center"
            onClick={() => setIsLightboxOpen(false)}
          >
            <div className="relative max-w-7xl max-h-full">
              <img
                src={project.images?.[activeImage]}
                alt={project.name}
                className="max-w-full max-h-full object-contain"
              />

              <button
                onClick={() => setIsLightboxOpen(false)}
                className="absolute top-4 right-4 w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-colors"
              >
                ×
              </button>

              {project.images && project.images.length > 1 && (
                <>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      prevImage();
                    }}
                    className="absolute left-4 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-colors"
                  >
                    <FiChevronLeft size={24} />
                  </button>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      nextImage();
                    }}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-colors"
                  >
                    <FiChevronRight size={24} />
                  </button>
                </>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// Loading Component for Detail Page
const DetailLoading = () => (
  <div className="min-h-screen bg-gray-50 pt-20">
    <div className="container mx-auto px-6 py-6">
      <button
        onClick={() => window.history.back()}
        className="flex items-center text-gray-600 hover:text-orange-500 transition-colors group mb-8"
      >
        <FiArrowLeft className="mr-2 group-hover:-translate-x-1 transition-transform" />
        Back to Projects
      </button>
    </div>

    <div className="container mx-auto px-6">
      {/* Skeleton Hero */}
      <div className="relative h-96 md:h-[500px] bg-gray-200 rounded-xl mb-8 animate-pulse"></div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Main Content Skeleton */}
        <div className="lg:col-span-2">
          <div className="border-b border-gray-200 mb-8">
            <div className="flex space-x-8">
              {[1, 2, 3, 4, 5].map((i) => (
                <div key={i} className="py-4">
                  <div className="h-4 bg-gray-200 rounded w-20 animate-pulse"></div>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            <div className="h-6 bg-gray-200 rounded animate-pulse"></div>
            <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
            <div className="h-4 bg-gray-200 rounded animate-pulse w-3/4"></div>
          </div>
        </div>

        {/* Sidebar Skeleton */}
        <div className="space-y-6">
          <div className="bg-gray-50 rounded-xl p-6">
            <div className="h-6 bg-gray-200 rounded w-32 mb-4 animate-pulse"></div>
            <div className="space-y-3">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="flex items-center space-x-3">
                  <div className="h-4 bg-gray-200 rounded w-4 animate-pulse"></div>
                  <div className="h-4 bg-gray-200 rounded w-24 animate-pulse"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

// Project Not Found Component
const ProjectNotFound = ({ navigate }) => (
  <div className="min-h-screen bg-gray-50 pt-20 flex items-center justify-center">
    <div className="text-center">
      <div className="text-6xl mb-4">🔍</div>
      <h1 className="text-4xl font-bold text-gray-900 mb-4">
        Project Not Found
      </h1>
      <p className="text-gray-600 mb-8">
        The project you're looking for doesn't exist or may have been moved.
      </p>
      <div className="flex gap-4 justify-center">
        <button
          onClick={() => navigate(-1)}
          className="bg-orange-500 text-white px-6 py-3 rounded-lg hover:bg-orange-600 transition-colors"
        >
          Go Back
        </button>
        <Link
          to="/projects"
          className="border-2 border-gray-300 text-gray-700 px-6 py-3 rounded-lg hover:border-orange-500 hover:text-orange-500 transition-colors"
        >
          Browse All Projects
        </Link>
      </div>
    </div>
  </div>
);

// Similar Projects Loading Component
const SimilarProjectsLoading = () => (
  <div className="bg-white rounded-xl p-6 border border-gray-200">
    <div className="h-6 bg-gray-200 rounded w-32 mb-4 animate-pulse"></div>
    <div className="space-y-4">
      {[1, 2, 3].map((i) => (
        <div key={i} className="flex items-center space-x-3">
          <div className="w-16 h-12 bg-gray-200 rounded-lg animate-pulse"></div>
          <div className="flex-1">
            <div className="h-4 bg-gray-200 rounded w-24 mb-2 animate-pulse"></div>
            <div className="h-3 bg-gray-200 rounded w-16 animate-pulse"></div>
          </div>
        </div>
      ))}
    </div>
  </div>
);

// Tab Components
const OverviewTab = ({ project }) => (
  <div className="space-y-8">
    <div>
      <h2 className="text-3xl font-bold text-gray-900 mb-6">
        Project Overview
      </h2>
      <p className="text-gray-600 leading-relaxed text-lg">
        {project.full_description ||
          project.description ||
          "No description available."}
      </p>
    </div>

    {project.highlights && project.highlights.length > 0 && (
      <div>
        <h3 className="text-2xl font-bold text-gray-900 mb-4">
          Design Highlights
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {project.highlights.map((highlight, index) => (
            <div key={index} className="flex items-start space-x-3">
              <div className="w-2 h-2 bg-orange-500 rounded-full mt-2 flex-shrink-0"></div>
              <span className="text-gray-600">{highlight}</span>
            </div>
          ))}
        </div>
      </div>
    )}

    {project.tags && project.tags.length > 0 && (
      <div>
        <h3 className="text-2xl font-bold text-gray-900 mb-4">Project Tags</h3>
        <div className="flex flex-wrap gap-2">
          {project.tags.map((tag, index) => (
            <span
              key={index}
              className="bg-gray-100 text-gray-700 px-4 py-2 rounded-full text-sm font-medium"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    )}
  </div>
);

const GalleryTab = ({ project }) => (
  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
    {project.images?.map((image, index) => (
      <div
        key={index}
        className="rounded-lg overflow-hidden group cursor-zoom-in"
        onClick={() => {
          setActiveImage(index);
          setIsLightboxOpen(true);
        }}
      >
        <img
          src={image}
          alt={`${project.name} - View ${index + 1}`}
          className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
        />
      </div>
    ))}
  </div>
);

const DesignTab = ({ project }) => (
  <div className="space-y-8">
    {project.concept && (
      <div>
        <h3 className="text-2xl font-bold text-gray-900 mb-4">
          Design Concept
        </h3>
        <p className="text-gray-600 leading-relaxed">{project.concept}</p>
      </div>
    )}

    {project.design_philosophy && (
      <div>
        <h3 className="text-2xl font-bold text-gray-900 mb-4">
          Design Philosophy
        </h3>
        <p className="text-gray-600 leading-relaxed whitespace-pre-line">
          {project.design_philosophy}
        </p>
      </div>
    )}

    {!project.concept && !project.design_philosophy && (
      <div className="text-center py-8">
        <p className="text-gray-500">No design information available.</p>
      </div>
    )}
  </div>
);

const TeamTab = ({ project }) => (
  <div className="space-y-6">
    <h3 className="text-2xl font-bold text-gray-900 mb-6">Project Team</h3>
    {project.team && project.team.length > 0 ? (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {project.team.map((member, index) => (
          <div key={index} className="bg-gray-50 rounded-lg p-6">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
                <FiUsers className="text-orange-500" />
              </div>
              <div>
                <h4 className="font-semibold text-gray-900">{member.name}</h4>
                <p className="text-gray-600 text-sm">{member.role}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    ) : (
      <p className="text-gray-500">No team information available.</p>
    )}
  </div>
);

const AwardsTab = ({ project }) => (
  <div className="space-y-6">
    <h3 className="text-2xl font-bold text-gray-900 mb-6">
      Awards & Recognition
    </h3>
    {project.awards && project.awards.length > 0 ? (
      project.awards.map((award, index) => (
        <div key={index} className="border-l-4 border-orange-500 pl-6 py-4">
          <h3 className="font-semibold text-gray-900 text-lg">{award.name}</h3>
          <p className="text-gray-600">{award.organization}</p>
          <p className="text-gray-500 text-sm mt-1">{award.year}</p>
          {award.description && (
            <p className="text-gray-600 text-sm mt-2">{award.description}</p>
          )}
        </div>
      ))
    ) : (
      <p className="text-gray-500">No awards information available.</p>
    )}
  </div>
);

const ProjectInfoCard = ({ project }) => (
  <div className="bg-gray-50 rounded-xl p-6 sticky top-6">
    <h3 className="text-lg font-semibold text-gray-900 mb-4">
      Project Details
    </h3>
    <div className="space-y-4">
      <div className="flex items-center text-gray-600">
        <FiMapPin className="mr-3 text-orange-500 flex-shrink-0" />
        <span>{project.location || "Location not specified"}</span>
      </div>
      <div className="flex items-center text-gray-600">
        <FiCalendar className="mr-3 text-orange-500 flex-shrink-0" />
        <span>Completed {project.year || "Year not specified"}</span>
      </div>
      {project.area && (
        <div className="flex items-center text-gray-600">
          <FiLayers className="mr-3 text-orange-500 flex-shrink-0" />
          <span>{project.area}</span>
        </div>
      )}
      {project.duration && (
        <div className="flex items-center text-gray-600">
          <FiUsers className="mr-3 text-orange-500 flex-shrink-0" />
          <span>{project.duration}</span>
        </div>
      )}
      {project.awards && project.awards.length > 0 && (
        <div className="flex items-center text-gray-600">
          <FiAward className="mr-3 text-orange-500 flex-shrink-0" />
          <span>{project.awards.length} Awards</span>
        </div>
      )}
    </div>

    <div className="mt-6 pt-6 border-t border-gray-200">
      <h4 className="font-semibold text-gray-900 mb-3">Project Categories</h4>
      <div className="flex flex-wrap gap-2">
        <span className="bg-orange-100 text-orange-700 px-3 py-1 rounded-full text-sm">
          {project.category || "Uncategorized"}
        </span>
        {project.sub_category && (
          <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm">
            {project.sub_category}
          </span>
        )}
        {project.type && (
          <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm">
            {project.type}
          </span>
        )}
      </div>
    </div>
  </div>
);

const CTACard = () => (
  <div className="bg-orange-50 rounded-xl p-6 border border-orange-200">
    <h3 className="text-lg font-semibold text-gray-900 mb-3">
      Inspired by this project?
    </h3>
    <p className="text-gray-600 mb-4 text-sm">
      Let's discuss how we can bring your vision to life with the same level of
      craftsmanship and attention to detail.
    </p>
    <Link
      to="/contact"
      className="block w-full bg-orange-500 text-white text-center py-3 rounded-lg hover:bg-orange-600 transition-colors font-semibold mb-3"
    >
      Start Your Project
    </Link>
    <p className="text-center text-gray-500 text-xs">
      Let's design your space together
    </p>
  </div>
);

const SimilarProjectsCard = ({ projects }) => (
  <div className="bg-white rounded-xl p-6 border border-gray-200">
    <h3 className="text-lg font-semibold text-gray-900 mb-4">
      Similar Projects
    </h3>
    <div className="space-y-4">
      {projects.slice(0, 3).map((project) => (
        <Link
          key={project.id}
          to={`/projects/${project.slug || project.id}`}
          className="flex items-center space-x-3 group"
        >
          <img
            src={project.images?.[0] || "/api/placeholder/100/75"}
            alt={project.name}
            className="w-16 h-12 object-cover rounded-lg"
          />
          <div className="flex-1">
            <h4 className="font-medium text-gray-900 group-hover:text-orange-500 transition-colors">
              {project.name}
            </h4>
            <p className="text-gray-500 text-sm">{project.category}</p>
          </div>
        </Link>
      ))}
    </div>
  </div>
);

export default ProjectDetailPage;
