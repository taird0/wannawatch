from flask import Flask, request
from scraper import search

app = Flask(__name__)

@app.route('/search')
def keyword_scrape():
    return search(request.args.get('keyword'))




