const SpotifyWebApi = require("spotify-web-api-node");
const loginSpotifyApi = require("../middleware/spotifyWebApi");
const router = require("express").Router();
const User = require("../models/user-model");
const CLIENT_HOME_PAGE_URL = "http://localhost:3000";

const setupSpotifyApi = async function (req) {
  const spotifyApi = new SpotifyWebApi({
    clientID: process.env.SPOTIFY_ID,
    clientSecret: process.env.SPOTIFY_SECRET,
    callbackURL: CLIENT_HOME_PAGE_URL,
  });

  const currentUser = await User.findOne({
    username: req.user.username,
  });

  spotifyApi.setAccessToken(currentUser.accessToken);
  spotifyApi.setRefreshToken(currentUser.refreshToken);
  return spotifyApi;
};

router.get("/playlists", (req, res) => {
  setupSpotifyApi(req).then((spotifyApi) => {
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
