const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const resetTokenSchema = mongoose.Schema({
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

resetTokenSchema.pre("save", async function (next) {
  if (!this.isModified("token")) {
    next();
  }
  const hash = await bcrypt.hash(this.token, 8);
  this.token = hash;
});

resetTokenSchema.methods.compareToken = async function (token) {
  return await bcrypt.compareSync(token, this.token);
};
module.exports = mongoose.model("ResetToken", resetTokenSchema);
