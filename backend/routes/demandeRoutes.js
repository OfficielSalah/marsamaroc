const express = require("express");
const {
  ajouterDemande,
  getDemandes,
  getDemandesemploye,
  updateDemande,
} = require("../controllers/demandeController");
const { protect } = require("../middlewares/authMiddleware");

const router = express.Router();
router.route("/ajouter").post(protect, ajouterDemande);
router.route("/").get(protect, getDemandes);
router.route("/employe").get(protect, getDemandesemploye);
router.route("/:id").put(protect, updateDemande);

module.exports = router;
