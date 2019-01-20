const mongoose = require('mongoose');
const Schema = mongoose.Schema;
 
const eventSchema = new Schema({
  name: {
    type: String,
    minlength: 3,
    maxlength: 254
  },
  place: {
    type: String,
    minlength: 3,
    maxlength: 254
  },
  image: {
    type: String,
    minlength: 3,
    maxlength: 254
  }
});

module.exports = mongoose.model('Event', eventSchema);