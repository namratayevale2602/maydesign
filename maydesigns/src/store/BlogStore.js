import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import * as api from "../services/api";

// Create separate stores for better organization

export const useBlogStore = create(
  persist(
    (set, get) => ({
      // Blog State
      blogs: [],
      blogDetail: null,
      recentPosts: [],
      categories: [],
      blogsLoading: false,
      blogDetailLoading: false,
      categoriesLoading: false,
      blogsError: null,
      blogDetailError: null,
      categoriesError: null,

      // Pagination
      pagination: {
        current_page: 1,
        last_page: 1,
        per_page: 6,
        total: 0,
      },

      // Filters
      filters: {
        search: "",
        category: "All",
        page: 1,
        per_page: 6,
      },

      // Blog Categories
      blogCategories: [
        {
          id: 1,
          name: "Architecture",
          slug: "architecture",
        },
        {
          id: 2,
          name: "Interior Design",
          slug: "interior-design",
        },
        {
          id: 3,
          name: "Landscape",
          slug: "landscape",
        },
        {
          id: 4,
          name: "Technology",
          slug: "technology",
        },
        {
          id: 5,
          name: "Sustainability",
          slug: "sustainability",
        },
      ],

      // Hydration state
      _hasHydrated: false,

      // Actions
      setHasHydrated: (status) => set({ _hasHydrated: status }),

      // Filter Actions
      setSearchFilter: (search) =>
        set((state) => ({
          filters: { ...state.filters, search, page: 1 },
        })),

      setCategoryFilter: (category) =>
        set((state) => ({
          filters: { ...state.filters, category, page: 1 },
        })),

      setPageFilter: (page) =>
        set((state) => ({
          filters: { ...state.filters, page },
        })),

      clearFilters: () =>
        set({
          filters: {
            search: "",
            category: "All",
            page: 1,
            per_page: 6,
          },
        }),

      // Blogs Actions
      fetchBlogs: async (customFilters = {}) => {
        if (!get()._hasHydrated) return;

        set({ blogsLoading: true, blogsError: null });

        try {
          const currentFilters = { ...get().filters, ...customFilters };
          const params = {
            page: currentFilters.page,
            per_page: currentFilters.per_page,
          };

          // Add search if provided
          if (currentFilters.search) {
            params.search = currentFilters.search;
          }

          // Add category if not 'All'
          if (currentFilters.category !== "All") {
            params.category = currentFilters.category;
          }

          const data = await api.fetchBlogsAPI(params);
          const blogs = data.data || data;

          set({
            blogs: blogs,
            pagination: data.meta || {
              current_page: 1,
              last_page: 1,
              per_page: currentFilters.per_page,
              total: blogs.length,
            },
            blogsLoading: false,
          });

          return blogs;
        } catch (error) {
          console.error("Error fetching blogs:", error);
          set({
            blogsError: error.message,
            blogsLoading: false,
          });
          throw error;
        }
      },

      // Blog Detail Actions
      fetchBlogDetail: async (blogSlug) => {
        if (!get()._hasHydrated) return;

        set({ blogDetailLoading: true, blogDetailError: null });

        try {
          const data = await api.fetchBlogDetailAPI(blogSlug);

          set({
            blogDetail: data.data || data,
            blogDetailLoading: false,
          });

          return data.data || data;
        } catch (error) {
          console.error("Error fetching blog detail:", error);
          set({
            blogDetailError: error.message,
            blogDetailLoading: false,
          });
          throw error;
        }
      },

      // Recent Posts Actions
      fetchRecentPosts: async (excludeSlug = null, limit = 3) => {
        if (!get()._hasHydrated) return;

        try {
          const data = await api.fetchRecentPostsAPI(excludeSlug, limit);
          const recentPosts = data.data || data;

          set({
            recentPosts: recentPosts,
          });

          return recentPosts;
        } catch (error) {
          console.error("Error fetching recent posts:", error);
          throw error;
        }
      },

      // Categories Actions
      fetchCategories: async () => {
        if (!get()._hasHydrated) return;

        set({ categoriesLoading: true, categoriesError: null });

        try {
          const data = await api.fetchBlogCategoriesAPI();
          const categories = data.data || data;

          set({
            categories: categories,
            categoriesLoading: false,
          });

          return categories;
        } catch (error) {
          console.error("Error fetching categories:", error);
          set({
            categoriesError: error.message,
            categoriesLoading: false,
          });
          throw error;
        }
      },

      // Clear blog detail
      clearBlogDetail: () => set({ blogDetail: null, blogDetailError: null }),

      // Clear errors
      clearBlogsError: () => set({ blogsError: null }),
      clearBlogDetailError: () => set({ blogDetailError: null }),
      clearCategoriesError: () => set({ categoriesError: null }),

      // Reset to default
      resetBlogs: () =>
        set({
          blogs: [],
          blogDetail: null,
          recentPosts: [],
          blogsError: null,
          blogDetailError: null,
          categoriesError: null,
          filters: {
            search: "",
            category: "All",
            page: 1,
            per_page: 6,
          },
          pagination: {
            current_page: 1,
            last_page: 1,
            per_page: 6,
            total: 0,
          },
        }),
    }),
    {
      name: "blog-storage",
      storage: createJSONStorage(() => localStorage),
      onRehydrateStorage: () => (state) => {
        state?.setHasHydrated(true);
      },
      partialize: (state) => ({
        filters: state.filters,
        pagination: state.pagination,
      }),
    }
  )
);

