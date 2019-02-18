const mongoose = require('mongoose');
const Schema = mongoose.Schema;
 
const interestSchema = new Schema({
  seller: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  buyer: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  ticket: {
    type: Schema.Types.ObjectId,
    ref: 'Ticket',
    required: true
  },
  date: {
    type: Date,
    required: true
  }
});

module.exports = mongoose.model('Interest', interestSchema);