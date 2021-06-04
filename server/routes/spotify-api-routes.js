const SpotifyWebApi = require("spotify-web-api-node");
const setUpSpotifyApi = require("../utilities/spotifyWebApi");
const router = require("express").Router();
const User = require("../models/user-model");
const {Playlist, Song} = require("../models/playlist-model");
const CLIENT_HOME_PAGE_URL = "http://localhost:3000";

router.get("/playlists", (req, res) => {
  setUpSpotifyApi(req).then((spotifyApi) => {
    spotifyApi.getUserPlaylists(req.user.username).then(
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
  });
});

router.post("/playlist", (req, res) => {
  setUpSpotifyApi(req).then((spotifyApi) => {
    spotifyApi.getPlaylist(req.body.id).then(
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
  });
});

router.post("/remix", (req, res) => {
  // Creates new playlist on spotify
  // Creates playlist model
  // Populate playlist
  // Populate playlist model
  // Returns model info (or spotifys?)
})
module.exports = router;
