const SpotifyWebApi = require("spotify-web-api-node");
const setUpSpotifyApi = require("../utilities/setUpSpotifyApi");
const {
  createPlaylist,
  getOldTracks,
  createRemixedSongs,
  createRemixedPlaylist,
  populateRemixPlaylist,
} = require("../utilities/remixPlaylist");
const router = require("express").Router();
const asyncHandler = require("express-async-handler");
const User = require("../models/user-model");
const { Playlist, Song } = require("../models/playlist-model");
const CLIENT_HOME_PAGE_URL = "http://localhost:3000";

router.get(
  "/playlists",
  asyncHandler(async (req, res) => {
    const spotifyApi = await setUpSpotifyApi(req.user.username);
    const allPlaylists = await spotifyApi
      .getUserPlaylists(req.user.username, {
        limit: 50,
      })
      .then(
        (data) => {
          return data.body.items;
        },
        (err) => {
          console.log("Error grabbing playlists", err);
        }
      )
      .catch((error) => {
        console.log(error);
      });

    const remixedPlaylists = await Playlist.find({
      userId: req.user.spotifyId,
    });

    const remixedPlaylistKeys = {};

    remixedPlaylists.forEach((playlist) => {
      remixedPlaylistKeys[playlist.spotifyId] = true;
    });

    const spotifyPlaylists = allPlaylists.filter((playlist) => {
      return !remixedPlaylistKeys[playlist.id];
    });

    res.status(200).json({
      success: true,
      spotifyPlaylists: spotifyPlaylists,
      remixedPlaylists: remixedPlaylists.reverse(),
    });
  })
);

router.get(
  "/remixedPlaylists",
  asyncHandler(async (req, res) => {
    const usersRemixedPlaylists = await Playlist.find({
      userId: req.user.spotifyId,
    });

    res.status(200).json({
      success: true,
      playlists: usersRemixedPlaylists.reverse(),
      message: "Remixed playlist retrieval successful",
    });
  })
);

router.post("/playlist", (req, res) => {
  setUpSpotifyApi(req.user.username)
    .then((spotifyApi) => {
      spotifyApi.getPlaylist(req.body.playlistId).then(
        (data) => {
          res.status(200).json({
            success: true,
            playlist: data.body,
          });
        },
        (err) => {
          console.log("Error grabbing playlist", err);
        }
      );
    })
    .catch((error) => {
      console.log(error);
    });
});

router.post(
  "/deletePlaylist",
  asyncHandler(async (req, res) => {
    let playlistId = req.body.playlistId;

    setUpSpotifyApi(req.user.username)
      .then((spotifyApi) => {
        spotifyApi.unfollowPlaylist(playlistId).then(
          () => {},
          (err) => {
            console.log("Error unfollowing playlist", err);
          }
        );
      })
      .catch((error) => {
        console.log(error);
      });

    Playlist.deleteOne({ spotifyId: playlistId }).catch((err) => {
      console.log("Remixed playlist not deleted from MongoDB", err);
    });

    res.status(200).json({
      success: true,
    });
  })
);

router.post(
  "/remix",
  asyncHandler(async (req, res) => {
    // Creates new playlist on spotify
    const newPlaylistName = `${req.body.playlistName} Remix`;
    const description = `A remix of ${req.body.playlistName}. Same artists - different songs!`;
    const newPlaylistId = await createPlaylist(
      newPlaylistName,
      description,
      req.user.username
    );

    // Fetch information on existing playlist songs
    const oldTracks = await getOldTracks(
      req.body.playlistId,
      req.user.username
    );

    // Create remixed Songs
    const remixedSongs = await createRemixedSongs(oldTracks, req.user.username);

    // Create/populate playlist model
    const remixedPlaylist = await createRemixedPlaylist(
      newPlaylistId,
      newPlaylistName,
      remixedSongs,
      req.user.spotifyId
    );

    // Populate playlist
    const playlistPopulationSuccess = await populateRemixPlaylist(
      newPlaylistId,
      remixedSongs,
      req.user.username
    );

    // Returns remixed playlists

    const usersRemixedPlaylists = await Playlist.find({
      userId: req.user.spotifyId,
    });

    res.status(200).json({
      success: true,
      playlists: usersRemixedPlaylists.reverse(),
      playlistId: remixedPlaylist.spotifyId,
      message: "Playlist remix successful",
    });
  })
);

module.exports = router;
