const {User, Thought} = require('../models');

const thoughtController = {
    //obtain all thoughts
    getAllThought(req, res){
        Thought.find({})
        .then(dbThoughts => res.json(dbThoughts))
        .catch(err => {
            console.log(err);
            res.sendStatus(400);
        });
    },

    //obtain thoughts by using the id
    getThoughtById({params}, res){
        Thought.findOne({ _id: params.id })
        .then(dbThoughts => {
            if (!dbThoughts){
                res.sendStatus(404).json({ message: 'No thought associated with this ID is found'});
                return
            }
            res.json(dbThoughts)
        })
        .catch(err => {
            console.log(err);
            res.status(400).json(err);
        });
    },

    //add thoughts
    createThought({ body }, res){
        Thought.create(body)
        .then(dbThoughts => {
            console.log(dbThoughts)
            return User.findOneAndUpdate(
                {_id: body.userId}, 
                {$push: {thoughts: dbThoughts._id }}, 
                {new: true}
            )
            // .then(User => {return res.json(User)});
        })
        .then(dbThoughts => {
            console.log(dbThoughts)
            if (!dbThoughts){
                res.sendStatus(404).json({ message: 'No thought associated with this ID is found'});
                return;
            }
            res.json(dbThoughts)
        })
        .catch(err => {
            console.log(err);
            res.status(400).json(err);
        });
    }, 

    //update a thought
    updateThought({ params, body }, res){
        Thought.findOneAndUpdate(
            {
             _id: params.id
            }, 
            body, 
            {
            new: true, 
            runValidators: true
            })
        .then(dbThoughts => {
            if (!dbThoughts){
                res.sendStatus(404).json({ message: 'No thought associated with this ID is found'});
                return
            }
            res.json(dbThoughts)
        })
        .catch(err => {
            console.log(err);
            res.status(400).json(err);
        });
    }, 

    //delete thoughts
    deleteThought({ params }, res){
        Thought.findOneAndDelete ({ _id: params.id})
        .then(dbThoughts => {
            if (!dbThoughts){
                res.sendStatus(404).json({ message: 'No thought associated with this ID is found'});
                return
            }
            res.json(dbThoughts)
        })
        .catch(err => {
            console.log(err);
            res.status(400).json(err);
        });
    },

    //add reaction to thoughts
    addReaction({ params, body }, res){
        Thought.findOneAndUpdate(
            {_id: params.thoughtId}, 
            {$push: {reactions: body }}, 
            {new: true, 
            runValidators: true}
        )
        .then(dbThoughts => {
            if (!dbThoughts){
                res.sendStatus(404).json({ message: 'No thought associated with this ID is found'});
                return
            }
            res.json(dbThoughts)
        })
        .catch(err => {
            console.log(err);
            res.status(400).json(err);
        });
    },

    //delete a reaction
    deleteReaction({ params }, res){
        Thought.findOneAndDelete(
            {_id: params.thoughtId}, 
            {$pull: {reactions: {reactionId: params.reactionId}}}, 
            {new: true, 
            runValidators: true}
        )
        .then(dbThoughts => {
            if (!dbThoughts){
                res.sendStatus(404).json({ message: 'No thought associated with this ID is found'});
                return
            }
            res.json(dbThoughts)
        })
        .catch(err => {
            console.log(err);
            res.status(400).json(err);
        });
    }
}

module.exports = thoughtController; 