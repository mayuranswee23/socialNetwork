const router = require('express').Router();

const {
    createUser, 
    findAllUser,
    findOneUser,
    updateUser,
    deleteUser,
    addFriends,
    deleteFriends
} = require('../../controllers/user-controller');

// get api/user
router.route('/')
    .get(findAllUser)
    .post(createUser)

// get users by ID
router.route('/:id')
    .get(findOneUser)
    .put(updateUser)
    .delete(deleteUser)

//friends routes
router.route('/:id/friends/:friendId')
    .post(addFriends)
    .delete(deleteFriends)

module.exports = router;
