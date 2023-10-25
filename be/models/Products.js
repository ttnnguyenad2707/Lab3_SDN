const mongoose = require("mongoose");
const Image = require("./Image");

const ImageSchema = mongoose.Schema({
    url: {
        type: String,
        required: true,
    },
    caption: {
        type: String,
    },
});
const Products = mongoose.model("Products", new mongoose.Schema({
    name: {
        type: String,
    },
    description: {
        type: String,

    },
    price: {
        type: Number
    },
    discountPercent: {
        type: Number
    },
    stock: {
        type: Number
    },
    brand: {
        type: String,
    },
    thumbnail: {
        type: String
    },
    image: {
        type: [ImageSchema]
    },
    comment: [{
        type: mongoose.Schema.ObjectId,
        ref: 'Comment'
    }]

}, { timestamps: true }))

module.exports = Products