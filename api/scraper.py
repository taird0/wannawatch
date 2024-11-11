import requests
from bs4 import BeautifulSoup
import json

header = {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36"
    }

def search(keyword):
    url = f"https://www.rottentomatoes.com/search?search={keyword}"

    response = requests.get(url, header)

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






def search_genre(genre, filter="audience_highest"):
    base_url = f"https://www.rottentomatoes.com"

    list = f"/browse/movies_at_home/genres:{genre}~sort:{filter}"

    response = requests.get(base_url + list, header)

    soup = BeautifulSoup(response.content, 'html.parser')

    movie_list = soup.find_all('div', class_='flex-container')

    movie_data_dict = {}
    id = 1

    for m in movie_list:
        m_endpoint = m.find_all('a')[0]['href']

        movie_response = requests.get(base_url + m_endpoint, header)
        movie_soup = BeautifulSoup(movie_response.content, 'html.parser')

        div_list = movie_soup.find('div', attrs={'data-modulecastcrewmanager': 'container'})
        
        try:
            actor_list = [div.get_text() for div in div_list.find_all('p', class_='name')]
        except AttributeError:
            actor_list = []

        print()
        movie_data_dict[id] = [
            movie_soup.find('title').get_text().split('|')[0].split('()')[0], # title
            movie_soup.find('rt-text', attrs={'slot': 'audienceScore'}).get_text(), # rating
            movie_soup.find_all('div', attrs={'class': 'category-wrap'})[-2].find_all('rt-text')[1].get_text().split(',')[1].strip(), # released
            [actor_list[actor] for actor in range(1, 3) if actor_list], # starring
            movie_soup.find('rt-img', attrs={'slot': 'posterImage'})['src'] # poster
        ]

        print(movie_data_dict)


    #print(movie_list)
search_genre('adventure')




