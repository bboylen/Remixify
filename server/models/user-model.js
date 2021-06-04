const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Which should be optional?
const user = new Schema({
  username: String,
  accessToken: String,
  refreshToken: String,
  displayName: String,
  spotifyId: String,
  profileImageUrl: String,
});

const User = mongoose.model('user', user);

module.exports = User;