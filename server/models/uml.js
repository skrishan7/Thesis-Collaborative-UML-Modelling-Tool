const mongoose = require('mongoose');

const UmlSchema = mongoose.Schema({
    filename: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: false
    },
    encoded: {
        type: String,
        required: false
    },
    url: {
        type: String,
        required: false
    },
    lastEditedBy: {
        type: String,
        required: true
    }
});

const UML = module.exports = mongoose.model('Uml', UmlSchema);