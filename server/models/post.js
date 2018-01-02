'use strict'
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const postSchema = new Schema({
  caption     : String,
  urlToImage  : String,
  owner       : String,
  likers      : [{type: Schema.Types.ObjectId, ref: 'User'}],
  comments    : [{type: Schema.Types.ObjectId, ref: 'Comment'}],
  createdAt   : Date
});

const Post = mongoose.model('Post', postSchema);

module.exports = Post;