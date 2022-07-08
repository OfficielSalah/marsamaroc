const User = require("../models/User");
const OtpToken = require("../models/otpToken");
const ResetToken = require("../models/resetToken");
const asyncHandler = require("express-async-handler");
const generateToken = require("../utils/generateToken");
const randomByte = require("../utils/randomByte");
const {
  generateOTP,
  mailTransport,
  verifyEmailTemplate,
  resetPasswordTemplate,
} = require("../utils/mail");
const { isValidObjectId } = require("mongoose");

const authUser = asyncHandler(async (req, res) => {
  const { login, password } = req.body;

  const user = await User.findOne({ login });

  if (!user) {
    res.status(404);
    throw new Error("user Not Found");
  }

  if (await user.matchPassword(password)) {
    res.json({
      _id: user._id,
      login: user.login,
      isverified: user.isverified,
      token: generateToken(user._id),
    });
  } else {
    res.status(401);
    throw new Error("wrong Password");
  }
});

const updateProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  user.nom = req.body.nom || user.nom;
  user.matricule = req.body.matricule || user.matricule;
  user.stf = req.body.stf || user.stf;
  user.ser_Id = req.body.ser_Id || user.ser_Id;
  user.category = req.body.category || user.category;
  user.date_emb = req.body.date_emb || user.date_emb;
  user.nbr_enf = req.body.nbr_enf || user.nbr_enf;
  user.gsm = req.body.gsm || user.gsm;

  const updatedUser = await user.save();

  res.json({
    _id: updatedUser._id,
    nom: updatedUser.nom,
    matricule: updatedUser.matricule,
    ser_Id: updatedUser.ser_Id,
    category: updatedUser.category,
    stf: updatedUser.stf,
    date_emb: updatedUser.date_emb,
    nbr_enf: updatedUser.nbr_enf,
    gsm: updatedUser.gsm,
    token: generateToken(updatedUser._id),
  });
});

const registerUser = asyncHandler(async (req, res) => {
  const { login, email, password } = req.body;

  if (!login || !email || !password) {
    res.status(400);
    throw new Error("login or email or password not valid");
  }

  const userExist = await User.findOne({ login });
  const userExist2 = await User.findOne({ email });
  if (userExist || userExist2) {
    res.status(401);
    throw new Error("User Already Exist");
  }

  const user = await User.create({
    login,
    email,
    password,
  });

  const OTP = generateOTP();
  await OtpToken.create({
    owner: user._id,
    token: OTP,
  });

  mailTransport().sendMail({
    from: "marocmarsa@outlook.com",
    to: user.email,
    subject: "Verify your email account",
    html: verifyEmailTemplate(OTP),
  });

  if (user) {
    res.json({
      _id: user._id,
      login: user.login,
      email: user.email,
      isverified: user.isverified,
    });
  } else {
    res.status(403);
    throw new Error("Error Occured");
  }
});

const verifyEmail = asyncHandler(async (req, res) => {
  const { userId, otp } = req.body;
  if (!userId || !otp.trim()) {
    res.status(400);
    throw new Error("userId or otp not valid");
  }

  if (!isValidObjectId(userId)) {
    res.status(401);
    throw new Error("unvalid userId");
  }

  const user = await User.findById(userId);
  if (!user) {
    res.status(404);
    throw new Error("user Not Found");
  }

  if (user.verified) {
    res.status(402);
    throw new Error("user already verified");
  }

  const token = await OtpToken.findOne({ owner: user._id });
  if (!token) {
    res.status(405);
    throw new Error("user Not Found");
  }

  const isMatched = await token.compareToken(otp);
  if (!isMatched) {
    res.status(406);
    throw new Error("Please provide a valid token");
  }
  user.isverified = true;
  await OtpToken.findByIdAndDelete(token._id);
  await user.save();
  res.json({
    _id: user._id,
    isverified: user.isverified,
  });
});

const forgetPassword = asyncHandler(async (req, res) => {
  const { email } = req.body;

  if (!email) {
    res.status(400);
    throw new Error("email not valid");
  }

  const user = await User.findOne({ email });

  if (!user) {
    res.status(404);
    throw new Error("user Not Found");
  }

  const token = await ResetToken.findOne({ owner: user._id });

  if (token) {
    res.status(405);
    throw new Error("Only after one hour you can request for another token !");
  }

  const randomBytes = await randomByte();
  const resetToken = new ResetToken({ owner: user._id, token: randomBytes });
  await resetToken.save();

  mailTransport().sendMail({
    from: "marocmarsa@email.com",
    to: user.email,
    subject: "Password Reset",
    html: resetPasswordTemplate(
      `http://localhost:3000/reset-password?token=${randomBytes}&id=${user._id}`
    ),
  });
  res.json({
    _id: user._id,
    email: user.email,
    action: `link sent to ${user.email}`,
  });
});
const resetPassword = asyncHandler(async (req, res) => {
  const { password } = req.body;
  const user = await User.findById(req.user._id);

  const isSamePassword = await user.matchPassword(password);
  if (isSamePassword) {
    res.status(400);
    throw new Error("new password must be different");
  }

  user.password = password.trim();
  await user.save();
  await ResetToken.findOneAndDelete({ owner: user._id });

  res.json({
    success: true,
    message: "Password Reset Successfully",
  });
});

module.exports = {
  registerUser,
  authUser,
  updateProfile,
  verifyEmail,
  forgetPassword,
  resetPassword,
};