// Selectors
export const useBlogs = () => useBlogStore((state) => state.blogs);
export const useBlogDetail = () => useBlogStore((state) => state.blogDetail);
export const useRecentPosts = () => useBlogStore((state) => state.recentPosts);
export const useCategories = () => useBlogStore((state) => state.categories);
export const useBlogsLoading = () =>
  useBlogStore((state) => state.blogsLoading);
export const useBlogDetailLoading = () =>
  useBlogStore((state) => state.blogDetailLoading);
export const useCategoriesLoading = () =>
  useBlogStore((state) => state.categoriesLoading);
export const useBlogsError = () => useBlogStore((state) => state.blogsError);
export const useBlogDetailError = () =>
  useBlogStore((state) => state.blogDetailError);
export const useCategoriesError = () =>
  useBlogStore((state) => state.categoriesError);
export const useBlogPagination = () =>
  useBlogStore((state) => state.pagination);
export const useBlogFilters = () => useBlogStore((state) => state.filters);
export const useBlogCategories = () =>
  useBlogStore((state) => state.blogCategories);

// Action selectors
export const useFetchBlogs = () => useBlogStore((state) => state.fetchBlogs);
export const useFetchBlogDetail = () =>
  useBlogStore((state) => state.fetchBlogDetail);
export const useFetchRecentPosts = () =>
  useBlogStore((state) => state.fetchRecentPosts);
export const useFetchCategories = () =>
  useBlogStore((state) => state.fetchCategories);

// Filter action selectors
export const useSetSearchFilter = () =>
  useBlogStore((state) => state.setSearchFilter);
export const useSetCategoryFilter = () =>
  useBlogStore((state) => state.setCategoryFilter);
export const useSetPageFilter = () =>
  useBlogStore((state) => state.setPageFilter);
export const useClearFilters = () =>
  useBlogStore((state) => state.clearFilters);

export const useBlogActions = () =>
  useBlogStore((state) => ({
    fetchBlogs: state.fetchBlogs,
    fetchBlogDetail: state.fetchBlogDetail,
    fetchRecentPosts: state.fetchRecentPosts,
    fetchCategories: state.fetchCategories,
    setSearchFilter: state.setSearchFilter,
    setCategoryFilter: state.setCategoryFilter,
    setPageFilter: state.setPageFilter,
    clearFilters: state.clearFilters,
    clearBlogDetail: state.clearBlogDetail,
    clearBlogsError: state.clearBlogsError,
    clearBlogDetailError: state.clearBlogDetailError,
    clearCategoriesError: state.clearCategoriesError,
    resetBlogs: state.resetBlogs,
  }));

// Combined hooks for components
export const useBlog = () => {
  const blogs = useBlogs();
  const loading = useBlogsLoading();
  const error = useBlogsError();
  const fetchBlogs = useFetchBlogs();
  const filters = useBlogFilters();
  const pagination = useBlogPagination();

  return {
    blogs,
    loading,
    error,
    fetchBlogs,
    filters,
    pagination,
  };
};

export const useBlogData = () => {
  const blogs = useBlogs();
  const blogDetail = useBlogDetail();
  const recentPosts = useRecentPosts();
  const categories = useCategories();
  const blogsLoading = useBlogsLoading();
  const blogDetailLoading = useBlogDetailLoading();
  const categoriesLoading = useCategoriesLoading();
  const blogsError = useBlogsError();
  const blogDetailError = useBlogDetailError();
  const categoriesError = useCategoriesError();
  const blogCategories = useBlogCategories();
  const filters = useBlogFilters();
  const pagination = useBlogPagination();

  const fetchBlogs = useFetchBlogs();
  const fetchBlogDetail = useFetchBlogDetail();
  const fetchRecentPosts = useFetchRecentPosts();
  const fetchCategories = useFetchCategories();
  const clearBlogDetail = useBlogStore((state) => state.clearBlogDetail);
  const setSearchFilter = useSetSearchFilter();
  const setCategoryFilter = useSetCategoryFilter();
  const setPageFilter = useSetPageFilter();
  const clearFilters = useClearFilters();

  return {
    blogs,
    blogDetail,
    recentPosts,
    categories,
    blogsLoading,
    blogDetailLoading,
    categoriesLoading,
    blogsError,
    blogDetailError,
    categoriesError,
    blogCategories,
    filters,
    pagination,
    fetchBlogs,
    fetchBlogDetail,
    fetchRecentPosts,
    fetchCategories,
    clearBlogDetail,
    setSearchFilter,
    setCategoryFilter,
    setPageFilter,
    clearFilters,
  };
};
