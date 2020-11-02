// Get the router from express library
const router = require("express").Router();

// Import the controllers
const tokenController = require("../controllers/TokenController");

// Define all routes for this resource
router.post("/", tokenController.login);

module.exports = router;
