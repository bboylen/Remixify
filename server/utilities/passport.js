const passport = require("passport");
const SpotifyStrategy = require("passport-spotify").Strategy;
const User = require("../models/user-model");
const SERVER_URL =
  process.env.NODE_ENV === "production"
    ? "https://remixify.herokuapp.com"
    : "http://localhost:3001";

passport.serializeUser(function (user, done) {
  done(null, user.id);
});

passport.deserializeUser(function (id, done) {
  User.findById(id)
    .then((user) => {
      done(null, user);
    })
    .catch((e) => {
      done(new Error("Failed to deserialize a user"));
    });
});

passport.use(
  new SpotifyStrategy(
    {
      clientID: process.env.SPOTIFY_ID,
      clientSecret: process.env.SPOTIFY_SECRET,
      callbackURL: `${SERVER_URL}/auth/spotify/callback`,
    },
    async (accessToken, refreshToken, profile, done) => {
      const currentUser = await User.findOne({
        spotifyId: profile.id,
      });

      if (!currentUser) {
        try {
          const newUser = await new User({
            username: profile.username,
            accessToken: accessToken,
            refreshToken: refreshToken,
            displayName: profile.displayName,
            spotifyId: profile.id,
            profileImageUrl: profile.photos[0].value,
          }).save();
          if (newUser) {
            done(null, newUser);
          }
        } catch (err) {
          console.log(err);
        }
      }

      if (currentUser.accessToken != accessToken) {
        currentUser.accessToken = accessToken;
        await currentUser.save();
      }
      return done(null, currentUser);
    }
  )
);
