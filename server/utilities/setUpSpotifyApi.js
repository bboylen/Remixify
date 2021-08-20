const SpotifyWebApi = require("spotify-web-api-node");
const CLIENT_HOME_PAGE_URL =
  process.env.NODE_ENV === "production"
    ? "https://remixify.herokuapp.com"
    : "http://localhost:3000";
const User = require("../models/user-model");

const setUpSpotifyApi = async function (username) {
  try {
  const spotifyApi = new SpotifyWebApi({
    clientID: process.env.SPOTIFY_ID,
    clientSecret: process.env.SPOTIFY_SECRET,
    callbackURL: CLIENT_HOME_PAGE_URL,
  });

  const currentUser = await User.findOne({
    username: username,
  });

  spotifyApi.setAccessToken(currentUser.accessToken);
  spotifyApi.setRefreshToken(currentUser.refreshToken);

  return spotifyApi;
} catch (err) {
  return err;
}
};

module.exports = setUpSpotifyApi;
