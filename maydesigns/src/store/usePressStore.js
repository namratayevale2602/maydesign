// stores/usePressStore.js
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import * as api from "../services/api";

export const usePressStore = create(
  persist(
    (set, get) => ({
      // State
      press: [],
      featuredPress: [],
      loading: false,
      error: null,
      _hasHydrated: false,

      // Actions
      setHasHydrated: (status) => set({ _hasHydrated: status }),

      // Fetch all press
      fetchPress: async (forceRefresh = false) => {
        const state = get();

        if (state.loading) {
          return state.press;
        }

        if (!forceRefresh && state.press.length > 0) {
          return state.press;
        }

        set({ loading: true, error: null });

        try {
          const response = await api.fetchPressAPI();
          // Handle the nested data structure from your API
          const pressData = response.success ? response.data : response;
          const press = Array.isArray(pressData) ? pressData : [];

          set({
            press: press,
            loading: false,
            error: null,
          });

          return press;
        } catch (error) {
          const errorMessage =
            error.response?.data?.message ||
            error.message ||
            "Failed to fetch press";

          set({
            error: errorMessage,
            loading: false,
          });

          throw error;
        }
      },

      // Fetch featured press
      fetchFeaturedPress: async (forceRefresh = false) => {
        const state = get();

        if (!forceRefresh && state.featuredPress.length > 0) {
          return state.featuredPress;
        }

        try {
          const response = await api.fetchFeaturedPressAPI();
          // Handle the nested data structure from your API
          const featuredData = response.success ? response.data : response;
          const featuredPress = Array.isArray(featuredData) ? featuredData : [];

          set({
            featuredPress: featuredPress,
          });

          return featuredPress;
        } catch (error) {
          console.error("Failed to fetch featured press:", error);
          return [];
        }
      },

      clearError: () => set({ error: null }),
      clearPress: () => set({ press: [], featuredPress: [], error: null }),

      getPressById: (id) => {
        return get().press.find((pressItem) => pressItem.id === id);
      },
    }),
    {
      name: "press-storage",
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
        press: state.press,
        featuredPress: state.featuredPress,
        _hasHydrated: state._hasHydrated,
      }),
    }
  )
);

// Individual selectors
export const usePress = () => usePressStore((state) => state.press);
export const useFeaturedPress = () =>
  usePressStore((state) => state.featuredPress);
export const usePressLoading = () => usePressStore((state) => state.loading);
export const usePressError = () => usePressStore((state) => state.error);
export const useFetchPress = () => usePressStore((state) => state.fetchPress);
export const useFetchFeaturedPress = () =>
  usePressStore((state) => state.fetchFeaturedPress);
export const useClearPressError = () =>
  usePressStore((state) => state.clearError);

// Combined hook
export const usePressData = () => {
  const press = usePress();
  const featuredPress = useFeaturedPress();
  const loading = usePressLoading();
  const error = usePressError();
  const fetchPress = useFetchPress();
  const fetchFeaturedPress = useFetchFeaturedPress();
  const clearError = useClearPressError();

  return {
    press,
    featuredPress,
    loading,
    error,
    fetchPress,
    fetchFeaturedPress,
    clearError,
    isEmpty: press.length === 0 && !loading,
  };
};
