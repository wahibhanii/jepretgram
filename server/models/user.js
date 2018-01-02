'use strict'
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  email       : String,
  password    : String,
  userName    : String,
  profPicUrl  : String,
  following   : [{type: Schema.Types.ObjectId, ref: 'User'}],
  followers   : [{type: Schema.Types.ObjectId, ref: 'User'}]
});

const User = mongoose.model('User', userSchema);

module.exports = User;