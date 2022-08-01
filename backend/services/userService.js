const { isValidObjectId } = require("mongoose");
const User = require("../models/User");
const OtpToken = require("../models/otpToken");
const ResetToken = require("../models/resetToken");
const generateOTP = require("../utils/generateOTP");
const generateToken = require("../utils/generateToken");
const {
  mailTransport,
  verifyEmailTemplate,
  resetPasswordTemplate,
} = require("../utils/mail");
const randomByte = require("../utils/randomByte");
const ErrorResponse = require("../utils/errorResponse");

const registerUser = async (login, email, password) => {
  if (!login || !email || !password) {
    throw new ErrorResponse("login or email or password not valid", 400);
  }

  const userByLogin = await User.findOne({ login: login });
  const userByEmail = await User.findOne({ email: email });
  if (userByLogin || userByEmail) {
    throw new ErrorResponse("User Already Exist", 401);
  }

  const user = await User.create({
    login,
    email,
    password,
  });

  if (!user) {
    throw new ErrorResponse("Couldn't create User", 402);
  }

  const OTP = generateOTP();
  const otpToken = await OtpToken.create({
    owner: user._id,
    token: OTP,
  });

  if (!otpToken) {
    const removedUser = await User.findByIdAndDelete(user._id);
    if (!removedUser) {
      throw new ErrorResponse("Couldn't remove User", 402);
    }
    throw new ErrorResponse("Couldn't create OTP token", 402);
  }

  mailTransport().sendMail({
    from: "marocmarsa@outlook.com",
    to: user.email,
    subject: "Verify your email account",
    html: verifyEmailTemplate(OTP),
  });
  return user;
};
const verifyEmail = async (user_Id, otp) => {
  if (!user_Id || !otp.trim()) {
    throw new ErrorResponse("userId or OTP not valid", 400);
  }

  if (!isValidObjectId(user_Id)) {
    throw new ErrorResponse("unvalid userId", 400);
  }

  const user = await User.findById(user_Id);
  if (!user) {
    throw new ErrorResponse("User Not Found", 404);
  }

  if (user.verified) {
    throw new ErrorResponse("user already verified", 401);
  }

  const token = await OtpToken.findOne({ owner: user._id });
  if (!token) {
    throw new ErrorResponse("token Not Found", 404);
  }
  if (!(await token.compareToken(otp))) {
    throw new ErrorResponse("wrong token", 403);
  }

  user.isverified = true;

  await OtpToken.findByIdAndDelete(token._id);
  await user.save();

  return user;
};
const forgetPassword = async (email) => {
  if (!email) {
    throw new ErrorResponse("email not valid", 400);
  }

  const user = await User.findOne({ email: email });

  if (!user) {
    throw new ErrorResponse("user Not Found", 404);
  }

  const token = await ResetToken.findOne({ owner: user._id });

  if (token) {
    throw new ErrorResponse(
      "Only after one hour you can request for another token !",
      401
    );
  }

  const randomBytes = await randomByte();

  if (!randomBytes) {
    throw new ErrorResponse("Couldn't create randomBytes", 402);
  }

  const resetToken = await ResetToken.create({
    owner: user._id,
    token: randomBytes,
  });

  if (!resetToken) {
    throw new ErrorResponse("Couldn't create resetToken", 402);
  }

  mailTransport().sendMail({
    from: "marocmarsa@email.com",
    to: user.email,
    subject: "Password Reset",
    html: resetPasswordTemplate(
      `http://localhost:3000/reset-password?token=${randomBytes}&id=${user._id}`
    ),
  });

  return user;
};

const resetPassword = async (password, id) => {
  if (!password || !id) {
    throw new ErrorResponse("password or id not valid", 400);
  }

  const user = await User.findById(id);

  if (!user) {
    throw new ErrorResponse("User Not Found", 404);
  }

  if (await user.matchPassword(password)) {
    throw new ErrorResponse("new password must be different", 405);
  }

  user.password = password.trim();
  await user.save();
  await ResetToken.findOneAndDelete({ owner: user._id });
};
const authUser = async (login, password) => {
  const user = await User.findOne({ login: login });

  if (!user) {
    throw new ErrorResponse("user Not Found", 404);
  }

  if (!(await user.matchPassword(password))) {
    throw new ErrorResponse("wrong Password", 403);
  }
  if (!user.isverified) {
    throw new ErrorResponse("Your Account is not yet Verified", 406);
  }

  return {
    user: user,
    token: generateToken(user._id),
  };
};
const updateProfile = async (
  id,
  nom,
  matricule,
  stf,
  ser_Id,
  category,
  date_emb,
  nbr_enf,
  gsm
) => {
  const user = await User.findById(id);

  if (!user) {
    throw new ErrorResponse("User Not Found", 404);
  }
  userByMatricule = await User.findOne({ matricule: matricule });
  if (userByMatricule) {
    throw new ErrorResponse("Matricule Already Used", 401);
  }

  user.nom = nom || user.nom;
  user.matricule = matricule || user.matricule;
  user.stf = stf || user.stf;
  user.ser_Id = ser_Id || user.ser_Id;
  user.category = category || user.category;
  user.date_emb = date_emb || user.date_emb;
  user.nbr_enf = nbr_enf || user.nbr_enf;
  user.gsm = gsm || user.gsm;

  const updatedUser = await user.save();

  if (!updatedUser) {
    throw new ErrorResponse("Couldn't Update User", 402);
  }

  return user;
};

module.exports = {
  registerUser,
  verifyEmail,
  forgetPassword,
  resetPassword,
  authUser,
  updateProfile,
};
