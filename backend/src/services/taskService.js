const { Task } = require("../models");

class TaskService {
  async getAllTasks(userId) {
    return await Task.findAll({
      where: { userId },
      order: [["createdAt", "DESC"]],
    });
  }

  async createTask(taskData, userId) {
    return await Task.create({
      ...taskData,
      userId,
    });
  }

  async updateTask(taskId, userId, updateData) {
    const task = await this.findUserTask(taskId, userId);
    await task.update(updateData);
    return task;
  }

  async deleteTask(taskId, userId) {
    const task = await this.findUserTask(taskId, userId);
    await task.destroy();
    return true;
  }

  async findUserTask(taskId, userId) {
    const task = await Task.findOne({
      where: {
        id: taskId,
        userId,
      },
    });

    if (!task) {
      throw new Error("Task not found");
    }

    return task;
  }
}

module.exports = new TaskService();
