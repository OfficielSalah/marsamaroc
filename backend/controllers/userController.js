const UserService = require("../services/userService");
const asyncHandler = require("../middlewares/asyncMiddleware");

const authUser = asyncHandler(async (req, res, next) => {
  const { login, password } = req.body;
  try {
    const data = await UserService.authUser(login, password);
    res.status(200).json({
      _id: data.user._id,
      login: data.user.login,
      isverified: data.user.isverified,
      token: data.token,
    });
  } catch (error) {
    next(error);
  }
});

const updateProfile = asyncHandler(async (req, res, next) => {
  const { nom, matricule, stf, ser_Id, category, date_emb, nbr_enf, gsm } =
    req.body;
  const id = req.user._id;
  try {
    const user = await UserService.updateProfile(
      id,
      nom,
      matricule,
      stf,
      ser_Id,
      category,
      date_emb,
      nbr_enf,
      gsm
    );
    res.status(200).json({
      _id: user._id,
      login: user.login,
      matricule: user.matricule,
      action: "User Updated",
    });
  } catch (error) {
    next(error);
  }
});

const registerUser = asyncHandler(async (req, res, next) => {
  const { login, email, password } = req.body;
  try {
    const user = await UserService.registerUser(login, email, password);
    res.status(200).json({
      _id: user._id,
      login: user.login,
      email: user.email,
    });
  } catch (error) {
    next(error);
  }
});

const verifyEmail = asyncHandler(async (req, res, next) => {
  const { user_Id, otp } = req.body;
  try {
    const user = await UserService.verifyEmail(user_Id, otp);
    res.status(200).json({
      _id: user._id,
      isverified: user.isverified,
    });
  } catch (error) {
    next(error);
  }
});

const forgetPassword = asyncHandler(async (req, res, next) => {
  const { email } = req.body;

  try {
    const user = await UserService.forgetPassword(email);
    res.status(200).json({
      _id: user._id,
      email: user.email,
      action: `link sent to ${user.email}`,
    });
  } catch (error) {
    next(error);
  }
});
const resetPassword = asyncHandler(async (req, res, next) => {
  const { password } = req.body;
  const id = req.user._id;

  try {
    await UserService.resetPassword(password, id);
    res.status(200).json({
      success: true,
      message: "Password Reset Successfully",
    });
  } catch (error) {
    next(error);
  }
});

module.exports = {
  registerUser,
  verifyEmail,
  forgetPassword,
  resetPassword,
  authUser,
  updateProfile,
};
