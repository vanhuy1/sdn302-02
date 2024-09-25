const mongoose = require('mongoose');

const staffSchema = new mongoose.Schema({
    staffID: {
        type: Number,
        required: true,
        unique: true
    },
    departmentID: {
        type: Number,
        required: true,
        ref: 'Department'
    },
    staffName: {
        type: String,
        required: true,
        maxlength: 20
    },
    gender: {
        type: String,
        required: true
    },
    birthday: {
        type: Date,
        default: null
    },
    address: {
        type: String,
        maxlength: 20,
        default: null
    },
    identityNumber: {
        type: Number,
        required: true
    },
    phoneNumber: {
        type: String,
        default: null
    }
});

module.exports = mongoose.model('Staff', staffSchema);
