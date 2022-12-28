const express = require('express');
var router = express.Router();
var ObjectId = require('mongoose').Types.ObjectId;

var { Note } = require('../models/note.model');

// => localhost:3000/notes/
router.get('/list', (req, res) => {
    Note.find((err, docs) => {
        if (!err) { res.send(docs); }
        else { console.log('Error in Retriving Notes :' + JSON.stringify(err, undefined, 2)); }
    });
});

router.get('/:id', (req, res) => {
    if (!ObjectId.isValid(req.params.id))
        return res.status(400).send(`No record with given id : ${req.params.id}`);

    Note.findById(req.params.id, (err, doc) => {
        if (!err) { res.send(doc); }
        else { console.log('Error in Retriving Note :' + JSON.stringify(err, undefined, 2)); }
    });
});

router.post('/new', (req, res) => {
    var note = new Note({
        title: req.body.title,
        body: req.body.body,
        isPinned: req.body.isPinned,
        isComplete: req.body.isComplete,
        isArchived: req.body.isArchived,
        dateCreated: new Date(),
        dateModified: null,
    });
    note.save((err, doc) => {
        if (!err) { res.send(doc); }
        else { console.log('Error in Note Save :' + JSON.stringify(err, undefined, 2)); }
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