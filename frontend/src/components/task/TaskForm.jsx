import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "react-query";
import toast from "react-hot-toast";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

export default function TaskForm() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const queryClient = useQueryClient();

  const createTask = async (data) => {
    const response = await axios.post(`${API_URL}/tasks`, data);
    return response.data;
  };

  const mutation = useMutation(createTask, {
    onSuccess: () => {
      queryClient.invalidateQueries("tasks");
      toast.success("Task created successfully!");
      reset();
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || "Failed to create task");
    },
  });

  const onSubmit = (data) => {
    mutation.mutate(data);
  };

  return (
    <div className="card">
      <h2 className="text-xl font-semibold text-primary mb-4">
        Create New Task
      </h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label
            htmlFor="title"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Title
          </label>
          <input
            type="text"
            id="title"
            {...register("title", { required: "Title is required" })}
            className="input-field"
            placeholder="Enter task title"
          />
          {errors.title && (
            <p className="mt-1 text-sm text-red-600">{errors.title.message}</p>
          )}
        </div>

        <div>
          <label
            htmlFor="description"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Description
          </label>
          <textarea
            id="description"
            {...register("description", {
              required: "Description is required",
            })}
            rows={3}
            className="input-field"
            placeholder="Enter task description"
          />
          {errors.description && (
            <p className="mt-1 text-sm text-red-600">
              {errors.description.message}
            </p>
          )}
        </div>

        <div>
          <label
            htmlFor="dueDate"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Due Date
          </label>
          <input
            type="date"
            id="dueDate"
            {...register("dueDate", { required: "Due date is required" })}
            className="input-field"
          />
          {errors.dueDate && (
            <p className="mt-1 text-sm text-red-600">
              {errors.dueDate.message}
            </p>
          )}
        </div>

        <div>
          <label
            htmlFor="priority"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Priority
          </label>
          <select
            id="priority"
            {...register("priority", { required: "Priority is required" })}
            className="input-field"
          >
            <option value="">Select priority</option>
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
          {errors.priority && (
            <p className="mt-1 text-sm text-red-600">
              {errors.priority.message}
            </p>
          )}
        </div>

        <button
          type="submit"
          className="btn-primary w-full"
          disabled={mutation.isLoading}
        >
          {mutation.isLoading ? "Creating..." : "Create Task"}
        </button>
      </form>
    </div>
  );
}
