import React from "react";

// Component for displaying search results
const SearchResults = ({
  countries,
  searchText,
  loading,
  selectCountry,
  selectedCountries,
  limitReached,
}) => {
  // If it's the first time loading the app, don't show anything.
  if (!loading && searchText === "") return <></>;

  // Show a loading message while the request is being made.
  if (loading) {
    return (
      <div className="border rounded shadow-sm py-2 px-4 text-gray-700 mt-2 text-sm">
        Loading results for: {searchText}
      </div>
    );
  }

  // If limit was reached, show an error.
  if (limitReached) {
    return (
      <div className="border rounded shadow-sm py-2 px-4 text-gray-700 mt-2 text-sm">
        Limit amount of requests was reached, try again later.
      </div>
    );
  }

  // If there are no countries and a search has been made, show a message.
  if (countries.length === 0 && searchText !== "") {
    return (
      <div className="border rounded shadow-sm py-2 px-4 text-gray-700 mt-2 text-sm">
        No results found for search: {searchText}
      </div>
    );
  }

  // Show countries.
  return (
    <div className="border rounded shadow-sm py-2 px-4 text-gray-700 mt-2 text-sm">
      <div className="font-light text-gray-700 mb-2">
        Search results for:{" "}
        <span className="text-gray-800 font-bold">{searchText}</span>
      </div>
      <ul>
        {countries.map(({ name, population, currencies, flag }, index) => {
          return (
            <li className="border rounded px-3 py-2 flex mb-1" key={index}>
              <img src={flag} className="w-6 object-contain mr-2"></img>
              <div className="flex justify-between flex-1">
                <span className="text-gray-800">
                  {name}
                  <span className="ml-1 text-xs font-light">
                    ({currencies.map((currency) => currency.code)})
                  </span>
                </span>
                <button
                  className="uppercase disabled:opacity-25 bg-teal-500 rounded-md text-white text-xs px-2"
                  disabled={selectedCountries.some((sc) => {
                    return sc.name === name;
                  })}
                  onClick={() => {
                    selectCountry({ name, population, currencies, flag });
                  }}
                >
                  Add
                </button>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default SearchResults;
