const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const NotificationSchema = new Schema({

    author: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'users'
    },

    type: {
        type: String,
        required: true
    },

    postId: {
        type: Schema.Types.ObjectId,
        ref: 'posts'
    },

    commentId: {
        type: Schema.Types.ObjectId,
        ref: 'comments'
    },

    date: {
        type: Date,
        default: Date.now
    }

})

const Notification = mongoose.model('notifications', NotificationSchema);
module.exports = Notification;