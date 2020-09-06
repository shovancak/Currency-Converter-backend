//Imports
const express = require("express");
const totalStatsControllers = require("../controllers/totalStats-controller");

//Using Express Router
const router = express.Router();

//Routes
router.put("/total-stats", totalStatsControllers.updateTotalStats);

//Exports
module.exports = router;
