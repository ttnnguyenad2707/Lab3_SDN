const mongoose = require('mongoose');

const ConnectDB = async () => {
    try {
        await mongoose.connect('mongodb://127.0.0.1:27017/lab3')
        console.log("connect successfully");

    } catch (error) {
        throw new Error("Connect failed")
    }
}

module.exports = ConnectDB