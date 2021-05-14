const passport = require('passport');
const SpotifyStrategy = require('passport-spotify').Strategy;

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(user, done) {
  done(null, user);
});

passport.use(
  new SpotifyStrategy(
    {
      clientID: '653f24e2cb7c47769396dbd1203b8ee1',
      clientSecret: '676f95162d144ea8ba03ea9c85c0d988',
      callbackURL: 'http://localhost:3001/auth/spotify/callback'
    },
    function(acessToken, refreshToken, profile, done) {
      return done(null, profile);
    }
  )
);


