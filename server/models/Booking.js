const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
    customerID: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Customer'
    },
    staffID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Staff'
    },
    roomID: {
        type: [mongoose.Schema.Types.ObjectId],
        required: true,
        ref: 'Room'
    },
    startDate: {
        type: Date,
        required: true
    },
    endDate: {
        type: Date,
        required: true
    },
    amountBook: {
        type: Number,
        required: true
    }
});

module.exports = mongoose.model('Booking', bookingSchema);
