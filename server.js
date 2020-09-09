//Imports
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const currencyRoutes = require("./routes/currency-routes");
const totalStatsRoutes = require("./routes/totalStats-routes");

//Creating Express application
const app = express();

//Using body-parser for parsing body of incoming requests
app.use(bodyParser.json());

//CORS error handling middleware
//Attaching headers to response
app.use((req, res, next) => {
  //Allowing any domain to send request
  res.setHeader("Access-Control-Allow-Origin", "*");
  //Header property controlling which headers incoming requests may have to be handled
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  //Header property controlling what request methods can be handled
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PATCH");
  next();
});

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
  // Response => error code and message of throwen error or default values
  res
    .status(error.code || 500)
    .json(error.message || "An unknown error occurred.");
});

//Connection to mongoDB by mongoose
//process.env.DB_USER => environmental variable containing username of database creator/user
//process.env.DB_PASSWORD => environmental variable containing password of database creator/user
//process.env.DB_NAME => environmental variable for database name
mongoose
  .connect(
    //MongoDB connection string
    `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0-eamri.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`,
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then(() => {
    //Binding and listening for connections
    app.listen(process.env.PORT || 5000); // process.env.PORT => default environmental variable containing PORT for application provided by HEROKU
  })
  //Catching database connection errors
  .catch((err) => {
    console.log("Connection to database failed. Error message:", err);
  });
