const asyncHandler = (func) => async (req, res, next) => {
  await Promise.resolve(func(req, res, next)).catch(next);
};

module.exports = asyncHandler;
