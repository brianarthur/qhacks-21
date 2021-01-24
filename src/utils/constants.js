// Spotify authentication constants
const baseUrl = "https://accounts.spotify.com/authorize";
const clientID = "0413ac0616dc44fb99939db92ba465f3";
let redirect = process.env.REACT_APP_REDIRECT;
if (!redirect) redirect = "http://localhost:3000/auth/";
const scopes = ["playlist-modify-public", "user-read-private", "user-top-read"];
export const spotifyAuthenticateUrl = `${baseUrl}?client_id=${clientID}&response_type=token&redirect_uri=${redirect}&scope=${scopes.join("%20")}`;

// Spotify api urls
export const spotifySearchUrl = "https://api.spotify.com/v1/search";
export const spotifyPersonalTracksUrl = "https://api.spotify.com/v1/me/top/tracks";
export const spotifyGenreRecommendationsUrl = "https://api.spotify.com/v1/recommendations";
export const spotifyPersonalPlaylistsUrl = "https://api.spotify.com/v1/me/playlists";

export const spotifyPlaylistUrl = (id) => `https://api.spotify.com/v1/playlists/${id}/tracks`;
export const spotifyPopularPlaylistUrl = spotifyPlaylistUrl("1L8BFtWeeHNhNRnL6z6hJl");

// App api urls
export const generateUrl = "/api/generate";
export const playPlaylistUrl = (playlistId) => `/api/play/${playlistId}`;
