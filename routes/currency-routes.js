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
    check("currency").exists({ checkNull: true, checkFalsy: true }).isString(),
  ], // => Validating data in request body. "amount", "rate" must be numeric, "currency" must be string
  currencyControllers.currencyConversion
);

//Exports
module.exports = router;
