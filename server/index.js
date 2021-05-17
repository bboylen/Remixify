const express = require("express");
require('dotenv').config();
const cookieSession = require("cookie-session");
const passport = require("passport");
const isLoggedIn = require("./middleware/auth.ts");
const connectDB = require('./config/db')
require("./utilities/passport.ts");

const PORT = process.env.PORT || 3001;

connectDB();

const app = express();

app.use(
  cookieSession({
    name: "spotify-auth-session",
    keys: ["key1", "key2"],
  })
);
app.use(passport.initialize());
app.use(passport.session());

app.get("/", isLoggedIn, (req, res) => {
  res.send(`Hello world ${req.user.displayName}`);
});

app.get("/logout", (req, res) => {
  req.session = null;
  req.logout();
  res.redirect("/");
});

app.get("/auth/error", (req, res) => res.send("Unknown Error"));

app.get("/auth/spotify", passport.authenticate("spotify",{
  scope: ['ugc-image-upload', 'playlist-modify-public', 'playlist-modify-private', 'user-follow-read', 'user-library-modify', 'playlist-read-private', 'playlist-read-collaborative', 'streaming' ],
}));

app.get(
  "/auth/spotify/callback",
  passport.authenticate("spotify", { failureRedirect: "/auth/error" }),
  function (req, res) {
    res.redirect("/");
  }
);

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
