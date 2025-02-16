import { useCallback, useEffect } from "react";
import { useNavigate } from "react-router";
import { useAuth } from "../context/AuthContext";
import { authService, setupAxiosInterceptors } from "../services/authService";
import toast from "react-hot-toast";

export const useAuthHandler = () => {
  const { setUser, setLoading } = useAuth();
  const navigate = useNavigate();

  const handleUnauthorized = useCallback(() => {
    setUser(null);
    navigate("/login");
    toast.error("Session expired. Please login again.");
  }, [navigate, setUser]);

  useEffect(() => {
    const cleanup = setupAxiosInterceptors(handleUnauthorized);
    return () => cleanup();
  }, [handleUnauthorized]);

  const login = useCallback(
    async (email, password) => {
      try {
        setLoading(true);
        const { user } = await authService.login(email, password);

        if (!user) {
          throw new Error("No user data received");
        }

        setUser(user);
        navigate("/");
        toast.success("Login successful!");
        return true;
      } catch (error) {
        console.error("Login failed:", error);
        const errorMessage =
          error.response?.data?.message || error.message || "Login failed";
        toast.error(errorMessage);
        return false;
      } finally {
        setLoading(false);
      }
    },
    [navigate, setUser, setLoading]
  );

  const register = useCallback(
    async (userData) => {
      try {
        setLoading(true);
        const { user } = await authService.register(userData);

        if (!user) {
          throw new Error("No user data received");
        }

        setUser(user);
        navigate("/");
        toast.success("Registration successful! Welcome aboard!");
        return true;
      } catch (error) {
        console.error("Registration failed:", error);
        const errorMessage =
          error.response?.data?.errors[0].message ||
          error.message ||
          "Registration failed";
        toast.error(errorMessage);
        throw error;
      } finally {
        setLoading(false);
      }
    },
    [navigate, setUser, setLoading]
  );

  const logout = useCallback(() => {
    authService.logout();
    setUser(null);
    navigate("/login");
    toast.success("Logged out successfully");
  }, [navigate, setUser]);

  return {
    login,
    register,
    logout,
  };
};
