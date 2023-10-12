const mongoose = require("mongoose");

const Brand = mongoose.model("Brand", new mongoose.Schema({
    name: {
        type: String,
    }
}))

module.exports = Brand