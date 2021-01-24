import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { spotifyAxios } from '../utils/axiosUtil';

import Grid from '@material-ui/core/Grid';
import Chip from '@material-ui/core/Chip';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';

import { spotifyPopularPlaylistUrl, spotifySearchUrl, spotifyPersonalTracksUrl, spotifyPersonalPlaylistsUrl, spotifyPlaylistUrl, spotifyGenreRecommendationsUrl } from '../utils/constants';
import { parsePlaylist, parseData } from '../utils/utils';

export const PopularSongsTabView = ({ setData }) => {
    const [search, setSearch] = useState("");

    const loadInitialData = () => {
        spotifyAxios
            .get(spotifyPopularPlaylistUrl)
            .then(({ data }) => setData(parsePlaylist(data.items)))
            .catch(err => console.log(err));
    }

    useEffect(() => {
        setSearch("");
        loadInitialData();
    }, []);

    const handleSearch = e => {
        let val = e.target.value;
        setSearch(val);
        if (val) {
            spotifyAxios
                .get(spotifySearchUrl, {
                    params: {
                        type: 'track',
                        q: val,
                    }
                })
                .then(({ data }) => setData(parseData(data.tracks.items)))
                .catch(err => console.log(err));
        } else {
            loadInitialData();
        }
    }

    return (
        <Grid container>
            <Grid item>
                <form noValidate autoComplete="off">
                    <TextField id="standard-basic" label="Search Song" style={{ width: '300px'}} value={search} onChange={handleSearch} />
                </form>
            </Grid>
        </Grid>
    );
}

export const PersonalTabView = ({ setData }) => {
    useEffect(() => {
        spotifyAxios
            .get(spotifyPersonalTracksUrl)
            .then(({ data }) => setData(parseData(data.items)))
            .catch(err => console.log(err))
    }, [setData]);

    return null;
}


export const PersonalPlaylistTabView = ({ setData }) => {
    const [playlists, setPlaylists] = useState([]);
    const [selectedPlaylist, setSelectedPlaylist] = useState({});

    useEffect(() => {
        setData([]);
        spotifyAxios
            .get(spotifyPersonalPlaylistsUrl, { params: { limit: 8 }})
            .then(({ data }) => setPlaylists(data.items.map(item => {return { id: item.id, name: item.name}})))
            .catch(err => console.log(err));
    }, [setData]);

    const handleClick = (playlist) => {
        setSelectedPlaylist(playlist);
        spotifyAxios
            .get(spotifyPlaylistUrl(playlist.id))
            .then(({ data }) => setData(parsePlaylist(data.items)))
            .catch(err => console.log(err));
    }

    return (
        <Grid container>
            <Grid item xs={12}>
                {
                    playlists.map(playlist => (
                        <span key={playlist.id} style={{padding: 10}}>
                            <Chip
                                label={playlist.name}
                                color={playlist.id === selectedPlaylist.id ? 'primary' : 'default'}
                                onClick={() => handleClick(playlist)}
                            />
                        </span>
                    ))
                }
            </Grid>
            <Grid item xs={12}>
                {selectedPlaylist.id && 
                    <div className="use-playlist-div">
                        <Typography variant="body1">
                            Click here to use 
                            <Chip
                                className="use-playlist-chip"
                                label={selectedPlaylist.name}
                                color="secondary"
                                component={Link}
                                to={`/play/${selectedPlaylist.id}`}
                            />
                            as power hour playlist.</Typography>
                    </div>
                }
            </Grid>
        </Grid>
    );
}

const genres = ["hip-hop", "pop", "rock", "party", "dance", "club", "work-out", "country"];
export const GenreTabView = ({ setData }) => {
    const [selectedGenre, setSelectedGenre] = useState("");

    useEffect(() => setData([]), [setData]);

    const handleClick = genre => {
        setSelectedGenre(genre);
        spotifyAxios
            .get(spotifyGenreRecommendationsUrl, {
                params: {
                    seed_genres: genre,
                }
            })
            .then(({ data }) => setData(parseData(data.tracks)))
            .catch(err => console.log(err));
    }
    return (
        <Grid container>
            <Grid item>
                {
                    genres.map(genre => (
                        <span key={genre} style={{padding: 10}}>
                            <Chip
                                label={genre}
                                color={genre === selectedGenre ? 'primary' : 'default'}
                                onClick={() => handleClick(genre)}
                            />
                        </span>
                    ))
                }
            </Grid>
        </Grid>
    );
}
