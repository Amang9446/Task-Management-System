require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { sequelize } = require("./models");
const routes = require("./routes");
const errorHandler = require("./middleware/errorHandler");

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(
  cors({
    origin: "*", // Allowed all origins for now
  })
);
app.use(express.json());

// Routes
app.use("/api", routes);

// Error handling middleware
app.use(errorHandler);

// Database connection and server start
async function startServer() {
  try {
    await sequelize.authenticate();
    console.log("Database connection established successfully.");

    // Sync database models
    await sequelize.sync({ alter: true });
    console.log("Database models synchronized.");

    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Unable to start server:", error);
  }
}

startServer();
