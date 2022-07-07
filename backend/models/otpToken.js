const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const otpTokenSchema = mongoose.Schema({
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  token: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    expires: 3600,
    default: Date.now(),
  },
});

otpTokenSchema.pre("save", async function (next) {
  if (!this.isModified("token")) {
    next();
  }
  const hash = await bcrypt.hash(this.token, 8);
  this.token = hash;
});

otpTokenSchema.methods.compareToken = async function (token) {
  return await bcrypt.compareSync(token, this.token);
};
module.exports = mongoose.model("OtpToken", otpTokenSchema);
