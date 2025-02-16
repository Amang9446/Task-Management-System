import { axiosInstance } from "./authService";

export const taskService = {
  // Get all tasks for the current user
  getAllTasks: async () => {
    const response = await axiosInstance.get(`/tasks`);
    return response.data.data.tasks;
  },

  // Create a new task
  createTask: async (taskData) => {
    const response = await axiosInstance.post(`/tasks`, taskData);
    return response.data.data.task;
  },

  // Update an existing task
  updateTask: async (taskId, taskData) => {
    const response = await axiosInstance.patch(`/tasks/${taskId}`, taskData);
    return response.data.data.task;
  },

  // Delete a task
  deleteTask: async (taskId) => {
    const response = await axiosInstance.delete(`/tasks/${taskId}`);
    return response.data.data;
  },

  // Get a single task by ID
  getTaskById: async (taskId) => {
    const response = await axiosInstance.get(`/tasks/${taskId}`);
    return response.data.data.task;
  },
};
