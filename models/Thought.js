const {Schema, model, Types} = require ('mongoose');
const date = require('../utils/date.js')

const ReactionSchema = new.Schema({
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

const thoughtSchema = new Schema({
    thoughtText: {
        type: string, 
        required: true, 
        minlength: 1, 
        maxlength: 280
    }, 
    createdAt: {
        type: Date, 
        default: Date.now, 
        get: (createdAtVal) => date(createdAtVal)
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

ThoughtSchema.virtuals('reactionCount').get(function(){
    return this.reactions.length;
})

const Thought = model('Thought, thoughtSchema');

module.exports = Thought;