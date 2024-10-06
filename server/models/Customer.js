const mongoose = require('mongoose');

const customerSchema = new mongoose.Schema({
    customerName: {
        type: String,
        required: true
    },
    gender: {
        type: String,
        required: true,
        enum: ['O', 'X'] // O: male, X: female
    },
    address: {
        type: String,
        default: null
    },
    identityNumber: {
        type: Number,
        default: null
    }
});

module.exports = mongoose.model('Customer', customerSchema);

//No need