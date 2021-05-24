const SpotifyWebApi = require('spotify-web-api-node');
const CLIENT_HOME_PAGE_URL = "http://localhost:3000"

const spotifyApi = new SpotifyWebApi({
  clientID: process.env.SPOTIFY_ID,
  clientSecret: process.env.SPOTIFY_SECRET,
  callbackURL: CLIENT_HOME_PAGE_URL,
})

// GET CURRENT USER ACCESS TOKEN?
spotifyApi.setAccessToken();