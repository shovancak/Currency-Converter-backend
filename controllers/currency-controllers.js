//Imports
const latestCurrencyData = require("../util/latestCurrencyData");
const conversion = require("../util/conversion");
const { validationResult } = require("express-validator");

//Controller function for getting latest currency data.
const getLatestCurrencyData = async (req, res, next) => {
  //Getting latest currency data from external API
  const latestData = await latestCurrencyData();
  //Error handling
  if (!latestData) {
    const error = new Error(
      "Something went wrong, colud not get latest currency data."
    );
    error.code = 404;
    return next(error);
  }
  //Response => object with latest currency data
  res.status(200).json({ latestData: latestData });
};

//Controller function for currency conversion
const currencyConversion = (req, res, next) => {
  //Using validationResult function from express-validator package for validating data in request
  //vlaidationResult returns object of errors in case there are some validation erros based on validation criteria set in routes file
  const validationErrors = validationResult(req);
  //Error handling in case of request body data validation failed
  if (!validationErrors.isEmpty()) {
    //Sending response with error message
    const error = new Error(
      "Invalid data passed, please check your input data."
    );
    error.code = 422;
    throw error;
  }

  //Extracting data from request body
  const { amount, rate, currency } = req.body;

  //Converting currencies
  const convertedAmount = conversion(amount, rate);
  //Error handling in case of not working conversion
  if (!convertedAmount) {
    //Sending response with error message
    const error = new Error(
      "Something went wrong, conversion does not work, please try again."
    );
    error.code = 500;
    throw error;
  }
  //Response => object with converted amount in destination currency and currency name
  res.status(200).json({
    convertedAmount: convertedAmount,
    convertedCurrency: currency,
  });
};

//Exports
exports.getLatestCurrencyData = getLatestCurrencyData;
exports.currencyConversion = currencyConversion;
