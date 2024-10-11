const mongoose = require('mongoose');

const staffSchema = new mongoose.Schema({
    departmentID: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Department'
    },
    staffName: {
        type: String,
        required: true,
        maxlength: 20
    },
    gender: {
        type: Boolean,
        required: true,
        default: false
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
    position: {
        type: String,
        required: true
    },
    salary: {
        type: Number
    },
    email: {
        type: String
    },
    phoneNumber: {
        type: String,
        default: null
    },
    active: {
        type: Boolean,
        default: true
    }
}, { timestamps: true });

module.exports = mongoose.model('Staff', staffSchema);
