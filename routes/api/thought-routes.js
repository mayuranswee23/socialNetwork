const router = require('express').Router();

const {
    getAllThought, 
    getThoughtById,
    createThought, 
    updateThought, 
    deleteThought, 
    addReaction, 
    deleteReaction
} = require('../../controllers/thought-controller');

// get api/thoughts
router.route('/')
    .get(getAllThought)
    .post(createThought)

// get thoughts by ID
router.route('/:id')
    .get(getThoughtById)
    .put(updateThought)
    .delete(deleteThought)

// post reactions to thoughts
router.route('/:thoughtId/reactions')
    .post(addReaction)

//delete reaction to thought
router.route('/:thoughtId/reactions/:reactionId')
    .delete(deleteReaction)

module.exports = router; 