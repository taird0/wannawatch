import React, {useState} from 'react';

import SearchBar from '../components/SearchBar';

function SearchContainer()
{
    const suggestions = ["action", "adventure", "animation", "anime",
        "biography", "biography", "crime", "comedy", "documentary", "drama", 
        "entertainment", "fantasy", "game show", "lgbtq+", "health",
        "history", "holiday", "horror", "kids & family", "music",
        "mystery", "thriller", "nature", "news", "reality", "romance",
        "sci-fi", "short", "soap", "special interest", "sports", 
        "stand-up", "talk-show", "travel", "variety", "war", "western"
    ];

    const [searchTerm, setSearchTerm] = useState('');
    const [autocomplete, setAutocomplete] = useState([]);
    const [closestMatch, setClosestMatch] = useState('');

    const handleTextInput = (e) => {
        const value = e.target.value;
        setSearchTerm(value);

        if(value.length > 0) {
            const filteredSuggestions = suggestions.filter(suggestion => 
                suggestion.toLowerCase().startsWith(value.toLowerCase())
            );

            setAutocomplete(filteredSuggestions);
            setClosestMatch(filteredSuggestions[0]);
            console.log(autocomplete, closestMatch)

            if (filteredSuggestions.length > 0) {
                setClosestMatch(filteredSuggestions[0]);
            } else {
                setClosestMatch('');
            }
        } else {
            setAutocomplete([]);
            setClosestMatch([]);
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Tab' && closestMatch) {
            e.preventDefault();
            setSearchTerm(closestMatch);
            setAutocomplete([]);
            setClosestMatch('');
        }
    }

    return (
        <div className="Search Container">
            <SearchBar 
            handleTextInput={handleTextInput}
            handleKeyDown={handleKeyDown}
            searchTerm={searchTerm}
            closestMatch={closestMatch}
            placeholder={"Enter a genre or keyword"}
            />
        </div>
    )
}

export default SearchContainer;