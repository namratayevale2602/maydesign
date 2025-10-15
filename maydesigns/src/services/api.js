import axios from "axios";

// Create axios instance
const api = axios.create({
  baseURL: "http://127.0.0.1:8000/api",
  headers: {
    "Content-Type": "application/json",
  },
});

// Function to log responses (client-side only)
const logResponse = (endpoint, data) => {
  if (typeof window !== "undefined") {
    console.log(`Response from ${endpoint}:`, data);
  }
  return data;
};

// Function to log errors (client-side only)
const logError = (endpoint, error) => {
  if (typeof window !== "undefined") {
    console.error(`Error from ${endpoint}:`, error);
  }
  return Promise.reject(error);
};

// API functions

// Blog API functions
// Blog API functions
export const fetchBlogsAPI = async (params = {}) => {
  try {
    if (typeof window !== "undefined") {
      console.log(`Fetching blogs with params:`, params);
    }

    const response = await api.get("/blogs", { params });
    return logResponse("/blogs", response.data);
  } catch (error) {
    return logError("/blogs", error);
  }
};

export const fetchBlogDetailAPI = async (slug) => {
  try {
    if (typeof window !== "undefined") {
      console.log(`Fetching blog detail:`, slug);
    }

    const response = await api.get(`/blogs/${slug}`);
    return logResponse(`/blogs/${slug}`, response.data);
  } catch (error) {
    return logError(`/blogs/${slug}`, error);
  }
};

export const fetchBlogCategoriesAPI = async () => {
  try {
    const response = await api.get("/blogs/categories");
    return logResponse("/blogs/categories", response.data);
  } catch (error) {
    return logError("/blogs/categories", error);
  }
};

export const fetchRecentPostsAPI = async (excludeSlug = null, limit = 3) => {
  try {
    const response = await api.get(`/blogs/${excludeSlug}/recent`, {
      params: { limit },
    });
    return logResponse(`/blogs/${excludeSlug}/recent`, response.data);
  } catch (error) {
    return logError(`/blogs/${excludeSlug}/recent`, error);
  }
};

// Hero Projects API
// Hero Projects API
export const fetchHeroProjectAPI = async (params = {}) => {
  try {
    if (typeof window !== "undefined") {
      console.log(`🔗 Fetching Hero Projects...`);
    }
    const response = await api.get("/hero-projects", { params });
    return logResponse("/hero-projects", response.data);
  } catch (error) {
    return logError("/hero-projects", error);
  }
};

export const fetchStatsAPI = async (params = {}) => {
  try {
    if (typeof window !== "undefined") {
      console.log(`Fetching Stats...`);
    }
    const response = await api.get("/stats", { params });
    return logResponse("/stats", response.data);
  } catch (error) {
    return logError("/stats", error);
  }
};

// About Section API functions
export const fetchAboutSectionAPI = async () => {
  try {
    if (typeof window !== "undefined") {
      console.log(`Fetching About Section...`);
    }
    const response = await api.get("/about-section");
    return logResponse("/about-section", response.data);
  } catch (error) {
    return logError("/about-section", error);
  }
};

export const fetchTestimonialsAPI = async (params = {}) => {
  try {
    if (typeof window !== "undefined") {
      console.log(`Fetching Testimonials...`);
    }
    const response = await api.get("/testimonials", { params });
    return logResponse("/testimonials", response.data);
  } catch (error) {
    return logError("/testimonials", error);
  }
};

export const fetchPressAPI = async (params = {}) => {
  try {
    if (typeof window !== "undefined") {
      console.log(`Fetching Press...`);
    }
    const response = await api.get("/press", { params });
    return logResponse("/press", response.data);
  } catch (error) {
    return logError("/press", error);
  }
};

export const fetchFeaturedPressAPI = async (params = {}) => {
  try {
    if (typeof window !== "undefined") {
      console.log(`Fetching Featured Press...`);
    }
    const response = await api.get("/press/featured", { params });
    return logResponse("/press/featured", response.data);
  } catch (error) {
    return logError("/press/featured", error);
  }
};

export default api;
