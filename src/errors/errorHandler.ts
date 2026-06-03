import config from "@/config/env.config.js";
import type { ErrorRequestHandler } from "express";
import getErrorMessage from "./getErrorMessage.js";
import CustomError from "./customError.js";

const errorHandler: ErrorRequestHandler = (error, req, res, next) => {
  if (res.headersSent || config.debug) {
    next(error);
    return;
  }

  if (error instanceof CustomError) {
    res.status(error.statusCode).json({
      error: {
        message: error.message,
        code: error.code as string,
      },
    });
  }

  res.status(500).json({
    error: {
      message:
        getErrorMessage(error) ||
        "An error occurred. Please view logs for more details",
    },
  });
};

export default errorHandler;
