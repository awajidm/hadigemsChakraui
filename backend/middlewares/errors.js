const { model } = require("mongoose");
const ErrorHandler = require("../utils/ErrorHandler");

module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;

  if (process.env.NODE_ENV === "DEVELOPMENT") {
    res.status(err.statusCode).json({
      succes: false,
      error: err,
      errorMessage: err.message,
      errorStack: err.stack,
    });
  }

  if (process.env.NODE_ENV === "PRODUCTION") {
    let error = { ...err };

    error.message = err.message;

    //wrong mongoose object id
    if (err.name === "CastError") {
      const message = `Resource not found. Invalid ${err.path}`;
      error = new ErrorHandler(message, 400);
    }

    //handle mongoose validation error
    if (err.name == "ValidationError") {
      const message = Object.values(err.errors).map((value) => value.message);
      error = new ErrorHandler(message, 400);
    }

    //handle mongoose duplicate key errors

    if (err.code === 11000) {
      const message = `Duplicate ${Object.keys(err.keyValue)} entered`;
      error = new ErrorHandler(message, 400);
    }

    //handle Wrong JWT errors

    if (err.name == "JsonWebTokenError") {
      const message = "JSON web token is invalid. try again";
      error = new ErrorHandler(message, 400);
    }

    //handle expired JWT errors

    if (err.name == "TokenExpireError") {
      const message = "JSON web token is Expired. try again";
      error = new ErrorHandler(message, 400);
    }

    return res.status(error.statusCode).json({
      success: false,
      message: error.message || "Internal Server Error",
    });
  }
};
