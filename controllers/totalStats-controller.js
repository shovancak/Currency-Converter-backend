//Imports
const TotalStat = require("../models/totalStats");
const { validationResult } = require("express-validator");

//Controller function for updating amount of total USD converted and amount of total conversion requests.
const updateTotalStats = async (req, res, next) => {
  //Using validationResult function from express-validator package for validating data in request
  //vlaidationResult returns object of errors in case there are some validation erros based on validation criteria set in routes file
  const validatioErrors = validationResult(req);
  //Error handling in case of request body data validation failed
  if (!validatioErrors.isEmpty()) {
    //Sending response with error message
    const error = new Error(
      "Invalid data passed, please check your input data."
    );
    error.code = 422;
    return next(error);
  }

  //Extracting data from request body
  const { amount, currency } = req.body;

  //Variable for storing data from database
  let stats;

  //Getting data ftom database
  try {
    stats = await TotalStat.findOne();
  } catch (err) {
    //Error handling in case of no data found
    const error = new Error(
      "Something went wrong, could not get data from database."
    );
    error.code = 500;
    return next(error);
  }

  //Updating values
  stats.totalUsd = stats.totalUsd + amount; // => adding USD amount of current conversion to total amount of USD converted
  stats.totalConversions = stats.totalConversions + 1; // => incrementing total conversion by 1 every time conversion request is send
  //Checking if currency of current conversion was used before, returing index of currency
  //If currency is not in array, returned index values is -1
  const indexExistingCurrency = stats.conversionsOfCurrency.findIndex(
    (curr) => curr.name === currency
  );
  //If index is higher or equal to 0, it means that currency was used before
  if (indexExistingCurrency >= 0) {
    //Storing amount of current conversions of currency
    const currentConversions =
      stats.conversionsOfCurrency[indexExistingCurrency].conversions;
    //Adding 1 to amount of current conversions of currency
    const newConversions = currentConversions + 1;
    //Setting new value of amount as number of conversions
    stats.conversionsOfCurrency[
      indexExistingCurrency
    ].conversions = newConversions;
  } else {
    //=> if index is -1 (currency was not used before), adding new object to array of used currencies
    stats.conversionsOfCurrency.push({ name: currency, conversions: 1 });
  }

  //Saving updated values in database
  try {
    await stats.save();
  } catch (err) {
    //Error handling in case of database been unable to save data
    const error = new Error("Something went wrong, updataing data failed.");
    error.code = 500;
    return next(error);
  }

  //Response =>
  res.status(200).json({ totalStats: stats });
};

//Controller function for getting data about total USD converted and total conversions requests made.
const getTotalStats = async (req, res, next) => {
  //Variable for storing data from database
  let stats;

  //Getting data ftom database
  try {
    stats = await TotalStat.findOne();
  } catch (err) {
    //Error handling in case of no data found
    const error = new Error(
      "Something went wrong, could not get data from database."
    );
    error.code = 500;
    return next(error);
  }

  //Response => object with total USD converted and total conversion made
  res.status(200).json({ totalData: stats });
};

//Exports
exports.updateTotalStats = updateTotalStats;
exports.getTotalStats = getTotalStats;
