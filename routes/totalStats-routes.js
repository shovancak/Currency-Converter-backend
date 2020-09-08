//Imports
const express = require("express");
const { check } = require("express-validator");
const totalStatsControllers = require("../controllers/totalStats-controller");

//Using Express Router
const router = express.Router();

//Routes
router.get("/", totalStatsControllers.getTotalStats);
router.patch(
  "/",
  [
    check("amount")
      .exists({ checkNull: true, checkFalsy: true })
      .isNumeric()
      .not()
      .isString(),
  ], // => Validating if amount in request body is numeric
  totalStatsControllers.updateTotalStats
);

//Exports
module.exports = router;
