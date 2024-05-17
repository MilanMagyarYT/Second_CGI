import React, { useState } from 'react';
import './SearchBar.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

function SearchBar({ onSearch }) {
    const [inputValue, setInputValue] = useState('');
    const [isError, setIsError] = useState(false);

    const handleInputChange = (event) => {
        setInputValue(event.target.value);
        setIsError(false); // Reset error state on input change
    };

    const handleSearch = () => {
        if (inputValue.trim() === '') {
            setIsError(true);
        } else {
            onSearch(inputValue.trim());
        }
    };

    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            handleSearch();
        }
    };

    return (
        <div className="search-container">
            <FontAwesomeIcon icon={faSearch} className="search-icon" />
            <input 
                type="text"
                className={`search-input ${isError ? 'error' : ''}`}
                value={inputValue}
                onChange={handleInputChange}
                onKeyDown={handleKeyDown}
                placeholder="Search for ID"
                disabled={inputValue.length > 10} // Example condition for disabled state
            />
            <button onClick={handleSearch}>Search</button>
            <span className="support-text">{isError ? "Error message here" : "Supporting text"}</span>
        </div>
    );
}

export default SearchBar;
