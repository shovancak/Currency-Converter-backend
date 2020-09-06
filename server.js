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

//Binding and listening for connections
app.listen(PORT);
console.log("Server running, port:", PORT);
