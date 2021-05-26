const SpotifyWebApi = require("spotify-web-api-node");
const setUpSpotifyApi = require("../middleware/spotifyWebApi");
const router = require("express").Router();
const User = require("../models/user-model");
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

module.exports = router;
