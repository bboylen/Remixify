const SpotifyWebApi = require("spotify-web-api-node");
const setUpSpotifyApi = require("./spotifyWebApi");

const createPlaylist = async (playlistName, userName) => {
  const newPlaylistName = `${playlistName} Remix`;
  const description = `A remix of ${playlistName}. Same artists - different songs!`;

  const spotifyApi = await setUpSpotifyApi(userName);
  const playlistId = await spotifyApi
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

    return playlistId;
};

const getOldTracks = async (playlistId, userName) => {
  const spotifyApi = await setUpSpotifyApi(userName);
  const trackList = await spotifyApi.getPlaylist(playlistId).then(
    (data) => {
      console.log("in spotify api call", data.body.tracks.items);
      return data.body.tracks.items;
    },
    (err) => {
      console.log("Error grabbing playlist", err);
    }
  );

  return trackList;
};

module.exports = { createPlaylist, getOldTracks };
