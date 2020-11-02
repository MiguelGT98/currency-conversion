import Axios from "axios";
import React, { useEffect, useState } from "react";
import CountryList from "./components/CountryList";
import SearchComponent from "./components/SearchComponent";

// Import tailwind css
import "./tailwind.output.css";

function App() {
  // State libraries for selected countries and amount to convert
  const [countries, setCountries] = useState([]);
  const [amount, setAmount] = useState(0);

  // Function to select country
  const selectCountry = (country) => {
    if (!countries.some(({ name }) => name === country.name)) {
      setCountries([...countries, country]);
    }
  };

  // At the first time the app is loaded, make a request to the login endpoint
  useEffect(() => {
    Axios.post(
      `${
        process.env.REACT_APP_API_ENDPOINT ||
        "https://peaceful-wildwood-04873.herokuapp.com"
      }/login`,
      { key: Math.random() }
    ).then((response) => {
      // If a token was returned, set the token variable on local storage (For later use).
      if (response.status === 200) {
        const { token } = response.data;
        localStorage.setItem("token", token);
      }
    });
  }, []);

  // Function to change amount for input
  const changeAmount = (e) => {
    setAmount(e.currentTarget.value);
  };

  return (
    <div className="bg-gray-100 py-12 min-h-screen">
      <div className="App mx-auto max-w-3xl p-6 bg-white rounded shadow-md">
        <h3 className="text-gray-800 text-lg font-bold mb-2">
          Search for a country
        </h3>
        <SearchComponent
          selectCountry={selectCountry}
          selectedCountries={countries}
        ></SearchComponent>
        <hr className="my-4"></hr>
        <div className="flex justify-between mb-2 mt-4 items-center">
          <h3 className="text-gray-800 text-lg font-bold flex-1">
            Selected countries:
          </h3>
          {
            // Show the input for selecting the amount to convert from SEK if a country has been selected.
          }
          {countries.length > 0 ? (
            <div className="flex items-center">
              <span className="text-sm text-gray-700 mr-2 flex-1 block">
                Convert from{" "}
                <span className="text-gray-900 font-bold">SEK</span>:
              </span>
              <input
                type="number"
                className="border rounded py-1 px-3 text-gray-800"
                min="0"
                value={amount}
                onChange={changeAmount}
              ></input>
            </div>
          ) : (
            <></>
          )}
        </div>
        <CountryList countries={countries} amount={amount}></CountryList>
      </div>
    </div>
  );
}

export default App;
