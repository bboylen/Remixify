const express = require("express");
require("dotenv").config();
const cookieSession = require("cookie-session");
const cookieParser = require('cookie-parser');
const passport = require("passport");
const connectDB = require("./config/db");
const authRoutes = require("./routes/auth-routes");
const spotifyRoutes = require("./routes/spotify-api-routes");
const cors = require('cors');
require("./utilities/passport.js");
const path = require('path');

const PORT = process.env.PORT || 3001;

connectDB();

const app = express();

app.use(express.urlencoded({extended: true})); 
app.use(express.json());
app.use(cookieParser());
app.use(
  cookieSession({
    name: "spotify-auth-session",
    keys: ["key1", "key2"],
    maxAge: 36000000
  })
);
app.use(passport.initialize());
app.use(passport.session());

// set up cors to allow us to accept requests from client
  app.use(
    cors({
      origin: "http://localhost:3000", 
      methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
      credentials: true 
    })
  );

app.use("/auth/", authRoutes);
app.use("/spotify/", spotifyRoutes);
app.use( (err, req, res, next) => {
  console.log(`Error: ${err}`);
  res.status(500).send();
})

app.use(express.static(path.resolve(__dirname, '../client/build')));
app.get('*', function (request, response) {
  response.sendFile(path.resolve(__dirname, '../client/build', 'index.html'));
})

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
