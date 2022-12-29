var express = require("express");
const HealthcheckController = require("../controllers/HealthcheckController");

var router = express.Router();

router.get("/service-alive", HealthcheckController.serviceAlive);
router.get("/camera-alive/:id", HealthcheckController.cameraAlive);

module.exports = router;