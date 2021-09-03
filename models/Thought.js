const mongoose = require ('mongoose');
const date = require('../utils/date.js')

const Schema = mongoose.Schema;

const ReactionSchema = new Schema({
    reactionId: {
        type: Schema.Types.ObjectId,
        default: () => new Types.ObjectId()
    },
    reactionBody: {
        type: String, 
        required: true, 
        maxlength: 280
    },
    username: {
        type: String, 
        required: true
    }, 
    createdAt: {
        type: Date, 
        default: Date.now, 
        get: (createdAtVal) => date(createdAtVal)
    }
},
{
    toJSON: {
        getters: true
    },
    id: false
})

const ThoughtSchema = new Schema({
    thoughtText: {
        type: String, 
        required: true, 
        minlength: 1, 
        maxlength: 280
    }, 
    createdAt: {
        type: Date, 
        default: Date.now, 
        get: (createdAtVal) => date(createdAtVal)
    }, 
    username: {
        type: String, 
        required: true
    },
    reactions: [ReactionSchema]
},
{
    toJSON: {
        getters: true,
        virtuals: true
    },
    id: false
});

ThoughtSchema.virtual('reactionCount').get(function(){
    return this.reactions.length;
})

const Thought = mongoose.model('Thought', ThoughtSchema);

module.exports = Thought;