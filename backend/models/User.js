const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = mongoose.Schema(
  {
    login: {
      type: String,
      required: true,
      index: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      index: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    ischef: { type: Boolean, default: false },

    nom: String,
    matricule: { type: String, index: { unique: true, sparse: true } },
    ser_Id: { type: mongoose.Schema.Types.ObjectId, ref: "Service" },
    category: String,
    stf: String,
    date_emb: String,
    nbr_enf: String,
    gsm: String,

    isverified: {
      type: Boolean,
      required: true,
      default: false,
    },
    dems_id: [{ type: mongoose.Schema.Types.ObjectId, ref: "Demande" }],
    demsemp_id: [{ type: mongoose.Schema.Types.ObjectId, ref: "Demande" }],
  },
  {
    timestamps: true,
  }
);

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};
module.exports = mongoose.model("User", userSchema);
