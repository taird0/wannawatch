import requests
from bs4 import BeautifulSoup
import json

def search(keyword):
    url = f"https://www.rottentomatoes.com/search?search={keyword}"


    header = {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36"
    }

    response = requests.get(url, headers=header)

    soup = BeautifulSoup(response.content, 'html.parser')

    movie_data = soup.find_all('search-page-media-row')

    movie_data_dict = {}
    id = 1
    
    for m in movie_data:
        movie_data_dict[id] = [
            m.get_text().strip(), # title
            m.get('tomatometerscore'), # rating
            m.get('releaseyear'), # released
            m.get('cast') .split(','), # starring
            m.find_all('img')[0]['src']  # movie poster 
        ]
        id += 1

    movie_data_json = json.dumps(movie_data_dict, indent=4)

    return movie_data_json





