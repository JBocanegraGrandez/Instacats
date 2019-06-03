const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CommentSchema = new Schema({

    author: {
        type: Schema.Types.ObjectId,
        ref: 'users'
    },

    body: {
        type: String,
        required: true
    },

    postId: {
        type: Schema.Types.ObjectId,
        ref: 'posts'
    },

    comments: [],

    likes: [{ type: Schema.Types.ObjectId, ref: 'users' }],

    date: {
        type: Date,
        default: Date.now
    }
   
})

const Comment = mongoose.model('comments', CommentSchema);
module.exports = Comment;