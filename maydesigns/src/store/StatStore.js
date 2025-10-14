// stores/useStatStore.js
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import * as api from "../services/api";

export const useStatStore = create(
  persist(
    (set, get) => ({
      // State
      stats: [],
      loading: false,
      error: null,
      _hasHydrated: false,

      // Actions
      setHasHydrated: (status) => set({ _hasHydrated: status }),

      // Fetch stats
      fetchStats: async (forceRefresh = false) => {
        const state = get();

        // If we're already loading, don't start another request
        if (state.loading) {
          return state.stats;
        }

        // If we have stats and not forcing refresh, return cached data
        if (!forceRefresh && state.stats.length > 0) {
          return state.stats;
        }

        set({ loading: true, error: null });

        try {
          const response = await api.fetchStatsAPI();
          const stats = response.data || response;

          set({
            stats: stats,
            loading: false,
            error: null,
          });

          return stats;
        } catch (error) {
          const errorMessage =
            error.response?.data?.message ||
            error.message ||
            "Failed to fetch statistics";

          set({
            error: errorMessage,
            loading: false,
          });

          throw error;
        }
      },

      clearError: () => set({ error: null }),
      clearStats: () => set({ stats: [], error: null }),
      getStatById: (id) => {
        return get().stats.find((stat) => stat.id === id);
      },
    }),
    {
      name: "stat-storage",
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
        stats: state.stats,
        _hasHydrated: state._hasHydrated,
      }),
    }
  )
);

// Individual selectors
export const useStats = () => useStatStore((state) => state.stats);
export const useStatsLoading = () => useStatStore((state) => state.loading);
export const useStatsError = () => useStatStore((state) => state.error);
export const useFetchStats = () => useStatStore((state) => state.fetchStats);
export const useClearStatError = () =>
  useStatStore((state) => state.clearError);

// Combined hook
export const useStat = () => {
  const stats = useStats();
  const loading = useStatsLoading();
  const error = useStatsError();
  const fetchStats = useFetchStats();
  const clearError = useClearStatError();

  return {
    stats,
    loading,
    error,
    fetchStats,
    clearError,
    isEmpty: stats.length === 0 && !loading,
  };
};
