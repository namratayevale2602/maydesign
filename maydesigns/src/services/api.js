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

// Awards API
export const fetchAwardsAPI = async (params = {}) => {
  try {
    if (typeof window !== "undefined") {
      console.log(`Fetching Awards...`, params);
    }
    const response = await api.get("/awards", { params });
    return logResponse("/awards", response.data);
  } catch (error) {
    return logError("/awards", error);
  }
};

export const fetchFeaturedAwardsAPI = async (params = {}) => {
  try {
    if (typeof window !== "undefined") {
      console.log(`etching Featured Awards...`);
    }
    const response = await api.get("/awards/featured", { params });
    return logResponse("/awards/featured", response.data);
  } catch (error) {
    return logError("/awards/featured", error);
  }
};

export const fetchAwardYearsAPI = async () => {
  try {
    if (typeof window !== "undefined") {
      console.log(`Fetching Award Years...`);
    }
    const response = await api.get("/awards/years");
    return logResponse("/awards/years", response.data);
  } catch (error) {
    return logError("/awards/years", error);
  }
};

// Projects API calls
export const fetchProjectsAPI = async (params = {}) => {
  try {
    if (typeof window !== "undefined") {
      console.log(`🏗️ Fetching Projects...`, params);
    }
    const response = await api.get("/projects", { params });
    return logResponse("/projects", response.data);
  } catch (error) {
    return logError("/projects", error);
  }
};

export const fetchFeaturedProjectsAPI = async (params = {}) => {
  try {
    if (typeof window !== "undefined") {
      console.log(`⭐ Fetching Featured Projects...`, params);
    }
    const response = await api.get("/projects/featured", { params });
    return logResponse("/projects/featured", response.data);
  } catch (error) {
    return logError("/projects/featured", error);
  }
};

export const fetchProjectCategoriesAPI = async (params = {}) => {
  try {
    if (typeof window !== "undefined") {
      console.log(`📂 Fetching Project Categories...`, params);
    }
    const response = await api.get("/projects/categories", { params });
    return logResponse("/projects/categories", response.data);
  } catch (error) {
    return logError("/projects/categories", error);
  }
};

export const fetchProjectByIdAPI = async (id, params = {}) => {
  try {
    if (typeof window !== "undefined") {
      console.log(`📋 Fetching Project ${id}...`, params);
    }
    const response = await api.get(`/projects/${id}`, { params });
    return logResponse(`/projects/${id}`, response.data);
  } catch (error) {
    return logError(`/projects/${id}`, error);
  }
};

export const fetchProjectBySlugAPI = async (slug, params = {}) => {
  try {
    if (typeof window !== "undefined") {
      console.log(`📋 Fetching Project by Slug: ${slug}...`, params);
    }
    const response = await api.get(`/projects/slug/${slug}`, { params });
    return logResponse(`/projects/slug/${slug}`, response.data);
  } catch (error) {
    return logError(`/projects/slug/${slug}`, error);
  }
};

export const fetchProjectsByCategoryAPI = async (category, params = {}) => {
  try {
    if (typeof window !== "undefined") {
      console.log(`🏷️ Fetching ${category} Projects...`, params);
    }
    const response = await api.get(`/projects/category/${category}`, {
      params,
    });
    return logResponse(`/projects/category/${category}`, response.data);
  } catch (error) {
    return logError(`/projects/category/${category}`, error);
  }
};

export const fetchCategoryTypesAPI = async (category, params = {}) => {
  try {
    if (typeof window !== "undefined") {
      console.log(`📊 Fetching ${category} Types...`, params);
    }
    const response = await api.get(`/projects/category/${category}/types`, {
      params,
    });
    return logResponse(`/projects/category/${category}/types`, response.data);
  } catch (error) {
    return logError(`/projects/category/${category}/types`, error);
  }
};

export const fetchInteriorByTypeAPI = async (type, params = {}) => {
  try {
    if (typeof window !== "undefined") {
      console.log(`🏠 Fetching ${type} Interior Projects...`, params);
    }
    const response = await api.get(`/projects/interior/${type}`, { params });
    return logResponse(`/projects/interior/${type}`, response.data);
  } catch (error) {
    return logError(`/projects/interior/${type}`, error);
  }
};

export const fetchProjectYearsAPI = async () => {
  try {
    if (typeof window !== "undefined") {
      console.log(`📅 Fetching Project Years...`);
    }
    const response = await api.get("/projects/years");
    return logResponse("/projects/years", response.data);
  } catch (error) {
    return logError("/projects/years", error);
  }
};

export const fetchProjectStatsAPI = async () => {
  try {
    if (typeof window !== "undefined") {
      console.log(`📊 Fetching Project Stats...`);
    }
    const response = await api.get("/projects/stats");
    return logResponse("/projects/stats", response.data);
  } catch (error) {
    return logError("/projects/stats", error);
  }
};

export const fetchSimilarProjectsAPI = async (projectId) => {
  try {
    if (typeof window !== "undefined") {
      console.log(`🔍 Fetching Similar Projects for ${projectId}...`);
    }
    const response = await api.get(`/projects/${projectId}/similar`);
    return logResponse(`/projects/${projectId}/similar`, response.data);
  } catch (error) {
    return logError(`/projects/${projectId}/similar`, error);
  }
};

// Awards API calls
// export const fetchAwardsAPI = async (params = {}) => {
//   try {
//     if (typeof window !== "undefined") {
//       console.log(`🏆 Fetching Awards...`, params);
//     }
//     const response = await api.get("/awards", { params });
//     return logResponse("/awards", response.data);
//   } catch (error) {
//     return logError("/awards", error);
//   }
// };

// export const fetchFeaturedAwardsAPI = async () => {
//   try {
//     if (typeof window !== "undefined") {
//       console.log(`⭐ Fetching Featured Awards...`);
//     }
//     const response = await api.get("/awards/featured");
//     return logResponse("/awards/featured", response.data);
//   } catch (error) {
//     return logError("/awards/featured", error);
//   }
// };

// export const fetchAwardYearsAPI = async () => {
//   try {
//     if (typeof window !== "undefined") {
//       console.log(`📅 Fetching Award Years...`);
//     }
//     const response = await api.get("/awards/years");
//     return logResponse("/awards/years", response.data);
//   } catch (error) {
//     return logError("/awards/years", error);
//   }
// };

export const fetchAboutUsAPI = async (endpoint, params = {}) => {
  try {
    if (typeof window !== "undefined") {
      console.log(`🔗 Fetching ${endpoint}...`);
    }
    const response = await api.get(endpoint, { params });
    return logResponse(endpoint, response.data);
  } catch (error) {
    return logError(endpoint, error);
  }
};

export default api;
