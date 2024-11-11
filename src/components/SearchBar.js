import React from 'react';

function SearchBar({handleTextInput, handleKeyDown, searchTerm, closestMatch, placeholder}) {
    return (
        <div id="search">
            <input 
            type='text' 
            name='searchBar' 
            value={searchTerm || ""} 
            onChange={handleTextInput} 
            onKeyDown={handleKeyDown}
            placeholder={placeholder} 
            />
            <div id="auto">
                <span style={{/*paddingLeft: searchTerm.length * 16 + "px"*/}}>{closestMatch}</span>
            </div>
        </div>
    )
}

export default SearchBar;