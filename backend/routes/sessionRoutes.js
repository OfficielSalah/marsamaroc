const express = require("express");
const {
  ajouterSession,
  getSessions,
} = require("../controllers/sessionController");

const router = express.Router();
router.route("/").get(getSessions);
router.route("/ajouter").post(ajouterSession);

module.exports = router;
