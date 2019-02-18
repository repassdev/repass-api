const mongoose = require('mongoose');
const Schema = mongoose.Schema;
 
const ticketSchema = new Schema({
  owner: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  name: {
    type: String,
    minlength: 3,
    maxlength: 254,
    required: true
  },
  date: {
    type: Date,
    required: true
  },
  price: {
    type: Number,
    min: 0,
    max: 99999,
    required: true
  },
  description: {
    type: String,
    minlength: 3,
    maxlength: 254,
    required: true
  },
  event: {
    type: Schema.Types.ObjectId,
    ref: 'Event',
    required: true
  }
});

module.exports = mongoose.model('Ticket', ticketSchema);