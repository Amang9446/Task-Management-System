const express = require("express");
const userRoutes = require("./userRoutes");
const taskRoutes = require("./taskRoutes");

const router = express.Router();

// API Routes
router.use("/users", userRoutes);
router.use("/tasks", taskRoutes);

module.exports = router;
