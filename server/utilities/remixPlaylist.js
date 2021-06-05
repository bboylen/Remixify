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

const getOldTracks = async (playlistId, userName) => {
  let trackList = null;
  const spotifyApi = await setUpSpotifyApi(userName);
  await spotifyApi.getPlaylist(playlistId).then(
    (data) => {
      console.log('in spotify api call',data.body.tracks.items)
      trackList = data.body.tracks.items;
     // return data.body.tracks.items;
    },
    (err) => {
      console.log("Error grabbing playlist", err);
    }
  );
  console.log('after await',trackList);
  return trackList
};

module.exports = { createPlaylist, getOldTracks };
