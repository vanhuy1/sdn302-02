const mongoose = require('mongoose');

const customerServiceSchema = new mongoose.Schema({
    customerID: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Customer'
    },
    serviceID: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Service'
    },
    servicePrice: {
        type: Number,
        required: true
    }
});

module.exports = mongoose.model('CustomerService', customerServiceSchema);
