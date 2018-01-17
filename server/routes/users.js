const express         = require ('express');
const router          = express.Router();
const UsersController = require('../controllers/usersController');
const authentication  = require('../middleware/authentication');

//Create user
router.post('/', UsersController.createUser);

// Login
router.post('/login', UsersController.login);

// Find all user
router.get('/', UsersController.findAllUsers);

// Find user by ID
router.get('/:id', UsersController.findUserById);

// Update user
router.put('/:id', UsersController.updateUser);

// Delete user
router.delete('/:id', UsersController.deleteUser);

// Follow - Unfollow
router.put('/followunfollow/:id', authentication, UsersController.followUnfollow);





module.exports = router;
