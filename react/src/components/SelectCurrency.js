import React from 'react';
import { getCountryList } from "country-data-codes";

let countries = getCountryList().filter((value, index, self) => { // get unique currency codes.
    return self.findIndex(v => v.currency.code === value.currency.code && v.currency.code !== "No Universal Currency") === index;
}).sort((a, b) => a.currency.code.localeCompare(b.currency.code));

const SelectCurrency = ({ onChange, value = 'USD' }) => {
	return (
        <div className="currency-selector-container">
            <span>Currency</span>
            
            <div className="currency-selector">
                <select className="nice-select" onChange={onChange} value={value}>
                    {countries.map(function(country, i) {
                        return (<option key={i} value={country.currency.code}>{country.currency.code}</option>);
                    })}
                </select>
            </div>
        </div>
	);
};

export default SelectCurrency;