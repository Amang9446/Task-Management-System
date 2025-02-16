"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn("Tasks", "dueDate", {
      type: Sequelize.DATE,
      allowNull: false,
      defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
    });

    await queryInterface.addColumn("Tasks", "priority", {
      type: Sequelize.ENUM("low", "medium", "high"),
      allowNull: false,
      defaultValue: "low",
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn("Tasks", "dueDate");
    await queryInterface.removeColumn("Tasks", "priority");
    await queryInterface.sequelize.query(
      'DROP TYPE IF EXISTS "enum_Tasks_priority";'
    );
  },
};
