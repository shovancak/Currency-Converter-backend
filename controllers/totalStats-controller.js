//Imports
const TotalStat = require("../models/totalStats");

//Controller function for updating amount of total USD converted and amount of total conversion requests.
const updateTotalStats = async (req, res, next) => {
  //Extracting data from request body
  const { amount } = req.body;

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

  //Saving updated values in database
  try {
    await stats.save();
  } catch (err) {
    //Error handling in case of database been unable to save data
    const error = new Error("Something went wrong, updataing data failed.");
    error.code = 500;
    return next(error);
  }

  //Response => object with updated data
  res.status(200).json({ totalStats: stats });
};

//Exports
exports.updateTotalStats = updateTotalStats;
