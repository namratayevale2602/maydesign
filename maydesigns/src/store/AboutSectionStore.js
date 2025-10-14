// stores/useAboutSectionStore.js
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import * as api from "../services/api";

export const useAboutSectionStore = create(
  persist(
    (set, get) => ({
      // State
      aboutSection: null,
      loading: false,
      error: null,
      _hasHydrated: false,

      // Actions
      setHasHydrated: (status) => set({ _hasHydrated: status }),

      // Fetch about section
      fetchAboutSection: async (forceRefresh = false) => {
        const state = get();

        if (state.loading) {
          return state.aboutSection;
        }

        if (!forceRefresh && state.aboutSection) {
          return state.aboutSection;
        }

        set({ loading: true, error: null });

        try {
          const response = await api.fetchAboutSectionAPI();
          const aboutSection = response.data;

          set({
            aboutSection: aboutSection,
            loading: false,
            error: null,
          });

          return aboutSection;
        } catch (error) {
          const errorMessage =
            error.response?.data?.message ||
            error.message ||
            "Failed to fetch about section";

          set({
            error: errorMessage,
            loading: false,
          });

          throw error;
        }
      },

      clearError: () => set({ error: null }),
      clearAboutSection: () => set({ aboutSection: null, error: null }),
    }),
    {
      name: "about-section-storage",
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
        aboutSection: state.aboutSection,
        _hasHydrated: state._hasHydrated,
      }),
    }
  )
);

// Individual selectors
export const useAboutSection = () =>
  useAboutSectionStore((state) => state.aboutSection);
export const useAboutSectionLoading = () =>
  useAboutSectionStore((state) => state.loading);
export const useAboutSectionError = () =>
  useAboutSectionStore((state) => state.error);
export const useFetchAboutSection = () =>
  useAboutSectionStore((state) => state.fetchAboutSection);
export const useClearAboutSectionError = () =>
  useAboutSectionStore((state) => state.clearError);

// Combined hook
export const useAbout = () => {
  const aboutSection = useAboutSection();
  const loading = useAboutSectionLoading();
  const error = useAboutSectionError();
  const fetchAboutSection = useFetchAboutSection();
  const clearError = useClearAboutSectionError();

  return {
    aboutSection,
    loading,
    error,
    fetchAboutSection,
    clearError,
    isEmpty: !aboutSection && !loading,
  };
};
