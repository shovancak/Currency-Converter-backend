//Imports
const express = require("express");
const { check } = require("express-validator");
const currencyControllers = require("../controllers/currency-controllers");

//Using Express Router
const router = express.Router();

//Routes
router.get("/currency-data", currencyControllers.getLatestCurrencyData);
router.post(
  "/conversion",
  [
    check("amount")
      .exists({ checkNull: true, checkFalsy: true })
      .isNumeric()
      .not()
      .isString(),
    check("rate")
      .exists({ checkNull: true, checkFalsy: true })
      .isNumeric()
      .not()
      .isString(),
  ], // => Validating if data in request body are numeric
  currencyControllers.currencyConversion
);

//Exports
module.exports = router;
