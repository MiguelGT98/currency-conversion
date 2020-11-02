// Import fetch
const fetch = require("node-fetch");

// Define our api endpoints
const countryApiEndpoint = process.env.COUNTRY_API_ENDPOINT;
const currencyApiEndpoint = process.env.CURRENCY_API_ENDPOINT;

// Define our api key for the currency api
const currencyApiKey = process.env.CURRENCY_API_KEY;

// Define our preffered currency to convert from the default currency (Euro) used by the external API. Default to SEK.
const preferredCurrencyCode = process.env.PREFERRED_CURRENCY_CODE || "SEK";

// Define our function to lookup countries by name
const find = (name) => {
  let countries;
  return fetch(
    `${countryApiEndpoint}/name/${name}?fields=name;population;currencies;flag`
  )
    .then((response) => {
      return response.json();
    })
    .then((results) => {
      // If no country was found, throw a 404 error
      if (results.status === 404) {
        throw {
          code: 404,
          message: "No country was found with the provided name.",
        };
      }

      // Assign the results to our countries variable for later use.
      countries = results;

      // Get list of currencies for the countries obtained from the search.
      const listOfCurrencies = getCurrencyList(countries);

      // Make a call to the API with the list of currencies
      return fetch(
        `${currencyApiEndpoint}/latest?access_key=${currencyApiKey}&symbols=${listOfCurrencies},${preferredCurrencyCode}`
      );
    })
    .then((response) => {
      return response.json();
    })
    .then((result) => {
      // Get base rate (Euro due to having a free acount) and the rates.
      let { rates } = result;
      let convertedRates = {};

      // Convert rates from base to our preferred currency.
      Object.keys(rates).forEach((code) => {
        convertedRates[code] = rates[preferredCurrencyCode] / rates[code];
      });

      // Associate each currency from a country to it's exchange rate and return the whole country array.
      return countries.map((country) => {
        return {
          ...country,
          currencies: country.currencies.map((currency) => {
            return { ...currency, rate: convertedRates[currency.code] };
          }),
        };
      });
    })
    .catch((error) => {
      throw error;
    });
};

// Define a function to convert a country array to a comma separated string of all needed currencies.
const getCurrencyList = (countries) => {
  // Go through each country and return a comma separated string for each country's currencies by using the built in toString function.

  return countries
    .map((country) => {
      // Return an array of currency codes for each country.
      return country.currencies.map((currency) => {
        return currency.code;
      });
    })
    .toString();
};

module.exports = {
  find,
};
