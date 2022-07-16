var mongoose = require("mongoose");

const serviceSchema = mongoose.Schema({
  ser_nom: { type: String, required: true },
  ser_code: {
    type: String,
    required: true,
    index: true,
    unique: true,
  },
  chef_mat: { type: String, required: true, unique: true },
});
module.exports = mongoose.model("Service", serviceSchema);
