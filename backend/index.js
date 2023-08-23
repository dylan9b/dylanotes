const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const { mongoose } = require('./db.js');
var noteController = require('./controllers/note.controller.js');

var app = express();
app.use(bodyParser.json());
app.use(cors({ origin: 'http://192.168.4.39:4200' }));

app.listen(3000, "192.168.4.39", () => console.log('Server started at port : 3000'));


app.use('/api/notes', noteController);