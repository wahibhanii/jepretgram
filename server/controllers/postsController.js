'use strict'
const Post    = require('../models/post');
const UserComment = require('../models/userComment');
const User    = require('../models/user');
const mongoose = require('mongoose');

class PostsController {
  
  static createPost(req, res) {
    let newPost = {
      caption     : req.body.caption,
      urlToImage  : req.file.imagePostUrl,
      owner       : req.headers.decoded._id ,
      likers      : [],
      comments    : [],
      createdAt   : new Date()
    }
    Post.create(newPost)
    .then(result => {
      console.log(result);
      res.status(200).json({
        message : 'Create post successful!',
        data    : result
      })
    })
    .catch(err => {
      console.log(err);
      res.status(500).send(err);
    })
  }

  static getTimeline(req, res) {
    console.log('get timeline')
    User.findOne({_id: req.headers.decoded._id})
    .then(userData => {
      console.log(userData.following, 'this is following ----------------')
      let followingUser = userData.following;
      followingUser.push(userData._id);
      console.log(followingUser)
      let users= followingUser.map(userId => {return mongoose.Types.ObjectId(userId)})
      console.log(users)
      return Post.find({
        owner : { $in: 
          users
        }
      })
      .populate(
        {
          path: 'comments',
          model: 'UserComment',
          populate: {
            path: 'owner',
            model: 'User'
          }
        }
      )
      .populate('owner')
      .populate('likers')
      .sort({createdAt: 'desc'})
      .exec()
    })
    .then(result => {
      console.log(result)
      res.send(result)
    })
    .catch(err => {
      console.log(err);
      res.status(500).send(err)
    })
  }

  static getUserPosts(req, res){
    Post.find({owner: req.params.id}).sort({createdAt: 'desc'}).exec()
    .then(result => {
      res.send(result)
    })
    .catch(err => {
      console.log(err);
      res.status(500).send(err)
    })
  }

  static editPost(req, res) {
    let data = JSON.parse(req.body.update)
    console.log(data)
    Post.findOneAndUpdate({_id:req.params.id}, data, {new: true})
    .then(result => {
      res.status(200).json({
        message: 'Post edited!',
        data: result
      })
    })
    .catch(err => {
      console.log(err);
      res.status(500).send(err);
    })
  }

  static deletePost (req, res) {
    console.log(req.params.id, 'deleting----------------------')
    Post.deleteOne({_id: req.params.id})
    .then(result => {
      res.status(200).json({
        message : 'Delete post successful!',
        data    : result
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).send(err);
    })
  }

  static editCaption(req, res) {
    Post.findOneAndUpdate({_id:req.params.id}, {caption: req.body.caption}, {new: true})
    .then(result => {
      res.status(200).json({
        message: 'Post\'s caption edited!',
        data: result
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).send(err);
    })
  }

  static likeUnlike(req, res) {
    let userId = mongoose.Types.ObjectId(req.headers.decoded._id)
    let postId = req.params.id
    console.log(userId)
    Post.findOne({_id: postId})
    .then(postData => {
      if (postData.owner.toString()==userId.toString()){
        res.status(202).json({
          message: 'User\'s are unable to like their own posts!',
          data : postData
        })
      } else {
        if (postData.likers.indexOf(userId) === -1) {
          //like 
          console.log('liking . . .' )
          postData.likers.push(userId)
          Post.update({_id: postId},postData)
          .then(result=> {
            console.log(result);
            res.status(200).json({
              message : 'Liking post successful!',
              data    : result
            });
          })
          .catch(err => {
            console.log(err);
            res.status(500).send(err)
          })
        } else {
          // unliking
          console.log('unliking . . .')
          postData.likers.splice(postData.likers.indexOf(userId),1)
          console.log(postData.likers)
          Post.update({_id: postId},postData)
          .then(result=> {
            console.log(result);
            res.status(200).json({
              message : 'Unliking post successful!',
              data    : result
            });
          })
          .catch(err => {
            console.log(err);
            res.status(500).send(err)
          })
        }
      } 
    })
    .catch(err => {
      console.log(err);
      res.status(500).send(err);
    })
  }

  static addComment(req, res) {
    let postId = req.params.id;
    let newComment = {
      owner : req.headers.decoded._id,
      comment: req.body.comment,
      createdAt: new Date()
    };
    let newCommentId;
    UserComment.create(newComment)
    .then(result => {
      console.log('new comment created...');
      newCommentId = result._id;
      return Post.findOne({_id: postId})
    })
    .then(dataPost => {
      console.log('adding comment to post...')
      dataPost.comments.push(newCommentId);
      return Post.update({_id: postId}, dataPost, {new: true})
    })
    .then(updatedPost => {
      console.log(updatedPost);
      res.status(200).json({
        message: 'Add comment successful!',
        data: updatedPost
      })
    })
    .catch(err => {
      console.log(err);
      res.status(500).send(err);
    })
  
  }

  static removeComment(req, res) {
    let postId = req.params.id
    let commentId = req.body.commentId
    Post.findOne({_id: postId})
    .then(dataPost => {
      console.log('removing comment from post...')
      dataPost.comments.splice(dataPost.comments.indexOf(commentId),1);
      return Post.update({_id: postId}, dataPost, {new: true})
    })
    .then(updatedPost => {
      console.log('deleting comment...')
      return UserComment.deleteOne({_id: commentId})
    })
    .then(result => {
      res.status(200).json({
        message: 'Remove comment successful!',
        data: result
      })
    })
    .catch(err => {
      console.log(err);
      res.status(500).send(err);
    })
  }

  

}

module.exports = PostsController