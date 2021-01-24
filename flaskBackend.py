from flask import Flask
from flask import request
from spotify import getMusic

app = Flask(__name__, static_folder='./build', static_url_path='/')

@app.route('/api/generate', methods=['POST'])
def generate_playlist():
    data = request.json
    try:
        music = getMusic(data['token'])
        tracks = data['tracks']
        if type(tracks) is str:
            tracks = tracks.replace(' ', '').split(',')
        playlistID = music.createPlaylist(tracks)
        music.populatePlaylist(playlistID)
        return playlistID
    except Exception as e:
        print(e)
        return "ERROR in generatePlaylist"

@app.route('/api/play/<playlistID>', methods=['POST'])
def get_urls(playlistID):
    token = request.json['token']
    try:
        music = getMusic(token)
        return music.generateYoutubeURLs(playlistID)
    except Exception as e:
        print(e)
        return "ERROR in getURLs"


@app.route('/', methods = ['GET'])
def index():
    return app.send_static_file('index.html')

@app.route('/path/<playlistID>', methods = ['GET'])
def path_index():
    return app.send_static_file('index.html')