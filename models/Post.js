const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Comment = require("./Comment").schema;

const PostSchema = new Schema({

    user: {
        type: Schema.Types.ObjectId,
        ref: 'users'
    },

    img: {
        type: String,
        required: true
    },

    caption: {
        type: String,
        required: false
    },

    location: {
        type: String,
        required: false
    },

    tags: {
        type: String,
        required: false
    },

    likes: [{ type: Schema.Types.ObjectId, ref: 'users' }],

    comments: [{ type: Comment }],

    date: {
        type: Date,
        default: Date.now
    }
})

const Post = mongoose.model('posts', PostSchema);
module.exports = Post;