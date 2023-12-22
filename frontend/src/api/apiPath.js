const apiVersion = "v1/";

export const apiPaths = {
  user: apiVersion + "me",
  topTracks: apiVersion + apiVersion + "me/top/tracks",
  topArtists: apiVersion + "me/top/artists",
  recentPlay: apiVersion + "me/player/recently-played?limit=49",
  myPlaylists: apiVersion + "me/playlists",
  getTrack: apiVersion + "tracks/",
  getTrackFeature: apiVersion + "audio-features/",
  getArtist: apiVersion + "artists/",
};
