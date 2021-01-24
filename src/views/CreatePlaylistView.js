import React, { useState } from 'react';
import { backendAxios } from '../utils/axiosUtil';
import { useHistory } from "react-router-dom";
import { connect } from 'react-redux';
import { tracksAdd, tracksRemove } from '../store/actions/tracks';

import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import IconButton from '@material-ui/core/IconButton';
import AppBar from '@material-ui/core/AppBar';
import Typography from '@material-ui/core/Typography';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import Fab from '@material-ui/core/Fab';
import MusicNoteIcon from '@material-ui/icons/MusicNote';
import AddIcon from '@material-ui/icons/Add';
import DeleteIcon from '@material-ui/icons/Delete';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';

import { generateUrl } from '../utils/constants';

import { PopularSongsTabView, PersonalTabView, PersonalPlaylistTabView, GenreTabView } from './TabViews';

const Home = ({ token, tracks, tracksAdd, tracksRemove }) => {
  const [tab, setTab] = useState(0);
  const [data, setData] = useState([]);
  const history = useHistory();

  const handleChangeTab = (event, newValue) => {
    setTab(newValue);
  };

  const handleGenerateClick = () => {
    const trackList = tracks.map(track => track.id);
    const json = JSON.stringify({
      "token": token,
      "tracks": trackList
    });
    backendAxios
      .post(generateUrl, json)
      .then(({ data }) => history.push(`/play/${data}`))
      .catch(err => console.log(err));
  }

  return (
    <>
        <AppBar position="static" color="default">
            <Tabs
                value={tab}
                onChange={handleChangeTab}
                indicatorColor="primary"
                textColor="primary"
                variant="fullWidth"
            >
                <Tab label="Popular Songs" id={'tab-view-0'} />
                <Tab label="Personalized Songs" id={'tab-view-1'} />
                <Tab label="Your Playlists" id={'tab-view-2'} />
                <Tab label="Genres" id={'tab-view-3'} />
            </Tabs>
        </AppBar>
        <TabPanel value={tab} index={0}><PopularSongsTabView setData={setData} /></TabPanel>
        <TabPanel value={tab} index={1}><PersonalTabView setData={setData} /></TabPanel>
        <TabPanel value={tab} index={2}><PersonalPlaylistTabView setData={setData} /></TabPanel>
        <TabPanel value={tab} index={3}><GenreTabView setData={setData} /></TabPanel>
        
        <Grid container>
            <Grid item md={6}>
                <SongsTable data={data} tracks={tracks} tracksAdd={tracksAdd} tracksRemove={tracksRemove} />
                {data.length === 0 && 
                  <Box p={5}>
                    {tab === 2 && <Typography variant="h6">Select playlist to view song info.</Typography>}
                    {tab === 3 && <Typography variant="h6">Select genre to view song info.</Typography>}
                  </Box>
                }
            </Grid>
            <Grid item md={6}>
                {tracks.length > 0 &&
                    <>
                        <Typography variant="h5">
                        Songs Added to your Playlist
                        </Typography>
                        {
                            tracks.map(track => {
                                return (
                                    <List key={track.id} dense={true} style={{width: 400}}>
                                        <ListItem>
                                        <ListItemAvatar>
                                            <Avatar>
                                            <MusicNoteIcon />
                                            </Avatar>
                                        </ListItemAvatar>
                                        <ListItemText
                                            primary={track.title}
                                            secondary={track.artist}
                                        />
                                        <ListItemSecondaryAction>
                                            <IconButton edge="end" aria-label="delete" onClick={() => tracksRemove(track)}>
                                            <DeleteIcon />
                                            </IconButton>
                                        </ListItemSecondaryAction>
                                        </ListItem>
                                    </List>
                                )
                            })
                        }
                    </>
                }
            </Grid>
        </Grid>
        { tracks.length > 0 &&
            <Fab color="secondary" aria-label="play" className="play-btn" onClick={handleGenerateClick}>
                <PlayArrowIcon />
            </Fab>
        }  
    </>
  );
}

const TabPanel = ({ children, value, index, ...otherProps }) => {
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...otherProps}
    >
      {value === index && (
        <Box p={3}>
          {children}
        </Box>
      )}
    </div>
  );
}

const SongsTable = ({ data, tracks, tracksAdd, tracksRemove }) => {
  return (
    <TableContainer component={Paper} style={{ width: "90%", margin: "auto" }}>
      <Table aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="right">Title</TableCell>
            <TableCell align="right">Artist</TableCell>
            <TableCell align="right">Time</TableCell>
            <TableCell align="right"></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row) => {
            let added = Boolean(tracks.find(track => track.id === row.id));
            return (
              <TableRow key={row.id}>
                <TableCell component="th" scope="row">
                  {row.title}
                </TableCell>
                <TableCell align="right">{row.artist}</TableCell>
                <TableCell align="right">{row.time}</TableCell>
                <TableCell align="right">
                  <IconButton size="small" onClick={added ? () => tracksRemove(row) : () => tracksAdd(row)}>
                    { added ? <DeleteIcon /> : <AddIcon /> }
                  </IconButton>
                </TableCell>
              </TableRow>
            )
          })}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

const mapStateToProps = ({token, tracks}) => {
  return {
    token, tracks,
  }
}

const mapDispatchToProps = { tracksAdd, tracksRemove };

export default connect(mapStateToProps, mapDispatchToProps)(Home);