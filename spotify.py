import spotipy
import random
import requests
from youtubesearchpython import VideosSearch
import numpy as np
import time
from collections import OrderedDict
import threading
import queue


CLIENT_ID = "0413ac0616dc44fb99939db92ba465f3"
CLIENT_SECRET = "ccd4d0604f3a47b89cd3b903f6456268"
REDIRECT_URI = "http://localhost:3000"
NUM_THREADS = 10

class getMusic():

    def __init__(self, usrTkn):
        self.sp = spotipy.Spotify(auth=usrTkn)
        self.usrID = self.sp.current_user()['id']
        self.description = "Playlist brought to you by power hour buddy"

        self.words = ('Bumfuzzle', 'Cattywampus', 'Gardyloo', 'Taradiddle', 'Snickersnee', ' Widdershins', 'Collywobbles', 'Gubbins', 'Abibliophobia', 'Bumbershoot',
                      'Lollygag', 'Flibbertigibbet', 'Malarkey', 'Pandiculation', 'Sialoquent', 'Wabbit', 'Snollygoster', 'Erinaceous', 'Bibble', 'Impignorate', 'Nudiustertian', 'Quire', 'Ratoon',
                      'Quire', 'Ratoon', 'Yarborough', 'Xertz', 'Zoanthropy', 'Pauciloquent', 'Bloviate', 'Borborygm', 'Brouhaha', 'Absquatulate', 'Comeuppance', 'Donnybrook', 'Nincompoop')

    def createPlaylist(self, usrPlaylist=None):

        userPlaylists = self.sp.user_playlists(self.usrID)['items']
        playlistFlag = True
        while playlistFlag:
            name = random.choice(self.words) + " " + random.choice(self.words)
            print(name)
            for playlist in userPlaylists:
                if playlist['name'] == name:
                    playlistFlag = True
                    break
                else:
                    playlistFlag = False

        playlistID = self.sp.user_playlist_create(self.usrID, name, description=self.description)['id']
        print(playlistID)
        if usrPlaylist:
            self.sp.user_playlist_add_tracks(self.usrID, playlistID, usrPlaylist)

        return playlistID

    def populatePlaylist(self, playlistID):
        #find playlist items
        playlistLength = len(self.sp.playlist_items(playlistID, limit=60)['items'])
        seedList = []
        for title in self.sp.playlist_items(playlistID, limit=60)['items']:
            seedList.append(title['track']['id'])


        while playlistLength < 60:
            items = self.sp.playlist_items(playlistID, limit=60)['items']
            songList = []
            for song in items:
                songList.append(song['track']['id'])
            if len(seedList) >= 5:
                pickSeed = random.sample(seedList, 5)
            else:
                pickSeed = seedList
            songRecommendation = self.sp.recommendations(seed_tracks=pickSeed, limit=10)['tracks']
            newSongs = []
            breakBool = False
            for track in songRecommendation:
                if track['id'] not in songList:
                    newSongs.append(track['id'])
                    playlistLength += 1
                    if playlistLength >= 60:
                        breakBool = True
                        break
            self.sp.user_playlist_add_tracks(self.usrID, playlistID, newSongs)
            if breakBool:
                break

    def generateWithThreading(self, playlistID):
        start = time.time()
        songs = self.sp.playlist_items(playlistID, limit=60)['items']

        playlistSubsets = [[] for i in range(NUM_THREADS)]
        for i in range(len(songs)):
            playlistSubsets[i % NUM_THREADS].append(songs[i])

        q = queue.Queue()
        threads = []
        for i in range(NUM_THREADS):
            thread = threading.Thread(target=self.generateYoutubeURLs, args=(playlistSubsets[i], q))
            thread.start()
            threads.append(thread)
        
        for thread in threads:
            thread.join()

        bigD = dict()
        bigD["playlistID"] = playlistID

        allUrls = dict()
        while not q.empty():
            urls = q.get()
            allUrls.update(urls)
        
        bigD['tracks'] = allUrls
        print(time.time()-start)
        return bigD

    def generateYoutubeURLs(self, songs, q):
        
        urls = dict()
        notFound = []
        for song in songs:
            searchQuery = song['track']['name'] + ' ' + song['track']['artists'][0]['name']
            try:
                urls[song['track']['id']] = self.searchForSong(searchQuery)
            except:
                notFound.append(song)
                print('could not find ' + searchQuery)
        for song in notFound:
            searchQuery = song['track']['name'] + ' ' + song['track']['artists'][0]['name']
            try:
                urls[song['track']['id']] = self.searchForSong(searchQuery)
            except:
                print('could not find ' + searchQuery + ' again')
        
        q.put(urls)
    
    def searchForSong(self, name):
        videos = VideosSearch(name + ' music video', limit=10)
        duration = videos.result()['result'][0]['duration']
        seconds = int(duration.split(':')[0])*60 + int(duration.split(':')[1])
        startTime = int(np.random.normal(seconds/2 - 30, seconds/4))
        if seconds - startTime < 60:
            startTime = seconds - 65
        videoId = videos.result()['result'][0]['id']
        url = 'https://www.youtube.com/embed/' + str(videoId) + '?start=' + str(int(startTime)) + 's&end=' + str(int(startTime)+60)
        return url
    
        
if __name__ == '__main__':
    # music = getMusic('BQDf-E7Mn_-_tjPzWtV66okJ7tm1VjXdoTlM9-4WbxYuAcPlAumcT7XtW9yjDBF89YOQgjOz0-vTD8QhpA9tl-J1CP8UklHbSNHMBx4qMURz1bbDzFFGjXlBTSxfwS0OKbO8FZ1L7ygpX3b4zkIJ8W9PZjbO6t0zc5QZgfg5MzFwXaTwnYW4KIT8YUrlYpzFsXbJ7ko6LL2cN4ln9a4')
    # songDict = music.populateSonglist(['2r6OAV3WsYtXuXjvJ1lIDi', '4DuUwzP4ALMqpquHU0ltAB', '5SWnsxjhdcEDc7LJjq9UHk'])
    # print(music.findYoutubeURLs(songDict))
    music = getMusic('BQBGOIXCYdYGc3e6ryf3QElQi9R5OFLqzj8gbbGA7SWm4TpbYv0VX1ClswhFBpGcZuvCzUfSPFZZ8GR7QODokcb7CiAK2PT6XmGy7pwN59z2wlWxsfTQ6DFg3zbAhs7qFJqT88foAlR1DhFut-SlrTgBbpWekgTSnXYy2YQTn_0o8rpdnR276l6ZtpXbCfTrngiAnVxEkCOZL8OpO8U')
    bigD = music.generateWithThreading('1Ncn0EfMlvxAbtPGixyqoO')
    print(bigD)