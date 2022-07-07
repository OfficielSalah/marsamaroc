var mongoose = require("mongoose");

const demandeSchema = mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  nbr_plc: { type: String, required: true },
  date: { type: String, required: true },

  choixs: [
    {
      priorité: { type: Number, required: true },
      centre: { type: String, required: true },
      session_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "Session",
      },
    },
  ],

  ischecked: { type: Boolean, default: false },
  isvalid: { type: Boolean, default: false },
});

demandeSchema.path("choixs").validate(function (value) {
  if (value.length !== 3) {
    throw new Error("la demande doit contenir 3 choixs exactement ");
  }
});

module.exports = mongoose.model("Demande", demandeSchema);
