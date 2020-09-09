//Imports
const mongoose = require("mongoose");

//Adding Schema constat accessing Schema() method
const Schema = mongoose.Schema;

//Creating Schema - blueprint for document
//totalUsd => accumulated amount of USD converted
//totlConversions => accumulated amount of all conversion requests made
//mostPopularCurrency => destination currency with highest amount of conversions
//conversionsOfCurrency => array of objects => every objects stores name (shortcut) and amount of conversions made
const totalStatsSchema = new Schema({
  totalUsd: {
    type: Number,
    required: true,
  },
  totalConversions: {
    type: Number,
    required: true,
  },
  mostPopularCurrency: {
    type: String,
  },
  conversionsOfCurrency: {
    type: [
      {
        name: { type: String },
        conversions: { type: Number },
      },
    ],
    required: true,
  },
});

//Exporting and Creating model
module.exports = mongoose.model("TotalStat", totalStatsSchema);
