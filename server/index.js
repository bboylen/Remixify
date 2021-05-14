const express = require("express");
const cookieSession = require("cookie-session");
const passport = require("passport");
require("./utilities/passport.ts");
const isLoggedIn = require("./middleware/auth.ts");

const PORT = process.env.PORT || 3001;

const app = express();

app.get("/api", (req, res) => {
  res.json({ message: "Hello from server!" });
});

app.use(
  cookieSession({
    name: "spotify-auth-session",
    keys: ["key1", "key2"],
  })
);
app.use(passport.initialize());
app.use(passport.session());


// WHY ISNT ISLOGGEDIN WORKING
app.get("/", (req, isLoggedIn, res) => {
  res.send(`Hello world ${req.user.displayName}`);
});

app.get("/logout", (req, res) => {
  req.session = null;
  req.logout();
  res.redirect("/");
});

app.get("/auth/error", (req, res) => res.send("Unknown Error"));
app.get("/auth/spotify", passport.authenticate("spotify"));
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
