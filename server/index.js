const express = require("express");
require("dotenv").config();
const cookieSession = require("cookie-session");
const cookieParser = require('cookie-parser');
const passport = require("passport");
const isLoggedIn = require("./middleware/auth.ts");
const connectDB = require("./config/db");
const authRoutes = require("./routes/auth-routes");
const spotifyRoutes = require("./routes/spotify-api-routes");
const cors = require('cors');
require("./utilities/passport.ts");

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

// set up cors to allow us to accept requests from our client
  app.use(
    cors({
      origin: "http://localhost:3000", 
      methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
      credentials: true 
    })
  );

  // Need to look into accesstoken expiring!!
app.use("/auth/", authRoutes);
app.use("/spotify/", spotifyRoutes);

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
