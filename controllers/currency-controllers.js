//Imports
const latestCurrencyData = require("../util/latestCurrencyData");

//Controller function for getting latest currency data.
const getLatestCurrencyData = async (req, res, next) => {
  const latestData = await latestCurrencyData();
  //Error handling
  if (!latestData) {
    return res.status(404).json({
      message: "Something went wrong, colud not get latest currency data.",
    });
  }
  //Response
  res.status(200).json({ latestData: latestData });
};

//Exports
exports.getLatestCurrencyData = getLatestCurrencyData;
