//Imports
const mongoose = require("mongoose");

//Adding Schema constat accessing Schema() method
const Schema = mongoose.Schema;

//Creating Schema - blueprint for document
const totalStatsSchema = new Schema({
  totalUsd: {
    type: Number,
    required: true,
  },
  totalConversions: {
    type: Number,
    required: true,
  },
});

//Exporting and Creating model
module.exports = mongoose.model("totalStat", totalStatsSchema);
