import spotipy
from spotipy.oauth2 import SpotifyClientCredentials

CLIENT_ID = "0413ac0616dc44fb99939db92ba465f3"
CLIENT_SECRET = "ccd4d0604f3a47b89cd3b903f6456268"
REDIRECT_URI = "http://localhost:3000"

sp = spotipy.Spotify(auth_manager=SpotifyOAuth(client_id= CLIENT_ID,
                                               client_secret= CLIENT_SECRET ,
                                               redirect_uri= REDIRECT_URI,
                                               scope="user-library-read"))

results = sp.search(q = 'track_search')

for idx, item in enumerate(results['items']):
    track = item['track']
    print(idx, track['artists'][0]['name'], " – ", track['name'])
