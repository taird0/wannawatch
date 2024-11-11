import React from 'react';

function SearchBar({searchTerm, handleTextInput, handleKeyDown, placeholder}) {
    return (
        <>
            <input type='text' name='searchBar' value={searchTerm || ""} 
            onChange={handleTextInput} onKeyDown={handleKeyDown} 
            placeholder={placeholder}/>
        </>
    )
}

export default SearchBar;