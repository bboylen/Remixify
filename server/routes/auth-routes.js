const router = require("express").Router();
const passport = require("passport");
const CLIENT_HOME_PAGE_URL =
  process.env.NODE_ENV === "production"
    ? "https://remixify.herokuapp.com"
    : "http://localhost:3000";

router.get("/login/success", (req, res) => {
  if (req.user) {
    res.status(200).json({
      success: true,
      message: "user has successfully authenticated",
      user: req.user,
    });
  } else {
    res.status(401).json({
      success: false,
      message: "user not found",
    });
  }
});

router.get("/login/failed", (req, res) => {
  res.status(401).json({
    success: false,
    message: "user failed to authenticate",
  });
});

router.get("/logout", (req, res) => {
  req.session = null;
  req.logout();
  res.redirect(CLIENT_HOME_PAGE_URL);
});

router.get(
  "/spotify",
  passport.authenticate("spotify", {
    scope: [
      "ugc-image-upload",
      "playlist-modify-public",
      "playlist-modify-private",
      "user-follow-read",
      "user-library-modify",
      "playlist-read-private",
      "playlist-read-collaborative",
      "streaming",
    ],
  })
);

router.get(
  "/spotify/callback",
  passport.authenticate("spotify", {
    successRedirect: CLIENT_HOME_PAGE_URL,
    failureRedirect: "/auth/login/failed",
  }),
  function (req, res) {
    res.redirect("/");
  }
);

module.exports = router;
