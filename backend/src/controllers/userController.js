const userService = require("../services/userService");
const { successResponse, errorResponse } = require("../helpers/responseHelper");
const schemas = require("../validation/schemas");

class UserController {
  register = async (req, res, next) => {
    try {
      const { error } = schemas.userRegistration.validate(req.body);
      if (error) {
        return errorResponse(res, error.details[0].message);
      }

      const result = await userService.createUser(req.body);
      return successResponse(res, result, 201);
    } catch (error) {
      next(error);
    }
  };

  login = async (req, res, next) => {
    try {
      const { error } = schemas.userLogin.validate(req.body);
      if (error) {
        return errorResponse(res, error.details[0].message);
      }

      const { email, password } = req.body;
      const result = await userService.loginUser(email, password);
      return successResponse(res, result);
    } catch (error) {
      if (error.message === "Invalid email or password") {
        return errorResponse(res, error.message, 401);
      }
      next(error);
    }
  };

  getProfile = async (req, res, next) => {
    try {
      const user = await userService.getUserById(req.user.id);
      return successResponse(res, { user });
    } catch (error) {
      next(error);
    }
  };
}

module.exports = new UserController();
