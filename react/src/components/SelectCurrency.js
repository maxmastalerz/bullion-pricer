import React from 'react';
import { getCountryList } from "country-data-codes";

let countries = getCountryList().filter((value, index, self) => { // get unique currency codes.
    return self.findIndex(v => v.currency.code === value.currency.code && v.currency.code !== "No Universal Currency") === index;
}).sort((a, b) => a.currency.code.localeCompare(b.currency.code));

const SelectCurrency = ({ onChange, value = 'USD' }) => {
	return (
        <div style={{float: "right", position: "relative", marginBottom: "calc(-22.4px - 30px)", bottom: "calc(22.4px + 30px)"}}>
            <span style={{paddingRight: "10px"}}>Currency</span>
            
            <div className="currency-selector">
                <select className="nice-select" style={{ height: '30px'}} onChange={onChange} value={value}>
                    {countries.map(function(country, i) {
                        return (<option key={i} value={country.currency.code}>{country.currency.code}</option>);
                    })}
                </select>
            </div>
        </div>
	);
};

export default SelectCurrency;