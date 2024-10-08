const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    gender: {
        type: Boolean,
        default: true
    },
    address: {
        type: String,
        required: true
    },
    birthDay: {
        type: Date,
        required: true
    },
    identifyNumber: {
        type: String,
        required: true
    },
    phoneNumber: {
        type: String,
        required: true
    },
    roles: {
        type: [String],
        default: ["Customer"]
    },
    active: {
        type: Boolean,
        default: true
    }

})

module.exports = mongoose.model('User', userSchema)
