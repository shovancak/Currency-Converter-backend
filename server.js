//Imports
const express = require("express");
const bodyParser = require("body-parser");
const currencyRoutes = require("./routes/currency-routes");

//Setting port for server
const PORT = 5000;

//Creating Express application
const app = express();

//Using body-parser for parsing body of incoming requests
app.use(bodyParser.json());

//Middlewares for handling routes
app.use("/api/currency", currencyRoutes);

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

//Binding and listening for connections
app.listen(PORT);
console.log("Server running, port:", PORT);
