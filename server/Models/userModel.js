const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  surname: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  avatar: {
    type: String,
  },
  color: {
    type: String,
  },
  role: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user',
  },
  boards: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'board',
  }],
  workSpaces: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'workspace',
  }],
});

module.exports = mongoose.model('user', userSchema);