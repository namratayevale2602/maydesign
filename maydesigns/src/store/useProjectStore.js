// stores/useProjectStore.js
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import * as api from "../services/api";

export const useProjectStore = create(
  persist(
    (set, get) => ({
      // State
      projects: [],
      featuredProjects: [],
      categoryProjects: {},
      currentProject: null,
      categories: [],
      years: [],
      stats: null,
      loading: false,
      error: null,
      _hasHydrated: false,

      // Hydration
      setHasHydrated: (status) => set({ _hasHydrated: status }),

      // Fetch all projects with filters
      fetchProjects: async (params = {}, forceRefresh = false) => {
        const state = get();

        if (state.loading) {
          return state.projects;
        }

        // Simple cache check
        if (
          !forceRefresh &&
          state.projects.length > 0 &&
          Object.keys(params).length === 0
        ) {
          return state.projects;
        }

        set({ loading: true, error: null });

        try {
          const response = await api.fetchProjectsAPI(params);
          const projectsData = response.success
            ? response.data.data || response.data
            : response.data || response;
          const projects = Array.isArray(projectsData) ? projectsData : [];

          set({
            projects: projects,
            loading: false,
            error: null,
          });

          return projects;
        } catch (error) {
          const errorMessage =
            error.response?.data?.message ||
            error.message ||
            "Failed to fetch projects";
          set({ error: errorMessage, loading: false });
          throw error;
        }
      },

      // Fetch featured projects
      fetchFeaturedProjects: async (forceRefresh = false) => {
        const state = get();

        if (!forceRefresh && state.featuredProjects.length > 0) {
          return state.featuredProjects;
        }

        set({ loading: true, error: null });

        try {
          const response = await api.fetchFeaturedProjectsAPI();
          const featuredData = response.success
            ? response.data.data || response.data
            : response.data || response;
          const featuredProjects = Array.isArray(featuredData)
            ? featuredData
            : [];

          set({
            featuredProjects: featuredProjects,
            loading: false,
          });

          return featuredProjects;
        } catch (error) {
          const errorMessage =
            error.response?.data?.message ||
            error.message ||
            "Failed to fetch featured projects";
          set({ error: errorMessage, loading: false });
          throw error;
        }
      },

      // Fetch projects by category
      fetchProjectsByCategory: async (category, forceRefresh = false) => {
        const state = get();

        if (!forceRefresh && state.categoryProjects[category]?.length > 0) {
          return state.categoryProjects[category];
        }

        set({ loading: true, error: null });

        try {
          const response = await api.fetchProjectsByCategoryAPI(category);
          const projectsData = response.success
            ? response.data.data || response.data
            : response.data || response;
          const projects = Array.isArray(projectsData) ? projectsData : [];

          set((state) => ({
            categoryProjects: {
              ...state.categoryProjects,
              [category]: projects,
            },
            loading: false,
            error: null,
          }));

          return projects;
        } catch (error) {
          const errorMessage =
            error.response?.data?.message ||
            error.message ||
            `Failed to fetch ${category} projects`;
          set({ error: errorMessage, loading: false });
          throw error;
        }
      },

      // Fetch project by ID
      fetchProjectById: async (id, forceRefresh = false) => {
        const state = get();

        if (!forceRefresh && state.currentProject?.id === parseInt(id)) {
          return state.currentProject;
        }

        set({ loading: true, error: null });

        try {
          const response = await api.fetchProjectByIdAPI(id);
          const projectData = response.success
            ? response.data.data || response.data
            : response.data || response;

          set({
            currentProject: projectData,
            loading: false,
            error: null,
          });

          return projectData;
        } catch (error) {
          const errorMessage =
            error.response?.data?.message ||
            error.message ||
            "Failed to fetch project";
          set({ error: errorMessage, loading: false });
          throw error;
        }
      },

      // Fetch project by slug - FIXED FUNCTION
      fetchProjectBySlug: async (slug, forceRefresh = false) => {
        const state = get();

        if (!forceRefresh && state.currentProject?.slug === slug) {
          return state.currentProject;
        }

        set({ loading: true, error: null });

        try {
          const response = await api.fetchProjectBySlugAPI(slug);
          const projectData = response.success
            ? response.data.data || response.data
            : response.data || response;

          set({
            currentProject: projectData,
            loading: false,
            error: null,
          });

          return projectData;
        } catch (error) {
          const errorMessage =
            error.response?.data?.message ||
            error.message ||
            "Failed to fetch project";
          set({ error: errorMessage, loading: false });
          throw error;
        }
      },

      // Fetch project categories
      fetchProjectCategories: async (forceRefresh = false) => {
        const state = get();

        if (!forceRefresh && state.categories.length > 0) {
          return state.categories;
        }

        try {
          const response = await api.fetchProjectCategoriesAPI();

          // Handle different response formats
          let categoriesData;
          if (response.success) {
            categoriesData = response.data?.data || response.data;
          } else {
            categoriesData = response.data || response;
          }

          // Ensure categories is always an array and extract proper values
          const categories = Array.isArray(categoriesData)
            ? categoriesData.map((cat) => {
                // If it's an object, use the name or id property
                if (typeof cat === "object" && cat !== null) {
                  return cat.name || cat.id || cat.title || cat;
                }
                // If it's a string or number, use it directly
                return cat;
              })
            : [];

          set({
            categories: categories,
          });

          return categories;
        } catch (error) {
          console.error("Failed to fetch project categories:", error);
          return [];
        }
      },

      // Fetch project years
      fetchProjectYears: async (forceRefresh = false) => {
        const state = get();

        if (!forceRefresh && state.years.length > 0) {
          return state.years;
        }

        try {
          const response = await api.fetchProjectYearsAPI();
          const yearsData = response.success
            ? response.data.data || response.data
            : response.data || response;
          const years = Array.isArray(yearsData) ? yearsData : [];

          set({
            years: years,
          });

          return years;
        } catch (error) {
          console.error("Failed to fetch project years:", error);
          return [];
        }
      },

      // Fetch project stats
      fetchProjectStats: async (forceRefresh = false) => {
        const state = get();

        if (!forceRefresh && state.stats) {
          return state.stats;
        }

        try {
          const response = await api.fetchProjectStatsAPI();
          const statsData = response.success
            ? response.data.data || response.data
            : response.data || response;

          set({
            stats: statsData,
          });

          return statsData;
        } catch (error) {
          console.error("Failed to fetch project stats:", error);
          return null;
        }
      },

      // Fetch similar projects
      fetchSimilarProjects: async (projectId) => {
        try {
          const response = await api.fetchSimilarProjectsAPI(projectId);
          const similarData = response.success
            ? response.data.data || response.data
            : response.data || response;
          return Array.isArray(similarData) ? similarData : [];
        } catch (error) {
          console.error("Failed to fetch similar projects:", error);
          return [];
        }
      },

      // Clear error
      clearError: () => set({ error: null }),

      // Clear current project
      clearCurrentProject: () => set({ currentProject: null }),

      // Get project by ID from cache
      getProjectById: (id) => {
        const state = get();
        return (
          state.projects.find((project) => project.id === parseInt(id)) ||
          Object.values(state.categoryProjects)
            .flat()
            .find((project) => project.id === parseInt(id))
        );
      },

      // Get project by slug from cache
      getProjectBySlug: (slug) => {
        const state = get();
        return (
          state.projects.find((project) => project.slug === slug) ||
          Object.values(state.categoryProjects)
            .flat()
            .find((project) => project.slug === slug)
        );
      },
    }),
    {
      name: "project-storage",
      storage: createJSONStorage(() => {
        if (typeof window !== "undefined") {
          return localStorage;
        }
        return {
          getItem: () => null,
          setItem: () => {},
          removeItem: () => {},
        };
      }),
      onRehydrateStorage: () => (state) => {
        if (state) {
          state.setHasHydrated(true);
        }
      },
      partialize: (state) => ({
        projects: state.projects,
        featuredProjects: state.featuredProjects,
        categoryProjects: state.categoryProjects,
        categories: state.categories,
        years: state.years,
        stats: state.stats,
        _hasHydrated: state._hasHydrated,
      }),
    }
  )
);

