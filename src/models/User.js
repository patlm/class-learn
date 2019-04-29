const mongoose = require('mongoose');

//User Schema
const User = mongoose.model('User', new mongoose.Schema({
  id: mongoose.Schema.ObjectId,
  username: {type: String, unique: true},
  firstname: String,
  lastname: String,
  email: {type: String, unique: true},
  password: String,
  usertype: String
}));

module.exports = User;
