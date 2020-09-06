//Imports
const axios = require("axios");

// APP_ID / API KEY used for accessing the Open Exchange Rates API
const APP_ID = "6f322c73837e425b9894333e4bb4ffb9";

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
