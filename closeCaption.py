import requests
import json
from bs4 import BeautifulSoup

def request_song_info(song_title, artist_name):
    base_url = 'https://api.genius.com'
    headers = {'Authorization': 'Bearer ' + 'M6WnJ_qNOATDcGwufHrPHvCePoR3xqi-zvoi-hnJfpufWcyO58qR3SgWnYwrP8bb'}
    search_url = base_url + '/search'
    data = {'q': song_title + ' ' + artist_name}
    response = requests.get(search_url, data=data, headers=headers)
    json = response.json()
    remote_song_info = None
    for hit in json['response']['hits']:
        if artist_name.lower() in hit['result']['primary_artist']['name'].lower():
            remote_song_info = hit
            break
    
    if remote_song_info:
        song_url = remote_song_info['result']['url']

    return song_url

def scrap_song_url(url):
    page = requests.get(url)
    html = BeautifulSoup(page.text, 'html.parser')
    lyrics = html.find('div', 'lyrics').get_text()

    return lyrics

url = request_song_info('wap', 'cardi b')
print(scrap_song_url(url))