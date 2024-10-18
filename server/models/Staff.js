const mongoose = require('mongoose');

const staffSchema = new mongoose.Schema({

    department: {
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
        type: String,
        required: true,
        enum: ['Male', 'Female', 'Other'],
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
    },
    active: {
        type: Boolean,
        default: true
    }
});

module.exports = mongoose.model('Staff', staffSchema);
