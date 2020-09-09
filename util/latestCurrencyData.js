//Imports
const axios = require("axios");

// APP_ID / API KEY used for accessing the Open Exchange Rates API
const APP_ID = process.env.APP_ID; // process.env.APP_ID => environmental variable containing users APP_ID/API KEY

// Function for getting latest currency data (name, rate) from external API
const latestCurrencyData = async () => {
  const response = await axios.get(
    `https://openexchangerates.org/api/latest.json?app_id=${APP_ID}`
  );
  const latestData = await response.data.rates;
  return latestData;
};

//Exports
module.exports = latestCurrencyData;
