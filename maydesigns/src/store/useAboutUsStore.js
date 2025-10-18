// stores/useAboutUsStore.js
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import * as api from "../services/api";

export const useAboutUsStore = create(
  persist(
    (set, get) => ({
      // State for all sections
      missionVision: null,
      team: [],
      values: [],
      timeline: [],
      loading: false,
      error: null,
      _hasHydrated: false,

      // Actions
      setHasHydrated: (status) => set({ _hasHydrated: status }),

      // Fetch all sections
      fetchAllSections: async (forceRefresh = false) => {
        const state = get();

        if (state.loading) {
          return;
        }

        set({ loading: true, error: null });

        try {
          const response = await api.fetchAboutUsAPI("/about-us/all");
          const data = response.data || response;

          set({
            missionVision: data.missionVision || state.missionVision,
            team: data.team || state.team,
            values: data.values || state.values,
            timeline: data.timeline || state.timeline,
            loading: false,
            error: null,
          });

          return data;
        } catch (error) {
          const errorMessage =
            error.response?.data?.message ||
            error.message ||
            "Failed to fetch about us data";

          set({
            error: errorMessage,
            loading: false,
          });

          throw error;
        }
      },

      // Fetch individual sections
      fetchMissionVision: async () => {
        try {
          const response = await api.fetchAboutUsAPI(
            "/about-us/mission-vision"
          );
          const data = response.data || response;
          set({ missionVision: data });
          return data;
        } catch (error) {
          const errorMessage = error.response?.data?.message || error.message;
          set({ error: errorMessage });
          throw error;
        }
      },

      fetchTeam: async () => {
        try {
          const response = await api.fetchAboutUsAPI("/about-us/team");
          const data = response.data || response;
          set({ team: data });
          return data;
        } catch (error) {
          const errorMessage = error.response?.data?.message || error.message;
          set({ error: errorMessage });
          throw error;
        }
      },

      fetchValues: async () => {
        try {
          const response = await api.fetchAboutUsAPI("/about-us/values");
          const data = response.data || response;
          set({ values: data });
          return data;
        } catch (error) {
          const errorMessage = error.response?.data?.message || error.message;
          set({ error: errorMessage });
          throw error;
        }
      },

      fetchTimeline: async () => {
        try {
          const response = await api.fetchAboutUsAPI("/about-us/timeline");
          const data = response.data || response;
          set({ timeline: data });
          return data;
        } catch (error) {
          const errorMessage = error.response?.data?.message || error.message;
          set({ error: errorMessage });
          throw error;
        }
      },

      clearError: () => set({ error: null }),
    }),
    {
      name: "about-us-storage",
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
        missionVision: state.missionVision,
        team: state.team,
        values: state.values,
        timeline: state.timeline,
        _hasHydrated: state._hasHydrated,
      }),
    }
  )
);

// Selectors
export const useMissionVision = () =>
  useAboutUsStore((state) => state.missionVision);
export const useTeam = () => useAboutUsStore((state) => state.team);
export const useValues = () => useAboutUsStore((state) => state.values);
export const useTimeline = () => useAboutUsStore((state) => state.timeline);
export const useAboutUsLoading = () =>
  useAboutUsStore((state) => state.loading);
export const useAboutUsError = () => useAboutUsStore((state) => state.error);
export const useFetchAllSections = () =>
  useAboutUsStore((state) => state.fetchAllSections);
export const useFetchMissionVision = () =>
  useAboutUsStore((state) => state.fetchMissionVision);
export const useFetchTeam = () => useAboutUsStore((state) => state.fetchTeam);
export const useFetchValues = () =>
  useAboutUsStore((state) => state.fetchValues);
export const useFetchTimeline = () =>
  useAboutUsStore((state) => state.fetchTimeline);
