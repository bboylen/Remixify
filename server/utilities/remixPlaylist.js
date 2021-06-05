const SpotifyWebApi = require("spotify-web-api-node");
const setUpSpotifyApi = require("./spotifyWebApi");

const createPlaylist = (playlistName, userName) => {
  const newPlaylistName = `${playlistName} Remix`;
  const description = `A remix of ${playlistName}. Same artists - different songs!`;

  return setUpSpotifyApi(userName)
    .then((spotifyApi) => {
      spotifyApi
        .createPlaylist(newPlaylistName, {
          description: description,
          public: true,
        })
        .then(
          (data) => {
            return data.body.id;
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

const getOldTracks = (playlistId, userName) => {
  return setUpSpotifyApi(userName)
    .then((spotifyApi) => {
      spotifyApi.getPlaylist(playlistId).then(
        (data) => {
          return data.body.tracks.items;
        },
        (err) => {
          console.log("Error grabbing playlist", err);
        }
      );
    })
    .catch((error) => {
      console.log(error);
    });
};

module.exports = { createPlaylist, getOldTracks };
