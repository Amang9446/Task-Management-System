import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

// Create a new axios instance with default config
export const axiosInstance = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Initialize headers from localStorage
const token = localStorage.getItem("token");
if (token) {
  axiosInstance.defaults.headers.common["Authorization"] = `Bearer ${token}`;
}

// Configure axios interceptors
export const setupAxiosInterceptors = (onUnauthorized) => {
  const requestInterceptor = axiosInstance.interceptors.request.use(
    (config) => {
      const token = localStorage.getItem("token");
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error) => Promise.reject(error)
  );

  const responseInterceptor = axiosInstance.interceptors.response.use(
    (response) => response,
    async (error) => {
      if (error.response?.status === 401) {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        delete axiosInstance.defaults.headers.common["Authorization"];
        onUnauthorized();
      }
      return Promise.reject(error);
    }
  );

  return () => {
    axiosInstance.interceptors.request.eject(requestInterceptor);
    axiosInstance.interceptors.response.eject(responseInterceptor);
  };
};

export const authService = {
  login: async (email, password) => {
    const response = await axiosInstance.post(`/users/login`, {
      email,
      password,
    });

    const { token, user } = response.data.data;
    if (token && user) {
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));
      axiosInstance.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${token}`;
    }
    return { token, user };
  },

  register: async (userData) => {
    const response = await axiosInstance.post(`/users/register`, userData);

    const { token, user } = response.data.data;
    if (token && user) {
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));
      axiosInstance.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${token}`;
    }
    return { token, user };
  },

  getCurrentUser: async () => {
    const token = localStorage.getItem("token");
    const storedUser = localStorage.getItem("user");

    if (!token) {
      return null;
    }

    try {
      // First try to get user from localStorage
      if (storedUser) {
        return JSON.parse(storedUser);
      }

      // If no stored user, fetch from API
      const response = await axiosInstance.get(`/users/me`);
      const user = response.data.data;

      // Store the fresh user data
      localStorage.setItem("user", JSON.stringify(user));
      return user;
    } catch (error) {
      if (error.response?.status === 401) {
        authService.logout();
      }
      throw error;
    }
  },

  logout: () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    delete axiosInstance.defaults.headers.common["Authorization"];
  },

  getToken: () => {
    return localStorage.getItem("token");
  },

  setToken: (token) => {
    if (token) {
      localStorage.setItem("token", token);
      axiosInstance.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${token}`;
    } else {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      delete axiosInstance.defaults.headers.common["Authorization"];
    }
  },
};
