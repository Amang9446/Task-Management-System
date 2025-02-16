const Joi = require("joi");

const schemas = {
  userRegistration: Joi.object({
    name: Joi.string().required().min(2).max(50),
    email: Joi.string().email().required(),
    password: Joi.string().required().min(6),
  }),

  userLogin: Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  }),

  taskCreation: Joi.object({
    title: Joi.string().required().min(1).max(100),
    description: Joi.string().allow("", null),
    status: Joi.string().valid("pending", "in_progress", "completed"),
    dueDate: Joi.date().required(),
    priority: Joi.string().valid("low", "medium", "high").required(),
  }),

  taskUpdate: Joi.object({
    title: Joi.string().min(1).max(100),
    description: Joi.string().allow("", null),
    status: Joi.string().valid("pending", "in_progress", "completed"),
    dueDate: Joi.date(),
    priority: Joi.string().valid("low", "medium", "high"),
  }),
};

module.exports = schemas;
