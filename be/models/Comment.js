const mongoose = require('mongoose');
const Comment = mongoose.model('Comment',new mongoose.Schema({
    title :{
        type: String
    },
    body :{
        type: String
    },
    user :{
        type: mongoose.Schema.ObjectId,
        ref: 'User'
    },
},{timestamps:true}))

module.exports = Comment