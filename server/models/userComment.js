'use strict'
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userCommentSchema = new Schema({
  owner       : {type: Schema.Types.ObjectId, ref: 'User'},
  comment     : String,
  createdAt   : Date
});

const UserComment = mongoose.model('UserComment', userCommentSchema);

module.exports = UserComment;