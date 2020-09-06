//Imports
const express = require("express");
const currencyControllers = require("../controllers/currency-controllers");

//Using Express Router
const router = express.Router();

//Routes
router.get("/currency-data", currencyControllers.getLatestCurrencyData);
router.post("/conversion", currencyControllers.currencyConversion);

//Exports
module.exports = router;
