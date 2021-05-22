const express = require("express");
require("dotenv").config();
const cookieSession = require("cookie-session");
const passport = require("passport");
const isLoggedIn = require("./middleware/auth.ts");
const connectDB = require("./config/db");
const authRoutes = require("./routes/auth-routes");
const cors = require('cors');
require("./utilities/passport.ts");

const PORT = process.env.PORT || 3001;

connectDB();

const app = express();

// need different cookie keys?
app.use(
  cookieSession({
    name: "spotify-auth-session",
    keys: ["key1", "key2"],
  })
);
app.use(passport.initialize());
app.use(passport.session());

// set up cors to allow us to accept requests from our client
app.use(
  cors()
);

// app.get("/", isLoggedIn, (req, res) => {
//   res.status(200).json({
//     authenticated: true,
//     message: "user successfully authenticated",
//     user: req.user,
//     cookies: req.cookies,
//   });
// });

app.use("/auth/", authRoutes);

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
