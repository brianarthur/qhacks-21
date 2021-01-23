import React, { useState, useEffect } from 'react';
import logo from './logo.svg';
import './App.scss';

import axios from 'axios';

import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import { DataGrid } from '@material-ui/data-grid';
import TextField from '@material-ui/core/TextField'
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import Fab from '@material-ui/core/Fab';

import MusicNoteIcon from '@material-ui/icons/MusicNote';
import DeleteIcon from '@material-ui/icons/Delete';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';

import { spotifyAuthenticateUrl } from './constants';

let clientID = "0413ac0616dc44fb99939db92ba465f3"
let redirect = "http://localhost:3000/"
const url = `${spotifyAuthenticateUrl}?client_id=${clientID}&response_type=token&redirect_uri=${redirect}`;

const App = () => {
  const [auth, setAuth] = useState(false);
  const [value, setValue] = useState(0);

  useEffect(() => {
    // check auth of spotify
  }, []);

  const handleAuthenticate = () => {
    setAuth(true);
  }

  const columns = [
    { field: 'title', headerName: 'TITLE', width: 300 },
    { field: 'artist', headerName: 'ARTIST', width: 300 },
    { field: 'time', headerName: 'TIME', width: 300 },
  ];
  const rows = [
    { id: 1, title: 'WAP', artist: 'Cardi B', time: '3:00' },
    { id: 2, title: 'Started From the Bottom', artist: 'Drake', time: '4:30' },
    { id: 3, title: 'Hi Brian', artist: 'Brian Arthur', time: '4:20' },
  ];

  const a11yProps = (index) => {
    return {
      id: `full-width-tab-${index}`,
      'aria-controls': `full-width-tabpanel-${index}`,
    };
  }

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div>
      <AppBar position="static">
        <Toolbar>
          <Typography variant='h6'>
            Power Hour Buddy
          </Typography>
        </Toolbar>
      </AppBar>
      {!auth && 
        <div className="not-authenticated">
          <iframe height="400" width="600" src="https://www.youtube.com/embed/rfscVS0vtbw?autoplay=1&controls=0&rel=0&t=400s">
          </iframe>
          <Card className="not-authenticated-card">
            <CardContent>
              <Typography gutterBottom variant="h5">
                Not authenticated with Spotify.
              </Typography>
            </CardContent>
            <CardContent className="not-authenticated-card-btn">
              <CardActions>
                <Button size="small" color="primary" href={url}>
                  Authenticate
                </Button>
              </CardActions>
            </CardContent>
          </Card>
        </div>
      }
      {auth &&
        <>
          <Typography variant="h5">
            Pick the Songs you want
          </Typography>
          <AppBar position="static" color="default">
            <Tabs
              value={value}
              onChange={handleChange}
              indicatorColor="primary"
              textColor="primary"
              variant="fullWidth"
              aria-label="full width tabs example"
            >
              <Tab label="Popular Songs" {...a11yProps(0)} /><form noValidate autoComplete="off"><TextField id="standard-basic" label="Song Title or Artist Name" style={{ width: '300px'}} /></form>
              <Tab label="Hot Artists" {...a11yProps(1)} />
              <Tab label="Your Playlists" {...a11yProps(2)} />
            </Tabs>
          </AppBar>
          <form noValidate autoComplete="off">
            <TextField id="standard-basic" label="Song Title or Artist Name" style={{ width: '300px'}} />
          </form>
          <div style={{ height: 400, width: '100%' }}>
            <DataGrid rows={rows} columns={columns} pagesize= {5} checkboxSelection />
          </div>
          <Typography variant="h5">
            Songs Added to your List
          </Typography>
          <List dense={true} style={{width: 400}}>
            <ListItem>
              <ListItemAvatar>
                <Avatar>
                  <MusicNoteIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText
                primary="Song Name"
                secondary="Artist"
              />
              <ListItemSecondaryAction>
                <IconButton edge="end" aria-label="delete">
                  <DeleteIcon />
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>
          </List>
          <Fab color="secondary" aria-label="play" className="play-btn">
            <PlayArrowIcon />
          </Fab>  
        </>
      }
    </div>
  );
}

export default App;
