const mongoose = require('mongoose');
const Schema = mongoose.Schema;
 
const eventSchema = new Schema({
  name: {
    type: String,
    minlength: 3,
    maxlength: 254,
    required: true
  },
  place: {
    type: String,
    minlength: 3,
    maxlength: 254,
    required: true
  },
  image: {
    type: String,
    minlength: 3,
    maxlength: 254,
    required: true
  }
});

module.exports = mongoose.model('Event', eventSchema);