// Awards Store
export const useAwardStore = create(
  persist(
    (set, get) => ({
      // State
      awards: [],
      featuredAwards: [],
      years: [],
      loading: false,
      error: null,
      _hasHydrated: false,

      // Hydration
      setHasHydrated: (status) => set({ _hasHydrated: status }),

      // Fetch all awards
      fetchAwards: async (params = {}, forceRefresh = false) => {
        const state = get();

        if (state.loading) {
          return state.awards;
        }

        if (
          !forceRefresh &&
          state.awards.length > 0 &&
          Object.keys(params).length === 0
        ) {
          return state.awards;
        }

        set({ loading: true, error: null });

        try {
          const response = await api.fetchAwardsAPI(params);
          const awardsData = response.success
            ? response.data.data || response.data
            : response.data || response;
          const awards = Array.isArray(awardsData) ? awardsData : [];

          set({
            awards: awards,
            loading: false,
            error: null,
          });

          return awards;
        } catch (error) {
          const errorMessage =
            error.response?.data?.message ||
            error.message ||
            "Failed to fetch awards";
          set({ error: errorMessage, loading: false });
          throw error;
        }
      },

      // Fetch featured awards
      fetchFeaturedAwards: async (forceRefresh = false) => {
        const state = get();

        if (!forceRefresh && state.featuredAwards.length > 0) {
          return state.featuredAwards;
        }

        try {
          const response = await api.fetchFeaturedAwardsAPI();
          const featuredData = response.success
            ? response.data.data || response.data
            : response.data || response;
          const featuredAwards = Array.isArray(featuredData)
            ? featuredData
            : [];

          set({
            featuredAwards: featuredAwards,
          });

          return featuredAwards;
        } catch (error) {
          console.error("Failed to fetch featured awards:", error);
          return [];
        }
      },

      // Fetch award years
      fetchAwardYears: async (forceRefresh = false) => {
        const state = get();

        if (!forceRefresh && state.years.length > 0) {
          return state.years;
        }

        try {
          const response = await api.fetchAwardYearsAPI();
          const yearsData = response.success
            ? response.data.data || response.data
            : response.data || response;
          const years = Array.isArray(yearsData) ? yearsData : [];

          set({
            years: years,
          });

          return years;
        } catch (error) {
          console.error("Failed to fetch award years:", error);
          return [];
        }
      },

      clearError: () => set({ error: null }),
    }),
    {
      name: "award-storage",
      storage: createJSONStorage(() => {
        if (typeof window !== "undefined") {
          return localStorage;
        }
        return {
          getItem: () => null,
          setItem: () => {},
          removeItem: () => {},
        };
      }),
      onRehydrateStorage: () => (state) => {
        if (state) {
          state.setHasHydrated(true);
        }
      },
      partialize: (state) => ({
        awards: state.awards,
        featuredAwards: state.featuredAwards,
        years: state.years,
        _hasHydrated: state._hasHydrated,
      }),
    }
  )
);

