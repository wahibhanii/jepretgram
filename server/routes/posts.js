const express = require ('express');
const router  = express.Router();
const PostsController = require('../controllers/postsController')
const authentication  = require('../middleware/authentication')
const multer          = require('../middleware/multer')
const gcs             = require('../middleware/gcs')

// Create Post
router.post('/',authentication, multer.single('file'), gcs, PostsController.createPost);

// Get All Posts
router.get('/', authentication, PostsController.getAllPosts);

// Get Timeline
router.get('/timeline', authentication, PostsController.getTimeline);

// Get User's Post
router.get('/user/:id', authentication, PostsController.getUserPosts);

//Delete Post
router.delete('/:id', authentication, PostsController.deletePost)

// Edit Post
router.put('/:id', authentication, PostsController.editPost);

// Edit Caption
router.put('/:id/editcaption', authentication, PostsController.editCaption);

// Edit Post
router.put('/:id/likeunlike', authentication, PostsController.likeUnlike);

// Add comment
router.put('/:id/comment', authentication, PostsController.addComment);

// Remove comment
router.put('/:id/uncomment', authentication, PostsController.removeComment);


module.exports = router;
