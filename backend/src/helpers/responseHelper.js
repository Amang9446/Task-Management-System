const successResponse = (res, data, statusCode = 200) => {
  return res.status(statusCode).json({
    status: "success",
    data,
  });
};

const errorResponse = (res, message, statusCode = 400) => {
  return res.status(statusCode).json({
    status: "error",
    message,
  });
};

const validationErrorResponse = (res, errors) => {
  return res.status(400).json({
    status: "error",
    message: "Validation error",
    errors: errors.map((e) => ({
      field: e.path,
      message: e.message,
    })),
  });
};

module.exports = {
  successResponse,
  errorResponse,
  validationErrorResponse,
};
