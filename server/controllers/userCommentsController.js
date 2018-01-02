const UserComment = require('../models/userComment')

class UserCommentsController {

  static editComment(req, res) {
    let newComment = req.body.comment
    UserComment.findOneAndUpdate({_id: req.params.id}, {comment: newComment}, {new: true})
    .then(result => {
      console.log(result);
      res.status(200).json({
        message: 'Edit comment success!',
        data: result
      })
    })
  }

}

module.exports = UserCommentsController