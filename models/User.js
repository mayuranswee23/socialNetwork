const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema ({
    username: {
    type: String,
    required: true,
    trim: true,
    unique: true
}, 
    email: {
    type: String,
    required: true,
    unique: true,
    match: [/^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/]
}, 
    thoughts: [{
        type: Schema.Types.ObjectId, 
        ref: 'Thought'
    }],
    friends: [{
        type: Schema.Types.ObjectId, 
        ref: 'User'
    }]
},
{
    toJSON: {
        virtuals: true
    },
    id: false
});

UserSchema.virtual('friendCount').get(function(){
    return this.friends.length
});

const User = mongoose.model('User', UserSchema);
module.exports = User;