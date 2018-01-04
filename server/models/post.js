'use strict'
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const postSchema = new Schema({
  caption     : String,
  urlToImage  : String,
  owner       : {type: Schema.Types.ObjectId, ref: 'User'},
  likers      : [{type: Schema.Types.ObjectId, ref: 'User'}],
  comments    : [{type: Schema.Types.ObjectId, ref: 'UserComment'}],
  createdAt   : Date
});

const Post = mongoose.model('Post', postSchema);

module.exports = Post;