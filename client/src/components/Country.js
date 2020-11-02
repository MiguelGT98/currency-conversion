import React from "react";

// Formatters for numbers and currency
const formatter = new Intl.NumberFormat("en-US");
const currencyFormatter = new Intl.NumberFormat("en-US", {
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

// Component for selected country view
const Country = ({ name, currencies, population, amountToConvert, flag }) => {
  return (
    <div className="flex justify-start border rounded px-4 py-2 mb-2 text-gray-700">
      <img className="inline-block w-12 mr-2 object-contain" src={flag}></img>
      <div className="flex flex-1 justify-between items-center">
        <div>
          <p className="text-gray-900">
            {name}
            <span className="font-light text-xs ml-1">
              (
              {currencies.map((currency, index, arr) => {
                return arr.length > 1 && index < arr.length - 1
                  ? `${currency.code}, `
                  : currency.code;
              })}
              )
            </span>
          </p>
          <p className="text-gray-700 text-xs uppercase font-light">
            Population: {formatter.format(population)}
          </p>
        </div>
        <div>
          {currencies.map((currency, index) => {
            return (
              <span
                className="inline-block text-lg font-medium text-gray-900 ml-2"
                key={index}
              >
                <span className="text-sm text-gray-700 font-normal mr-1">
                  {currency.symbol}
                </span>
                {currencyFormatter.format(amountToConvert / currency.rate)}
                <span className="text-xs text-gray-700 font-light ml-1">
                  {currency.code}
                </span>
              </span>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Country;
