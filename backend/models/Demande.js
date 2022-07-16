var mongoose = require("mongoose");

const demandeSchema = mongoose.Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    nbr_plc: { type: Number, required: true },
    choixs: [
      {
        _id: false,
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
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Demande", demandeSchema);
