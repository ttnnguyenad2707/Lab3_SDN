const mongoose = require("mongoose");

const Product = mongoose.model("Product", new mongoose.Schema({
    id: {
        type: Number,

    },
    title: {
        type: String,
    },
    description: {
        type: String,

    },
    price: {
        type : Number,
    },
    discountPercentage: {
        type : Number,
    },
    rating: {
        type : Number,
    },
    stock: {
        type : Number,
    },
    brand: {
        type : Number,
    },
    category: {
        type : Number,
    },
    
}))

module.exports = Product