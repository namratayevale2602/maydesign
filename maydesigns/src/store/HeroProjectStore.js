// stores/useHeroProjectStore.js
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import * as api from "../services/api";

export const useHeroProjectStore = create(
  persist(
    (set, get) => ({
      // State
      heroProjects: [],
      loading: false,
      error: null,
      _hasHydrated: false,

      // Actions
      setHasHydrated: (status) => set({ _hasHydrated: status }),

      // Fetch hero projects
      fetchHeroProjects: async (forceRefresh = false) => {
        const state = get();

        // If we're already loading, don't start another request
        if (state.loading) {
          return state.heroProjects;
        }

        // If we have heroProjects and not forcing refresh, return cached data
        if (!forceRefresh && state.heroProjects.length > 0) {
          return state.heroProjects;
        }

        set({ loading: true, error: null });

        try {
          const response = await api.fetchHeroProjectAPI();
          const heroProjects = response.data || response;

          set({
            heroProjects: heroProjects,
            loading: false,
            error: null,
          });

          return heroProjects;
        } catch (error) {
          const errorMessage =
            error.response?.data?.message ||
            error.message ||
            "Failed to fetch hero projects";

          set({
            error: errorMessage,
            loading: false,
          });

          throw error;
        }
      },

      clearError: () => set({ error: null }),
      clearHeroProjects: () => set({ heroProjects: [], error: null }),
      getHeroProjectById: (id) => {
        return get().heroProjects.find((project) => project.id === id);
      },
    }),
    {
      name: "hero-project-storage",
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
        heroProjects: state.heroProjects,
        _hasHydrated: state._hasHydrated,
      }),
    }
  )
);

// Individual selectors
export const useHeroProjects = () =>
  useHeroProjectStore((state) => state.heroProjects);
export const useHeroProjectsLoading = () =>
  useHeroProjectStore((state) => state.loading);
export const useHeroProjectsError = () =>
  useHeroProjectStore((state) => state.error);
export const useFetchHeroProjects = () =>
  useHeroProjectStore((state) => state.fetchHeroProjects);
export const useClearHeroProjectError = () =>
  useHeroProjectStore((state) => state.clearError);

// Combined hook
export const useHeroProject = () => {
  const heroProjects = useHeroProjects();
  const loading = useHeroProjectsLoading();
  const error = useHeroProjectsError();
  const fetchHeroProjects = useFetchHeroProjects();
  const clearError = useClearHeroProjectError();

  return {
    heroProjects,
    loading,
    error,
    fetchHeroProjects,
    clearError,
    isEmpty: heroProjects.length === 0 && !loading,
  };
};
