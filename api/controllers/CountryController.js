const CountryModel = require("../models/CountryModel");

// Function to handle find by name
exports.findByName = async (req, res, next) => {
  // Get name from request query params
  const name = req.query.name;

  // If no name was provided, return an error
  if (!name || name === "") {
    return res
      .status(400)
      .json({ error: { message: "You need to provide a name." } });
  }

  CountryModel.find(name)
    .then((countries) => {
      // Return the countries from the result
      return res.status(200).json({ countries });
    })
    .catch((error) => {
      return res.status(error.code || 401).json({ error });
    });
};
