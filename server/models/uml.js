const mongoose = require('mongoose');

const UmlSchema = mongoose.Schema({
    filename: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    encoded: {
        type: String,
        required: true
    },
    lastEditedBy: {
        type: String,
        required: true
    }
});

const UML = module.exports = mongoose.model('Uml', UmlSchema);