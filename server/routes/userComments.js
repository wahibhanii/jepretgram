const express = require ('express');
const router  = express.Router();
const UserCommentsController = require('../controllers/userCommentsController')
const authentication  = require('../middleware/authentication')

// edit comment
router.put('/:id/editcomment', authentication, UserCommentsController.editComment)


module.exports = router;