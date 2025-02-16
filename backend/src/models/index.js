const { Sequelize } = require("sequelize");

const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: "postgres",
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false,
    },
  },
  logging: false,
});

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
