// Import token model to verify the token
const TokenModel = require("../models/TokenModel");

const verifyToken = (req, res, next) => {
  // Get auth header from request headers (Bearer token strategy)
  const authHeader = req.headers["authorization"];

  if (authHeader) {
    // Get the token portion of 'Bearer Token'
    const token = authHeader.split(" ")[1];

    try {
      // Check if token is valid
      const verified = TokenModel.verifyToken(token);

      // If it's valid, assign it to the token variable in request and continue
      if (verified) {
        req.token = token;
        next();
      }
    } catch (error) {
      return res.status(error.statusCode || 403).json({
        error,
      });
    }
  } else {
    // If Authorization header was not found, send an error message
    return res.status(403).json({
      error: {
        message:
          "You need to provide the Authorization header for this endpoint.",
      },
    });
  }
};

module.exports = { verifyToken };
