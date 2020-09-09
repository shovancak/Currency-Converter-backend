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
    check("currency").exists({ checkNull: true, checkFalsy: true }).isString(),
  ], // => Validating request body data, "amount" is valid if exists and is numeric, "currency" is valid if exists and is string
  totalStatsControllers.updateTotalStats
);

//Exports
module.exports = router;
