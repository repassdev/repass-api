const mongoose = require('mongoose');
const Schema = mongoose.Schema;
 
const messageSchema = new Schema({
  from: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  to: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  date: {
    type: Date,
    required: true
  },
  title: {
    type: String,
    minlength: 3,
    maxlength: 64,
    required: true
  },
  text: {
    type: String,
    minlength: 3,
    maxlength: 254,
    required: true
  }
});

module.exports = mongoose.model('Message', messageSchema);