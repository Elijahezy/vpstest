const { Schema, model } = require('mongoose');

const Msg = new Schema({
  username: { type: String, ref: 'User' },
  message: { type: String },
});

module.exports = model('Msg', Msg);