// Selectors for ProjectStore
export const useProjects = () => useProjectStore((state) => state.projects);
export const useFeaturedProjects = () =>
  useProjectStore((state) => state.featuredProjects);
export const useCategoryProjects = () =>
  useProjectStore((state) => state.categoryProjects);
export const useCurrentProject = () =>
  useProjectStore((state) => state.currentProject);
export const useProjectCategories = () =>
  useProjectStore((state) => state.categories);
export const useProjectYears = () => useProjectStore((state) => state.years);
export const useProjectStats = () => useProjectStore((state) => state.stats);
export const useProjectsLoading = () =>
  useProjectStore((state) => state.loading);
export const useProjectsError = () => useProjectStore((state) => state.error);
export const useFetchProjects = () =>
  useProjectStore((state) => state.fetchProjects);
export const useFetchFeaturedProjects = () =>
  useProjectStore((state) => state.fetchFeaturedProjects);
export const useFetchProjectsByCategory = () =>
  useProjectStore((state) => state.fetchProjectsByCategory);
export const useFetchProjectById = () =>
  useProjectStore((state) => state.fetchProjectById);
export const useFetchProjectBySlug = () =>
  useProjectStore((state) => state.fetchProjectBySlug);
export const useFetchProjectCategories = () =>
  useProjectStore((state) => state.fetchProjectCategories);
