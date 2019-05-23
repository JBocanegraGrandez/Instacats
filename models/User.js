const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({

    email: {
        type: String,
        required: true
    },
    
    password: {
        type: String,
        required: true
    },

    username: {
        type: String,
        required: true
    },

    name:{
        type: String,
        required: false
    },

    lastname:{
        type: String,
        required: false
    },
    
    profileURL: {
        type: String,
        required: false
    },

    description: {
        type: String,
        required: false
    },

    
    followers: [{ type: Schema.Types.ObjectId, ref: 'users'}],

    following: [ {type: Schema.Types.ObjectId, ref: 'users'}],

    date: {
        type: Date,
        default: Date.now
    }
})

const User = mongoose.model('users', UserSchema);
module.exports = User;