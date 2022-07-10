var mongoose = require("mongoose");

const sessionSchema = mongoose.Schema({
  num: {
    type: String,
    required: true,
    index: true,
    unique: true,
  },
  date_d: { type: String, required: true },
  date_f: { type: String, required: true },
});

module.exports = mongoose.model("Session", sessionSchema);
