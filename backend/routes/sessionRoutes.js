const express = require("express");
const sessionController = require("../controllers/sessionController");

const router = express.Router();
router.route("/").get(sessionController.getSessions);
router.route("/config").post(sessionController.configSession);

module.exports = router;
