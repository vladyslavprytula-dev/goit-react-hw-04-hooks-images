import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './Searchbar.scss';
export default function Seacrchbar({ onSubmit }) {
  const [inputValue, setInputValue] = useState('');
  Seacrchbar.propTypes = {
    onSubmit: PropTypes.func.isRequired,
  };
  const handelInputChange = e => {
    const { value } = e.currentTarget;
    setInputValue(value);
  };
  const handleSubmit = e => {
    e.preventDefault();
    onSubmit(inputValue);
    reset();
  };
  const reset = () => {
    setInputValue('');
  };
  return (
    <header className="Searchbar">
      <form className="SearchForm" onSubmit={handleSubmit}>
        <input
          className="SearchForm-input"
          type="text"
          value={inputValue}
          onChange={handelInputChange}
          placeholder="Search images and photos"
        />
        <button type="submit" className="SearchForm-button">
          <span className="SearchForm-button-label">Search</span>
        </button>
      </form>
    </header>
  );
}
