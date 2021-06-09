const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const song = new Schema({
  spotifyId: String,
  name: String,
  artist: String,
  album: String,
});

const playlist = new Schema({
  userId: String,
  spotifyId: String,
  name: String,
  songs: [song],
});

const Song = mongoose.model("song", song);
const Playlist = mongoose.model("playlist", playlist);

module.exports = {Song, Playlist};