const SpotifyWebApi = require('spotify-web-api-node');
const CLIENT_HOME_PAGE_URL = "http://localhost:3000"
const User = require("../models/user-model");

const setupSpotifyApi = async function (req, res, next) {
  const spotifyApi = new SpotifyWebApi({
    clientID: process.env.SPOTIFY_ID,
    clientSecret: process.env.SPOTIFY_SECRET,
    callbackURL: CLIENT_HOME_PAGE_URL,
  })
  console.log(req.user.username);
  const currentUser = await User.findOne({
    username: req.user.username
  });
  console.log(currentUser);

  spotifyApi.setAccessToken(currentUser.accessToken);
  spotifyApi.setRefreshToken(currentUser.refreshToken);
  // does this persist (spotifyApi object)
  console.log(spotifyApi);
  next();
}

module.exports = setupSpotifyApi