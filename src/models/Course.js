const mongoose = require('mongoose');

//Course Schema
const Course = mongoose.model('Course', new mongoose.Schema({
  id: mongoose.Schema.ObjectId,
  courseID: Number,
  name: String,
  courseAdmin: String
}));

module.exports = Course;
