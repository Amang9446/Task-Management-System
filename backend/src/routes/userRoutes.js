const express = require("express");
const userController = require("../controllers/userController");
const auth = require("../middleware/auth");

const router = express.Router();

// Register new user
router.post("/register", (req, res, next) =>
  userController.register(req, res, next)
);

// Login user
router.post("/login", (req, res, next) => userController.login(req, res, next));

// Get current user profile
router.get("/me", auth, (req, res, next) =>
  userController.getProfile(req, res, next)
);

module.exports = router;
