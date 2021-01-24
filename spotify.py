import spotipy
import random
import requests
from youtubesearchpython import VideosSearch
import numpy as np
import time
from collections import OrderedDict


CLIENT_ID = "0413ac0616dc44fb99939db92ba465f3"
CLIENT_SECRET = "ccd4d0604f3a47b89cd3b903f6456268"
REDIRECT_URI = "http://localhost:3000"

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

        while playlistLength < 60:
            items = self.sp.playlist_items(playlistID, limit=60)['items']
            songList = []
            for song in items:
                songList.append(song['track']['id'])
            if len(songList) >= 5:
                pickSeed = random.sample(songList, 5)
            else:
                pickSeed = songList
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

    def generateYoutubeURLs(self, playlistID):
        start = time.time()
        songs = self.sp.playlist_items(playlistID, limit=60)['items']
        bigD = dict()
        bigD["playlistID"] = playlistID
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
        bigD["tracks"] = urls
        end = time.time()
        print(end-start)
        return bigD
    
    def searchForSong(self, name):
        videos = VideosSearch(name, limit=1)
        duration = videos.result()['result'][0]['duration']
        print(duration)
        seconds = int(duration.split(':')[0])*60 + int(duration.split(':')[1])
        print(seconds)
        startTime = int(np.random.normal(seconds/2 - 30, seconds/4))
        print(startTime)
        if seconds - startTime < 60:
            startTime = seconds - 65
        videoId = videos.result()['result'][0]['id']
        url = 'https://www.youtube.com/embed/' + str(videoId) + '?start=' + str(int(startTime)) + 's&end=' + str(int(startTime)+60)
        return url
    
        
if __name__ == '__main__':
    # music = getMusic('BQDf-E7Mn_-_tjPzWtV66okJ7tm1VjXdoTlM9-4WbxYuAcPlAumcT7XtW9yjDBF89YOQgjOz0-vTD8QhpA9tl-J1CP8UklHbSNHMBx4qMURz1bbDzFFGjXlBTSxfwS0OKbO8FZ1L7ygpX3b4zkIJ8W9PZjbO6t0zc5QZgfg5MzFwXaTwnYW4KIT8YUrlYpzFsXbJ7ko6LL2cN4ln9a4')
    # songDict = music.populateSonglist(['2r6OAV3WsYtXuXjvJ1lIDi', '4DuUwzP4ALMqpquHU0ltAB', '5SWnsxjhdcEDc7LJjq9UHk'])
    # print(music.findYoutubeURLs(songDict))
    music = getMusic('BQDVAEEHPYh7ytlhMcTB6BAFJkK3w6VWhLMIjCEwGC1nNFqzQVe2JW4gzap1hTkl4w77XA-gHxtkN9THemmmONHhNKvqmqJlrDr54ZqDNb9EoOoM_l3PgmzxKlEk4gXtlF1IrX9TNjxBNpH3Z2UpbsbOVsON9v91vvGmNB43Oh5lHPjKHuIxRoXAYzhgv5Y')
    music.searchForSong(name="WAP Cardi B Megan Three Stallion")