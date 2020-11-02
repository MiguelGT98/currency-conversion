// Imports
const express = require("express");
const cors = require("cors");

// Import routes
const countryRoutes = require("./routes/CountryRoutes");
const tokenRoutes = require("./routes/TokenRoutes");

// Express app creation
const app = express();

app.use(cors());

// Receive parameters from the Form requests
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Use routes
app.use("/countries", countryRoutes);
app.use("/login", tokenRoutes);

module.exports = app;
