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

    comments: [],

    date: {
        type: Date,
        default: Date.now
    }
   
})

const Comment = mongoose.model('comments', CommentSchema);
module.exports = Comment;