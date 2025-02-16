const taskService = require("../services/taskService");
const { successResponse, errorResponse } = require("../helpers/responseHelper");
const schemas = require("../validation/schemas");

class TaskController {
  async getAllTasks(req, res, next) {
    try {
      const tasks = await taskService.getAllTasks(req.user.id);
      return successResponse(res, { tasks });
    } catch (error) {
      next(error);
    }
  }

  async createTask(req, res, next) {
    try {
      const { error } = schemas.taskCreation.validate(req.body);
      if (error) {
        return errorResponse(res, error.details[0].message);
      }

      const task = await taskService.createTask(req.body, req.user.id);
      return successResponse(res, { task }, 201);
    } catch (error) {
      next(error);
    }
  }

  async updateTask(req, res, next) {
    try {
      const { error } = schemas.taskUpdate.validate(req.body);
      if (error) {
        return errorResponse(res, error.details[0].message);
      }

      const task = await taskService.updateTask(
        req.params.id,
        req.user.id,
        req.body
      );
      return successResponse(res, { task });
    } catch (error) {
      if (error.message === "Task not found") {
        return errorResponse(res, error.message, 404);
      }
      next(error);
    }
  }

  async deleteTask(req, res, next) {
    try {
      await taskService.deleteTask(req.params.id, req.user.id);
      return successResponse(res, { message: "Task deleted successfully" });
    } catch (error) {
      if (error.message === "Task not found") {
        return errorResponse(res, error.message, 404);
      }
      next(error);
    }
  }
}

module.exports = new TaskController();
