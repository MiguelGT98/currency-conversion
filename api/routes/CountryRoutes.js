// Get the router from express library
const router = require("express").Router();

// Import the controllers
const countryController = require("../controllers/CountryController");
const { verifyToken } = require("../middlewares/VerifyToken");
const { limit } = require("../middlewares/RateLimit");

// Define all routes for this resource

// This route uses two middlewares, first it verifies the token and then it checks if the rate limit is not exceeded
router.get("/", [verifyToken, limit], countryController.findByName);

module.exports = router;
