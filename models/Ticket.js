const mongoose = require('mongoose');
const Schema = mongoose.Schema;
 
const ticketSchema = new Schema({
  owner: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  name: {
    type: String,
    minlength: 3,
    maxlength: 254
  },
  date: {
    type: Date
  },
  price: {
    type: Number,
    min: 0,
    max: 99999
  },
  description: {
    type: String,
    minlength: 3,
    maxlength: 254
  },
  event: {
    type: Schema.Types.ObjectId,
    ref: 'Event'
  }
});

module.exports = mongoose.model('Ticket', ticketSchema);