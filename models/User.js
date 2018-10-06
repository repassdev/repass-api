const mongoose = require('mongoose');
const Schema = mongoose.Schema;
 
const userSchema = new Schema({
  email: {
    type: String,
    minlength: 5,
    maxlength: 40,
    unique: true
  },
  password: {
    type: String,
    unique: true
  },
  admin: {
    type: Boolean,
    default: false
  }
});

module.exports = mongoose.model('User', userSchema);