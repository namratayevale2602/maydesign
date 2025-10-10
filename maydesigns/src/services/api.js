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

export default api;
