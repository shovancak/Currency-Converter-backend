//Imports
const express = require("express");
const totalStatsControllers = require("../controllers/totalStats-controller");

//Using Express Router
const router = express.Router();

//Routes
router.patch("/", totalStatsControllers.updateTotalStats);

//Exports
module.exports = router;
