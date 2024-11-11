from flask import Flask, request
from scraper import search, search_genre

app = Flask(__name__)

@app.route('/search')
def keyword_scrape():
    return search(request.args.get('keyword'))

@app.route('/genre')
def genre_scrape():
    return search_genre(request.args.get('genre'), request.args.get('filter'))


