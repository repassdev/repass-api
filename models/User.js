const mongoose = require('mongoose');
const Schema = mongoose.Schema;
 
const userSchema = new Schema({
  name: {
    type: String,
    minlength: 3,
    maxlength: 30
  },
  email: {
    type: String,
    minlength: 3,
    maxlength: 254,
    unique: true
  },
  password: {
    type: String
  },
  isAdmin: {
    type: Boolean,
    default: false
  }
});

module.exports = mongoose.model('User', userSchema);