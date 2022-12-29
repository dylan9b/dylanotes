const express = require('express');
var router = express.Router();
var ObjectId = require('mongoose').Types.ObjectId;

var { Note } = require('../models/note.model');

// => localhost:3000/notes/
// router.route('/list').get((req, res) => {
//     Note.find((err, docs) => {
//         if (!err) { res.send({ data: docs }); }
//         else { console.log('Error in Retriving Notes :' + JSON.stringify(err, undefined, 2)); }
//     });
// });

// Get all notes
router.route('/list').get((req, res, next) => {
    Note.find((error, data) => {
        if (error) {
            return next(error);
        } else {
            res.json({ data: data });
        }
    });
});

// Get note by id
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

router.put('/:id', (req, res) => {
    if (!ObjectId.isValid(req.params.id))
        return res.status(400).send(`No record with given id : ${req.params.id}`);

    var note = {
        title: req.body.title,
        body: req.body.body,
        isPinned: req.body.isPinned,
        isComplete: req.body.isComplete,
        isArchived: req.body.isArchived,
        dateModified: new Date(),
    };
    Note.findByIdAndUpdate(req.params.id, { $set: note }, { new: true }, (err, doc) => {
        if (!err) { res.send(doc); }
        else { console.log('Error in Note Update :' + JSON.stringify(err, undefined, 2)); }
    });
});

router.delete('/:id', (req, res) => {
    if (!ObjectId.isValid(req.params.id))
        return res.status(400).send(`No record with given id : ${req.params.id}`);

    Note.findByIdAndRemove(req.params.id, (err, doc) => {
        if (!err) { res.send(doc); }
        else { console.log('Error in Note Delete :' + JSON.stringify(err, undefined, 2)); }
    });
});

module.exports = router;