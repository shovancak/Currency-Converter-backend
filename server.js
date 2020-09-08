//Imports
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const currencyRoutes = require("./routes/currency-routes");
const totalStatsRoutes = require("./routes/totalStats-routes");

//Setting port for server
const PORT = 5000;

//Creating Express application
const app = express();

//Using body-parser for parsing body of incoming requests
app.use(bodyParser.json());

//Middlewares for handling routes
app.use("/api/currency", currencyRoutes);
app.use("/api/total-stats", totalStatsRoutes);

//Error handling middleware for unsupported routes
app.use((req, res, next) => {
  const error = new Error("Could not find this route.");
  error.code = 404;
  throw next(error);
});

//Default error handling middleware function applied on every incoming request
//It is trigered only for requests where error was thrown
app.use((error, req, res, next) => {
  if (res.headerSent) {
    return next(error);
  }
  res
    .status(error.code || 500)
    .json(error.message || "An unknown error occurred.");
});

//Connection to mongoDB by mongoose
mongoose
  .connect(
    //MongoDB connection string
    `mongodb+srv://samuel:83461834Sh@cluster0-eamri.mongodb.net/currency?retryWrites=true&w=majority`,
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then(() => {
    //Binding and listening for connections
    app.listen(PORT);
    console.log("Server running, port:", PORT);
  })
  //Catching connection errors
  .catch((err) => {
    console.log("Connection to database failed. Error message:", err);
  });
