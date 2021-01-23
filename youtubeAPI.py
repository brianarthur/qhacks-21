from youtubesearchpython import VideosSearch
from musixmatch import Musixmatch

def searchForSong(name):
    videos = VideosSearch(name, limit=5)
    videoId = videos.result()['result'][0]['id']

    url = 'https://www.youtube.com/watch?v=' + videoId
    print(url)

def getLyrics():
    musixmatch = Musixmatch('c946deab730c6e994928091c2b5fded3')
    track_id = musixmatch.track_search(q_track='wap',q_artist='cardi b', page_size=10, page=1, s_track_rating='desc')['message']['body']['track_list'][0]['track']['track_id']
    track = musixmatch.track_subtitle_get(track_id)
    print(track)


searchForSong('despacito')
getLyrics()