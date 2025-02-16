import { useQuery, useMutation, useQueryClient } from "react-query";
import { useState } from "react";
import toast from "react-hot-toast";
import TaskEditModal from "./TaskEditModal";
import { taskService } from "../../services/taskService";
import { useAuth } from "../../context/AuthContext";

export default function TaskList() {
  const [editingTask, setEditingTask] = useState(null);
  const queryClient = useQueryClient();
  const { user } = useAuth();

  const {
    data: tasks,
    isLoading,
    error,
  } = useQuery(["tasks", user?.id], async () => {
    try {
      const data = await taskService.getAllTasks();
      return data || [];
    } catch (error) {
      console.error("Error fetching tasks:", error);
      throw error;
    }
  });

  const deleteMutation = useMutation(
    async (taskId) => {
      await taskService.deleteTask(taskId);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["tasks", user?.id]);
        toast.success("Task deleted successfully!");
      },
      onError: (error) => {
        toast.error(error.response?.data?.message || "Failed to delete task");
      },
    }
  );

  const handleDelete = (taskId) => {
    if (window.confirm("Are you sure you want to delete this task?")) {
      deleteMutation.mutate(taskId);
    }
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case "high":
        return "bg-red-100 text-red-800";
      case "medium":
        return "bg-yellow-100 text-yellow-800";
      case "low":
        return "bg-green-100 text-green-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-800";
      case "in_progress":
        return "bg-blue-100 text-blue-800";
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  if (isLoading) {
    return (
      <div className="card">
        <div className="animate-pulse space-y-4">
          <div className="h-4 bg-gray-200 rounded w-3/4"></div>
          <div className="h-4 bg-gray-200 rounded w-1/2"></div>
          <div className="h-4 bg-gray-200 rounded w-5/6"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="card bg-red-50">
        <p className="text-red-600">
          Error loading tasks: {error.response?.data?.message || error.message}
        </p>
      </div>
    );
  }

  const taskList = Array.isArray(tasks) ? tasks : [];

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold text-primary">Your Tasks</h2>

      {taskList.length === 0 ? (
        <div className="card text-center text-gray-500">
          No tasks found. Create one above!
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2">
          {taskList.map((task) => (
            <div
              key={task.id}
              className="card hover:shadow-lg transition-shadow duration-200"
            >
              <div className="flex justify-between items-start">
                <div className="space-y-2">
                  <h3 className="font-medium text-lg">{task.title}</h3>
                  <p className="text-gray-600">{task.description}</p>
                  <div className="flex flex-wrap gap-2 text-sm">
                    <span className="text-gray-500">
                      Due: {formatDate(task.dueDate)}
                    </span>
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(
                        task.priority
                      )}`}
                    >
                      {task.priority}
                    </span>
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(
                        task.status
                      )}`}
                    >
                      {task.status.replace("_", " ")}
                    </span>
                  </div>
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={() => setEditingTask(task)}
                    className="text-secondary hover:text-primary transition-colors"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                    </svg>
                  </button>
                  <button
                    onClick={() => handleDelete(task.id)}
                    className="text-red-400 hover:text-red-600 transition-colors"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {editingTask && (
        <TaskEditModal
          task={editingTask}
          onClose={() => setEditingTask(null)}
        />
      )}
    </div>
  );
}
