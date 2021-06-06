const SpotifyWebApi = require("spotify-web-api-node");
const setUpSpotifyApi = require("../utilities/spotifyWebApi");
const { createPlaylist, getOldTracks, getRemixedSongs, createRemixedPlaylist } = require("../utilities/remixPlaylist");
const router = require("express").Router();
const User = require("../models/user-model");
const { Playlist, Song } = require("../models/playlist-model");
const CLIENT_HOME_PAGE_URL = "http://localhost:3000";

router.get("/playlists", (req, res) => {
  setUpSpotifyApi(req.user.username)
    .then((spotifyApi) => {
      spotifyApi.getUserPlaylists(req.user.username, {
        limit: 50
      }).then(
        (data) => {
          res.status(200).json({
            success: true,
            playlists: data.body,
          });
        },
        (err) => {
          console.log("Error grabbing playlists", err);
        }
      );
    })
    .catch((error) => {
      console.log(error);
    });
});

router.post("/playlist", (req, res) => {
  setUpSpotifyApi(req.user.username)
    .then((spotifyApi) => {
      spotifyApi.getPlaylist(req.body.playlistId).then(
        (data) => {
          res.status(200).json({
            success: true,
            playlist: data.body,
          });
        },
        (err) => {
          console.log("Error grabbing playlist", err);
        }
      );
    })
    .catch((error) => {
      console.log(error);
    });
});

router.post("/remix", async (req, res) => {
  // Creates new playlist on spotify
  const newPlaylistId = await createPlaylist(req.body.playlistName,req.user.username);
  console.log(newPlaylistId);

  // Fetch song information
  const oldTracks = await getOldTracks(req.body.playlistId, req.user.username)
  //console.log(oldTracks);

  // Get remixed Songs
  const remixedSongs = await getRemixedSongs(oldTracks, req.user.username);

  // Create/populate playlist model
  const remixedPlaylist = await createRemixedPlaylist(newPlaylistId, remixedSongs);
  console.log(remixedPlaylist);

  // Populate playlist


  // Returns model info (or spotifys?)
});
module.exports = router;
