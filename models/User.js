const mongoose = require('mongoose');
const Schema = mongoose.Schema;
 
const userSchema = new Schema({
  email: {
    type: String,
    unique: true 
  },
  password: String,
  admin: Boolean
});

module.exports = mongoose.model('User', userSchema);