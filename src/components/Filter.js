import React from 'react';

const Filter = ({ onCountryChange, onFilterTypeChange }) => {
  return (
    <div>
      <label>
        Select Country:
        <select onChange={onCountryChange}>
          <option value="usa">USA</option>
          <option value="brazil">Brazil</option>
          <option value="india">India</option>
          <option value="australia">Australia</option>
          <option value="africa">Africa</option>
          <option value="china">China</option>
        </select>
      </label>
      <label>
        Select Filter:
        <select onChange={onFilterTypeChange}>
          <option value="daily">Daily</option>
          <option value="yearly">Yearly</option>
        </select>
      </label>
    </div>
  );
};

export default Filter;
