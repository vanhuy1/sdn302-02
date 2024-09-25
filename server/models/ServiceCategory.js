const mongoose = require('mongoose');

const serviceCategorySchema = new mongoose.Schema({
    serviceCategoryName: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('ServiceCategory', serviceCategorySchema);
