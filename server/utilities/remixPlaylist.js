const SpotifyWebApi = require("spotify-web-api-node");
const setUpSpotifyApi = require("/spotifyWebApi");

const createPlaylist = (playlistName, userName) => {
  const playlistName = `${playlistName} Remix`;
  const description = `A remix of ${playlistName}. Same artists - different songs!`;

  setUpSpotifyApi(userName)
    .then((spotifyApi) => {
      spotifyApi.createPlaylist(playlistName, {'description': description, 'public': true}).then(
        (data) => {
          console.log('Created Playlist!');
        },
        (err) => {
          console.log("Error creating playlist", err);
        }
      );
    })
    .catch((error) => {
      console.log(error);
    });
};

module.exports = {createPlaylist}