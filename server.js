//Imports
const express = require("express");
const bodyParser = require("body-parser");

//Setting port for server
const PORT = 5000;

//Creating Express application
const app = express();

//Using body-parser for parsing body of incoming requests
app.use(bodyParser.json());

//Binding and listening for connections
app.listen(PORT);
console.log("Server running, port:", PORT);
