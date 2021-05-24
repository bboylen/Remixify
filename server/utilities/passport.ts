const passport = require("passport");
const SpotifyStrategy = require("passport-spotify").Strategy;
const User = require("../models/user-model");

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

// Update access token if different on User?
passport.use(
  new SpotifyStrategy(
    {
      clientID: process.env.SPOTIFY_ID,
      clientSecret: process.env.SPOTIFY_SECRET,
      callbackURL: "/auth/spotify/callback",
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

      return done(null, currentUser);
    }
  )
);
