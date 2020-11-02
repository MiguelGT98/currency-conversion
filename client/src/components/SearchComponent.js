import React, { useRef, useState } from "react";

// Import axios library for making http requests.
import Axios from "axios";

// Import search results component to show search results.
import SearchResults from "./SearchResults";

const SearchComponent = ({ selectCountry, selectedCountries }) => {
  // State variables for countries returned from search, search text and loading status.
  const [countries, setCountries] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [loading, setLoading] = useState(false);
  const [limitReached, setLimitReached] = useState(false);

  // Ref for search input.
  const searchElement = useRef("");

  const onSubmit = (e) => {
    // Prevent form submission
    e.preventDefault();

    // Get search text.
    const searchText = searchElement.current.value;

    // Set loading status and search text
    setSearchText(searchText);
    setLoading(true);

    // Make request to API with search text and token from local storage.
    Axios.get(
      `${
        process.env.REACT_APP_API_ENDPOINT ||
        "https://peaceful-wildwood-04873.herokuapp.com"
      }/countries?name=${searchText}`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    )
      .then((res) => {
        // If countries were returned, set countries to be the search result.
        if (res.status === 200) {
          setCountries(res.data.countries);
          setLoading(false);
          setLimitReached(false);
        }
      })
      .catch((error) => {
        // If an error happened,  set countries to an empty array and stop loading.
        setCountries([]);
        setLoading(false);

        // If the request limit was reached, set countries to an empty array and send limitReached to true.
        if (error.response.status === 429) {
          setLimitReached(true);
          return;
        }

        // If any other error happened, set limitReached to false.
        setLimitReached(false);
      });
  };

  return (
    <div className="">
      <form className="flex">
        <input
          type="text"
          className="border rounded py-1 px-3 text-gray-800 capitalize flex-1"
          name="search"
          ref={searchElement}
        ></input>
        <button
          type="submit"
          name="search"
          onClick={onSubmit}
          className="bg-teal-500 text-sm text-white rounded ml-2 px-4"
        >
          Search
        </button>
      </form>
      <SearchResults
        limitReached={limitReached}
        loading={loading}
        countries={countries}
        searchText={searchText}
        selectCountry={selectCountry}
        selectedCountries={selectedCountries}
      ></SearchResults>
    </div>
  );
};

export default SearchComponent;
