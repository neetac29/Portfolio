const mongoose = require('mongoose');

const projectSchema = mongoose.Schema({
    product_id: {
        type: String,
        unique: true,
        required: true
    },
    title: {
        type: String,
        trim: true
    },
    description: {
        type: String,
        required: true
    },
    image: {
        type: Object,
        required: false
    },

});

module.exports = mongoose.model('projects', projectSchema);