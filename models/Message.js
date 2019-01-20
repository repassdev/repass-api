const mongoose = require('mongoose');
const Schema = mongoose.Schema;
 
const messageSchema = new Schema({
  from: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  to: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  date: {
    type: Date
  },
  title: {
    type: String,
    minlength: 3,
    maxlength: 64
  },
  text: {
    type: String,
    minlength: 3,
    maxlength: 254
  }
});

module.exports = mongoose.model('Message', messageSchema);