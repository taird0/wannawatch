import React, {useState} from 'react';

import SearchBar from '../components/SearchBar';

function SearchContainer()
{
    const suggestions = ["Action", "Adventure", "Animation", "Anime",
        "Biography", "Biography", "Crime", "Documentary", "Drama", 
        "Entertainment", "Fantasy", "Game Show", "LGBTQ+", "Health",
        "History", "Holiday", "Horror", "Kids & Family", "Music",
        "Mystery", "Thriller", "Nature", "News", "Reality", "Romance",
        "Sci-Fi", "Short", "Soap", "Special Interest", "Sports", 
        "Stand-Up", "Talk-Show", "Travel", "Variety", "War", "Western"
    ];

    const [searchTerm, setSearchTerm] = useState('');
    const [autocomplete, setAutocomplete] = useState([]);
    const [closestMatch, setClosestMatch] = useState('');

    const handleTextInput = (e) => {
        const value = e.target.value;
        setSearchTerm(value);
        if(value.length > 0) {
            const filteredSuggestions = suggestions.filter(suggestion => 
                suggestion.toLowerCase().includes(value.toLowerCase())
            );
            setAutocomplete(filteredSuggestions);
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
            placeholder={"Enter a genre or keyword"}
            />

            <span style={{paddingLeft: searchTerm.length * 8,}}>
                {closestMatch.slice(searchTerm.length)}
            </span>
        </div>
    )
}

export default SearchContainer;