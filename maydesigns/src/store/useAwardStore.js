// stores/useAwardStore.js
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import * as api from "../services/api";

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

      // Actions
      setHasHydrated: (status) => set({ _hasHydrated: status }),

      // Fetch all awards
      fetchAwards: async (forceRefresh = false, year = "all") => {
        const state = get();

        if (state.loading) {
          return state.awards;
        }

        if (!forceRefresh && state.awards.length > 0 && year === "all") {
          return state.awards;
        }

        set({ loading: true, error: null });

        try {
          const params = year !== "all" ? { year } : {};
          const response = await api.fetchAwardsAPI(params);
          // Handle the nested data structure from your API
          const awardsData = response.success ? response.data : response;
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

          set({
            error: errorMessage,
            loading: false,
          });

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
          // Handle the nested data structure from your API
          const featuredData = response.success ? response.data : response;
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
          const yearsData = response.success ? response.data : response;
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
      clearAwards: () => set({ awards: [], featuredAwards: [], error: null }),

      getAwardById: (id) => {
        return get().awards.find((award) => award.id === id);
      },
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

// Individual selectors
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

// Combined hook
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
