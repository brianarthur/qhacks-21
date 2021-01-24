import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { spotifyAxios, backendAxios } from '../utils/axiosUtil';
import { parsePlaylist } from '../utils/utils';
import { Link, useParams } from 'react-router-dom';

import ReactPlayer from 'react-player/youtube';
import ReactAudioPlayer from 'react-audio-player';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';

import { spotifyPlaylistUrl, playPlaylistUrl } from '../utils/constants';
import audio from '../subtleAirhorn.mp3';

const Play = ({ token }) => {
    const [count, setCount] = useState(59);
    const [startedPlaying, setStartedPlaying] = useState(false);
    const [playButton, setPlayButton] = useState(false);
    const [playAudio, setPlayAudio] = useState(false);
    const [playlist, setPlaylist] = useState([]);
    const [urls, setUrls] = useState(null);

    const { playlistId } = useParams();

    useEffect(() => {
        if (playlistId && token) {
            const json = JSON.stringify({
                "token": token,
            });
            spotifyAxios
                .get(spotifyPlaylistUrl(playlistId), {params: {limit: 60}})
                .then(({data}) => setPlaylist(parsePlaylist(data.items)))
                .catch(err => console.log(err));
            backendAxios
                .post(playPlaylistUrl(playlistId), json)
                .then(({data}) => setUrls(data.tracks))
                .catch(err => console.log(err));
        }
    }, [playlistId, token]);

    const handleStart = () => {
        setPlayAudio(true);
        setPlayButton(true);
    }

    const handleTransition = () => {
        if (startedPlaying) {
            setCount(count + 1);
            setStartedPlaying(false);
            setPlayAudio(true);
        }
    }

    const handleSkipSong = () => {
        setPlayAudio(true);
        setCount(count + 1);
    }

    const handleRewatch = () => {
        setPlayAudio(true);
        setCount(0);
    }

    if (!urls) {
        return (
            <Box p={3}>
                <Typography variant="h4">Loading playlist...</Typography>
            </Box>
        )   
    }

    if (count >= playlist.length) {
        return (
            <Box p={3}>
                <Typography variant="h4">Thanks for watching. Click <Link to="/">here</Link> to create new playlist.</Typography>
                <Typography variant="h4">Click <button className="link-button" onClick={handleRewatch}>here</button> to rewatch.</Typography>
            </Box>
        );
    }

    const trackId = playlist[count].id;
    const trackUrl = urls[trackId];

    return (
        <>
            {!playButton && <Button className="player-play-btn" size="large" variant="contained" color="secondary" onClick={handleStart}>Play Power Hour</Button>}
            {playButton && 
                <>
                    <Box p={3}>
                        <Typography variant="h4">Enjoy your custom Power Hour.</Typography>
                    </Box>
                    <div className='player-wrapper'>
                        <ReactPlayer 
                            className='react-player' 
                            width='80%' 
                            height='100%'
                            url={trackUrl} 
                            playing={true} 
                            volume={1} 
                            onEnded={handleTransition} 
                            onStart={() => setStartedPlaying(true)} />
                    </div>
                    <Grid container style={{ marginTop: 24 }}>
                        <Grid item md={3} className="player-center">
                            <Typography variant="h4">{count + 1}/{playlist.length}</Typography>
                        </Grid>
                        <Grid item md={6} className="player-center">
                            <Typography variant="h4">{playlist[count].title}</Typography>
                        </Grid>
                        <Grid item md={3} className="player-center">
                            <IconButton style={{ background: "#f50057", color: "white"}} onClick={handleSkipSong} disabled={playAudio}>
                                <ChevronRightIcon />
                            </IconButton>
                        </Grid>
                    </Grid>
                </>
            }
            {playAudio &&
                <ReactAudioPlayer src={audio} autoPlay onEnded={() => setPlayAudio(false)} />
            }
        </>
    );
}

const mapStateToProps = ({ token }) => {
    return {
        token
    }
  }

export default connect(mapStateToProps)(Play);