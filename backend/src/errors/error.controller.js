import { AppError } from "./appError.js";
import Error from "./error.model.js";

const handleDatabaseErrors = (error) => {
  switch (error.parent?.code) {
    case "22001":
      return new AppError(
        "Value too long for type on attribute in database",
        400
      );
    case "23505":
      return new AppError(
        "Duplicate field value: please use another value",
        400
      );
    case "22P02":
    case "23503":
      return new AppError("Invalid data type in database", 400);
    default:
      return error;
  }
};

const handleJWTError = (error) => {
  if (error.name === "TokenExpiredError") {
    return new AppError("Your token has expired. Please login again", 401);
  }
  if (error.name === "JsonWebTokenError") {
    return new AppError("Invalid token. Please login again", 401);
  }
  return error;
};

const sendErrorDev = (err, res) => {
  res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
    stack: err.stack,
    error: err,
  });
};

const sendErrorProd = async (err, res) => {
  await Error.create({
    status: err.status,
    message: err.message,
    stack: err.stack,
  });

  if (err.isOperational) {
    res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
    });
  } else {
    console.error("ERROR", err);
    res.status(500).json({
      status: "fail",
      message: "Something went very wrong!",
    });
  }
};

export const globalErrorHandler = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "fail";

  if (process.env.NODE_ENV === "development") {
    sendErrorDev(err, res);
  } else if (process.env.NODE_ENV === "production") {
    let error = handleDatabaseErrors(err);
    error = handleJWTError(error);
    sendErrorProd(error, res);
  }
};