export const useFetchProjectYears = () =>
  useProjectStore((state) => state.fetchProjectYears);
export const useFetchProjectStats = () =>
  useProjectStore((state) => state.fetchProjectStats);
export const useFetchSimilarProjects = () =>
  useProjectStore((state) => state.fetchSimilarProjects);
export const useClearProjectError = () =>
  useProjectStore((state) => state.clearError);
export const useClearCurrentProject = () =>
  useProjectStore((state) => state.clearCurrentProject);
export const useGetProjectBySlug = () =>
  useProjectStore((state) => state.getProjectBySlug);

// Selectors for AwardStore
export const useAwards = () => useAwardStore((state) => state.awards);
export const useFeaturedAwards = () =>
  useAwardStore((state) => state.featuredAwards);
export const useAwardYears = () => useAwardStore((state) => state.years);
export const useAwardsLoading = () => useAwardStore((state) => state.loading);
export const useAwardsError = () => useAwardStore((state) => state.error);
export const useFetchAwards = () => useAwardStore((state) => state.fetchAwards);
export const useFetchFeaturedAwards = () =>
  useAwardStore((state) => state.fetchFeaturedAwards);
export const useFetchAwardYears = () =>
  useAwardStore((state) => state.fetchAwardYears);
export const useClearAwardError = () =>
  useAwardStore((state) => state.clearError);

// Combined hooks
export const useProjectData = () => {
  const projects = useProjects();
  const featuredProjects = useFeaturedProjects();
  const categories = useProjectCategories();
  const years = useProjectYears();
  const stats = useProjectStats();
  const loading = useProjectsLoading();
  const error = useProjectsError();
  const fetchProjects = useFetchProjects();
  const fetchFeaturedProjects = useFetchFeaturedProjects();
  const fetchProjectCategories = useFetchProjectCategories();
  const fetchProjectYears = useFetchProjectYears();
  const fetchProjectStats = useFetchProjectStats();
  const clearError = useClearProjectError();

  return {
    projects,
    featuredProjects,
    categories,
    years,
    stats,
    loading,
    error,
    fetchProjects,
    fetchFeaturedProjects,
    fetchProjectCategories,
    fetchProjectYears,
    fetchProjectStats,
    clearError,
    isEmpty: projects.length === 0 && !loading,
  };
};

export const useAwardData = () => {
  const awards = useAwards();
  const featuredAwards = useFeaturedAwards();
  const years = useAwardYears();
  const loading = useAwardsLoading();
  const error = useAwardsError();
  const fetchAwards = useFetchAwards();
  const fetchFeaturedAwards = useFetchFeaturedAwards();
  const fetchAwardYears = useFetchAwardYears();
  const clearError = useClearAwardError();

  return {
    awards,
    featuredAwards,
    years,
    loading,
    error,
    fetchAwards,
    fetchFeaturedAwards,
    fetchAwardYears,
    clearError,
    isEmpty: awards.length === 0 && !loading,
  };
};