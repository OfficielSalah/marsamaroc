const { isValidObjectId } = require("mongoose");
const User = require("../models/User");
const ResetToken = require("../models/resetToken");
const asyncHandler = require("express-async-handler");

const isResetTokenValid = asyncHandler(async (req, res, next) => {
  const token = req.param("token");
  const id = req.param("id");
  if (!token || !id) {
    res.status(400);
    throw new Error("token or id not valid");
  }
  if (!isValidObjectId(id)) {
    res.status(401);
    throw new Error("invalid id");
  }

  const user = await User.findById(id);

  if (!user) {
    res.status(404);
    throw new Error("user not found");
  }

  const resettoken = await ResetToken.findOne({ owner: user._id });

  if (!resettoken) {
    res.status(403);
    throw new Error("reset token not found");
  }

  const isValid = await resettoken.compareToken(token);
  if (!isValid) {
    res.status(403);
    throw new Error("reset token is invalid");
  }
  req.user = user;
  next();
});

module.exports = { isResetTokenValid };
