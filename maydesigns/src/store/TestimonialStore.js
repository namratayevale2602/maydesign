// stores/useTestimonialStore.js
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import * as api from "../services/api";

export const useTestimonialStore = create(
  persist(
    (set, get) => ({
      // State
      testimonials: [],
      featuredTestimonials: [],
      loading: false,
      error: null,
      _hasHydrated: false,

      // Actions
      setHasHydrated: (status) => set({ _hasHydrated: status }),

      // Fetch all testimonials
      fetchTestimonials: async (forceRefresh = false) => {
        const state = get();

        if (state.loading) {
          return state.testimonials;
        }

        if (!forceRefresh && state.testimonials.length > 0) {
          return state.testimonials;
        }

        set({ loading: true, error: null });

        try {
          const response = await api.fetchTestimonialsAPI();
          const testimonials = response.data || response;

          set({
            testimonials: testimonials,
            loading: false,
            error: null,
          });

          return testimonials;
        } catch (error) {
          const errorMessage =
            error.response?.data?.message ||
            error.message ||
            "Failed to fetch testimonials";

          set({
            error: errorMessage,
            loading: false,
          });

          throw error;
        }
      },

      // Fetch featured testimonials
      fetchFeaturedTestimonials: async (forceRefresh = false) => {
        const state = get();

        if (!forceRefresh && state.featuredTestimonials.length > 0) {
          return state.featuredTestimonials;
        }

        try {
          const response = await api.fetchFeaturedTestimonialsAPI();
          const featuredTestimonials = response.data || response;

          set({
            featuredTestimonials: featuredTestimonials,
          });

          return featuredTestimonials;
        } catch (error) {
          console.error("Failed to fetch featured testimonials:", error);
          return [];
        }
      },

      clearError: () => set({ error: null }),
      clearTestimonials: () =>
        set({ testimonials: [], featuredTestimonials: [], error: null }),

      getTestimonialById: (id) => {
        return get().testimonials.find((testimonial) => testimonial.id === id);
      },
    }),
    {
      name: "testimonial-storage",
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
        testimonials: state.testimonials,
        featuredTestimonials: state.featuredTestimonials,
        _hasHydrated: state._hasHydrated,
      }),
    }
  )
);

// Individual selectors
export const useTestimonials = () =>
  useTestimonialStore((state) => state.testimonials);
export const useFeaturedTestimonials = () =>
  useTestimonialStore((state) => state.featuredTestimonials);
export const useTestimonialsLoading = () =>
  useTestimonialStore((state) => state.loading);
export const useTestimonialsError = () =>
  useTestimonialStore((state) => state.error);
export const useFetchTestimonials = () =>
  useTestimonialStore((state) => state.fetchTestimonials);
export const useFetchFeaturedTestimonials = () =>
  useTestimonialStore((state) => state.fetchFeaturedTestimonials);
export const useClearTestimonialError = () =>
  useTestimonialStore((state) => state.clearError);

// Combined hook
export const useTestimonial = () => {
  const testimonials = useTestimonials();
  const featuredTestimonials = useFeaturedTestimonials();
  const loading = useTestimonialsLoading();
  const error = useTestimonialsError();
  const fetchTestimonials = useFetchTestimonials();
  const fetchFeaturedTestimonials = useFetchFeaturedTestimonials();
  const clearError = useClearTestimonialError();

  return {
    testimonials,
    featuredTestimonials,
    loading,
    error,
    fetchTestimonials,
    fetchFeaturedTestimonials,
    clearError,
    isEmpty: testimonials.length === 0 && !loading,
  };
};
