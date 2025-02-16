require("dotenv").config();
const { Sequelize } = require("sequelize");

// Check if DATABASE_URL is set
if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL environment variable is not set");
}

// Create the Sequelize instance with proper error handling
let sequelize;
try {
  sequelize = new Sequelize(process.env.DATABASE_URL, {
    dialect: "postgres",
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false,
      },
    },
    logging: false,
  });
} catch (error) {
  console.error("Failed to initialize Sequelize:", error);
  throw error;
}

const db = {
  sequelize,
  Sequelize,
  User: require("./user")(sequelize, Sequelize),
  Task: require("./task")(sequelize, Sequelize),
};

// Define relationships
db.User.hasMany(db.Task, { foreignKey: "userId" });
db.Task.belongsTo(db.User, { foreignKey: "userId" });

module.exports = db;
