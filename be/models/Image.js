const mongoose = require('mongoose');
const Image = mongoose.model('Image',new mongoose.Schema({
    url :{
        type: String
    },
    caption :{
        type: String
    },
    path :{
        type: String
    },
},{timestamps:true}))

module.exports = Image