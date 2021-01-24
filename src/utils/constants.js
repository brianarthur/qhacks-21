export const spotifyAuthenticateUrl = "https://accounts.spotify.com/authorize";

export const spotifySearchUrl = "https://api.spotify.com/v1/search";
export const spotifyPersonalTracksUrl = "https://api.spotify.com/v1/me/top/tracks";
export const spotifyGenreRecommendationsUrl = "https://api.spotify.com/v1/recommendations";
export const spotifyPersonalPlaylistsUrl = "https://api.spotify.com/v1/me/playlists";

export const spotifyPlaylistUrl = (id) => `https://api.spotify.com/v1/playlists/${id}/tracks`;
export const spotifyPopularPlaylistUrl = spotifyPlaylistUrl("1L8BFtWeeHNhNRnL6z6hJl");

export const generateUrl = "/api/generate";
export const playPlaylistUrl = (playlistId) => `/api/play/${playlistId}`;
