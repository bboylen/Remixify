const SpotifyWebApi = require("spotify-web-api-node");
const CLIENT_HOME_PAGE_URL = "http://localhost:3000";
const User = require("../models/user-model");

const setUpSpotifyApi = async function (req) {
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

module.exports = setUpSpotifyApi;
