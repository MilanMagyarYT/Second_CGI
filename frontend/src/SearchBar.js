import React, { useState } from 'react';
import './SearchBar.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

function SearchBar() {
    const [inputValue, setInputValue] = useState('');
    const [isError, setIsError] = useState(false);

    const handleInputChange = (event) => {
        setInputValue(event.target.value);
        setIsError(false); // Reset error state on input change
    };

    return (
        <div className="search-container">
            <FontAwesomeIcon icon={faSearch} className="search-icon" />
            <input 
                type="text"
                className={`search-input ${isError ? 'error' : ''}`}
                value={inputValue}
                onChange={handleInputChange}
                placeholder="Search for ID"
                disabled={inputValue.length > 10} // Example condition for disabled state
            />
            <span className="support-text">{isError ? "Error message here" : "Supporting text"}</span>
        </div>
    );
}

export default SearchBar;
