const express = require('express');
var router = express.Router();
var ObjectId = require('mongoose').Types.ObjectId;

var { Note } = require('../models/note.model');

// Get all notes
router.route('/list').get((req, res, next) => {
    Note.find({ isArchived: false }, (error, data) => {
        if (error) {
            return next(error);
        } else {
            res.json({ data: data });
        }
    });
});

// Get note
router.route('/:id').get((req, res, next) => {
    Note.findById(req.params.id, (error, data) => {
        if (error) {
            return next(error);
        } else {
            res.json({ data: data });
        }
    });
});

// Add new note
router.route('/new').post((req, res, next) => {
    Note.create(req.body, (error, data) => {
        if (error) {
            return next(error);
        } else {
            res.json({ data: data });
        }
    });
});

// Update a note
router.route('/:id').put((req, res, next) => {
    var note = {
        title: req.body.title,
        body: req.body.body,
        isPinned: req.body.isPinned,
        isComplete: req.body.isComplete,
        isArchived: req.body.isArchived,
        dateModified: new Date(),
    };
    Note.findByIdAndUpdate(req.params.id, { $set: note }, { new: true }, (error, data) => {
        if (error) {
            return next(error);
        } else {
            res.json({ data: data });
        }
    });
});

// Delete note (soft delete)
router.route('/:id').delete((req, res, next) => {
    Note.findByIdAndUpdate(req.params.id, { $set: { isArchived: true } }, { new: true }, (error, data) => {
        if (error) {
            return next(error);
        } else {
            res.json({ data: data });
        }
    });
});

module.exports = router;