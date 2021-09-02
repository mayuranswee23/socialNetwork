const { User, Thought } = require('../models');

const userController = {
    //create a user
    createUser({ body }, res){
        User.create(body)
        .then(dbUsers => res.json(dbUsers))
        .catch(err => 
            res.status(400).json(err));
    },

    // get all users
    findAllUser(req, res){
        User.find({})
        .then((dbUsers) => res.json(dbUsers))
        .catch(err => 
            res.json(err));
    }, 

    //get one user by ID
    findOneUser({params}, res){
        User.findOne(params.Id)
        .then((dbUsers) => res.json(dbUsers))
        .catch(err => 
            res.json(err));
    }, 

    //update a user
    updateUser({params, body}, res){
        User.findOneAndUpdate(
            {_id: params.id}, 
            body, 
            {new: true, 
            runValidators: true}
            )
            .then(dbUsers => {
                if (!dbUsers){
                    res.status(404).json({ message: 'No user associated with this ID'});
                    return;
                }
                res.json(dbUsers)
            })
            .catch(err => res.json(err));
    }, 

    //delete a user
    deleteUser({params}, res){
        User.findOneAndDelete(
            {_id: params.id}
        )
        .then(dbUser => {
            if (!dbUsers){
                res.status(404).json({ message: 'No user associated with this ID'});
                return;
            }
            res.json(dbUsers)
        })
        .catch(err => res.json(err));
    },
    
    //add a friend
    addFriends({ params }, res){
        User.findOneAndUpdate(
            {_id: params.id}, 
            {$push: {friends: params.friendId} },
            {new: true, 
            runValidators: true}
        )
        .then(dbUser => {
            if (!dbUsers){
                res.status(404).json({ message: 'No user associated with this ID'});
                return;
            }
            res.json(dbUsers)
        })
        .catch(err => res.json(err));
    },

    //delete a friend
    deleteFriends({ params }, res ){
        User.findOneAndUpdate(
            {_id: params.id}, 
            {$pull: {friends: params.friendId} },
            {new: true, 
            runValidators: true}
        )
        .then(dbUser => {
            if (!dbUsers){
                res.status(404).json({ message: 'No user associated with this ID'});
                return;
            }
            res.json(dbUsers)
        })
        .catch(err => res.json(err));
    }
};

module.exports = userController; 