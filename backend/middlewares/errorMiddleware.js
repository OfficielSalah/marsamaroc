const errorHandler = (Error, req, res, next) => {
  res.status(Error.statusCode || 500).json({
    success: false,
    error: Error.message || "Internal Server Error",
    stack: process.env.NODE_ENV === "production" ? null : Error.stack,
  });
};
module.exports = errorHandler;
