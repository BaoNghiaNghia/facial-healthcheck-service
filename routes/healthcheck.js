var express = require("express");
const HealthcheckController = require("../controllers/HealthcheckController");

var router = express.Router();

router.get("/service", HealthcheckController.serviceAlive);
router.get("/camera/:id", HealthcheckController.cameraAlive);

module.exports = router;