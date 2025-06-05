const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true
  },
  password: {
    type: String,
    required: true,
    minlength: 6
  },
  username: {
    type: String,
    required: true,
    trim: true
  },
  avatar: {
    type: String,
    enum: ['mickey', 'boy', 'girl'], // assuming only 3 avatar options
    default: 'mickey'
  },
  age: {
    type: Number,
    min: 5,
    max: 120
  },
  goal: {
    type: String,
    default: ''
  },
  xp: {
    type: Number,
    default: 0,
    min: 0
  },
  level: {
    type: Number,
    default: 1,
    min: 1
  },
  streak: {
    type: Number,
    default: 0,
    min: 0
  }
});

module.exports = mongoose.model('User', userSchema);
