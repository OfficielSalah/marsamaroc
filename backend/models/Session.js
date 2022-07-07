var mongoose = require("mongoose");
var autoIncrement = require("mongoose-auto-increment");

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

ItemSchema.plugin(autoIncrement, { id: "session_num", inc_field: "num" });
module.exports = mongoose.model("Session", sessionSchema);
