const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Which should be optional?
const userSchema = new Schema({
  username: String,
  displayName: String,
  spotifyId: String,
  profileImageUrl: String,
});

const User = mongoose.model('user', userSchema);

module.exports = User;