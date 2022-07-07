const express = require("express");
const {
  ajouterService,
  getServices,
} = require("../controllers/serviceController");

const router = express.Router();
router.route("/").get(getServices);
router.route("/ajouter").post(ajouterService);

module.exports = router;
