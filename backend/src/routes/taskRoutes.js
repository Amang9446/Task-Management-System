const express = require("express");
const taskController = require("../controllers/taskController");
const auth = require("../middleware/auth");
const schemas = require("../validation/schemas");

const router = express.Router();

// Get all tasks for current user
router.get("/", auth, (req, res, next) =>
  taskController.getAllTasks(req, res, next)
);

// Create new task
router.post("/", auth, (req, res, next) =>
  taskController.createTask(req, res, next)
);

// Update task
router.patch("/:id", auth, (req, res, next) =>
  taskController.updateTask(req, res, next)
);

// Delete task
router.delete("/:id", auth, (req, res, next) =>
  taskController.deleteTask(req, res, next)
);

module.exports = router;
