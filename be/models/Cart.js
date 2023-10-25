const mongoose = require('mongoose');
const ProductSchema = mongoose.Schema({
    name: {
        type: String,
    },
    price: {
        type: Number
    },
    discountPercent: {
        type: Number
    },
    quantity: {
        type: Number
    }
});
const Cart = mongoose.model('Cart',new mongoose.Schema({
    discountTotal :{
        type: Number
    },
    totalProduct :{
        type: Number
    },
    totalQuantity :{
        type: Number
    },
    totalPrice :{
        type: Number
    },
    product :{
        type: [ProductSchema]
    },
    user: {
        type : mongoose.Schema.ObjectId,
        ref: 'User'
    }
}))

module.exports = Cart