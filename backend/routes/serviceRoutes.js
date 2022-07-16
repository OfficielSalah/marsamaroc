const express = require("express");
const ServiceController = require("../controllers/serviceController");

const router = express.Router();

router.route("/").get(ServiceController.getServices);
router.route("/ajouter").post(ServiceController.ajouterService);

module.exports = router;
