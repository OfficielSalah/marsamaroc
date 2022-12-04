const { isValidObjectId } = require("mongoose");
const User = require("../models/User");
const ResetToken = require("../models/resetToken");
const asyncHandler = require("express-async-handler");
const ErrorResponse = require("../utils/errorResponse");

const isResetTokenValid = asyncHandler(async (req, res, next) => {
  const token = req.query?.token;
  const id = req.query?.id;
  if (!token || !id) {
    throw new ErrorResponse("token or id not valid", 400);
  }
  if (!isValidObjectId(id)) {
    throw new ErrorResponse("invalid id", 401);
  }

  const user = await User.findById(id);

  if (!user) {
    throw new ErrorResponse("user not found", 404);
  }

  const resettoken = await ResetToken.findOne({ owner: user._id });

  if (!resettoken) {
    throw new ErrorResponse("reset token not found", 404);
  }

  const isValid = await resettoken.compareToken(token);
  if (!isValid) {
    throw new ErrorResponse("reset token is invalid", 403);
  }
  req.user = user;
  next();
});

module.exports = { isResetTokenValid };
