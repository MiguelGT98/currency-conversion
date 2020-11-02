import React from "react";
import Country from "./Country";

// Component for rendering the selected country list.
const CountryList = ({ countries, amount }) => {
  return (
    <div>
      {countries.map((country, index) => (
        <Country {...country} key={index} amountToConvert={amount}></Country>
      ))}
    </div>
  );
};

export default CountryList;
