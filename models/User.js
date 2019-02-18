const mongoose = require('mongoose');
const Schema = mongoose.Schema;
 
const userSchema = new Schema({
  name: {
    type: String,
    minlength: 3,
    maxlength: 254
  },
  cpf: {
    type: String,
    minlength: 11,
    maxlength: 11
  },
  addressStreet: {
    type: String,
    minlength: 3,
    maxlength: 254,
  },
  addressNumber: {
    type: Number,
    min: 0,
    max: 99999,
  },
  addressCity: {
    type: String,
    minlength: 3,
    maxlength: 254,
  },
  addressState: {
    type: String,
    minlength: 2,
    maxlength: 254,
  },
  addressCountry: {
    type: String,
    minlength: 3,
    maxlength: 254,
  },
  phone: {
    type: String,
    minlength: 3,
    maxlength: 30
  },
  email: {
    type: String,
    minlength: 3,
    maxlength: 254,
    required: true, 
    unique: true, 
    match: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
  },
  password: {
    type: String,
    minlength: 3,
    maxlength: 254,
    required: true
  },
  isAdmin: {
    type: Boolean,
    default: false
  }
});

module.exports = mongoose.model('User', userSchema);