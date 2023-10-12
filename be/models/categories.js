const mongoose = require("mongoose");

const Category = mongoose.model("Category", new mongoose.Schema({
    id : {
        type: Number,
    },
    name: {
        type: String,
    }
}))

module.exports =  Category