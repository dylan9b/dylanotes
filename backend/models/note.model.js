const mongoose = require('mongoose');

var Note = mongoose.model('Note', {
    title: { type: String },
    body: { type: String },
    isComplete: { type: Boolean },
    isArchived: { type: Boolean },
    isPinned: { type: Boolean },
    dateCreated: { type: Date },
    dateModified: { type: Date },
});

module.exports = { Note };