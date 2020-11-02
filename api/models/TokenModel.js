// Import our jwt library
const jwt = require("jsonwebtoken");

// Define our secret used to sign the JWT
const secret = process.env.SECRET || "algo muy secreto";

// Define our function to generate a JWT
const createToken = (data) => {
  // Create the JWT with the provided data
  const token = jwt.sign(data, secret);

  return token;
};

// Define our function to verify a JWT
const verifyToken = (token) => {
  try {
    // Decode token
    const decoded = jwt.verify(token, secret);

    return true;
  } catch (err) {
    // If the token is invalid, throw an error
    throw { message: "Invalid token.", statusCode: 403 };
  }
};

module.exports = { createToken, verifyToken };
