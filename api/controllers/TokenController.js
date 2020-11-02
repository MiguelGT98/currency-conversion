const TokenModel = require("../models/TokenModel");

// Function to handle login
exports.login = async (req, res, next) => {
  // Get data from body
  const data = req.body;

  // If no data was provided, return an error
  if (!data || isEmpty(data)) {
    return res
      .status(400)
      .json({ error: { message: "You need to provide data in the request." } });
  }

  try {
    // Generate token from data
    const token = TokenModel.createToken(data);

    // Return the token
    return res.status(200).json({ token });
  } catch (error) {
    return res.status(error.code || 401).json({ error });
  }
};

// Function to check if an object is empty
const isEmpty = (obj) => {
  return typeof obj === "object" && Object.keys(obj).length === 0;
};
