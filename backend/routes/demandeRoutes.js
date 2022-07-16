const express = require("express");
const demandeController = require("../controllers/demandeController");
const { protect } = require("../middlewares/authMiddleware");

const router = express.Router();
router.route("/ajouter").post(protect, demandeController.ajouterDemande);
router.route("/").get(protect, demandeController.getDemandes);
router.route("/employe").get(protect, demandeController.getDemandesemploye);
router.route("/validate/:id").put(protect, demandeController.validateDemande);
router.route("/update/:id").put(protect, demandeController.updateDemande);

module.exports = router;
