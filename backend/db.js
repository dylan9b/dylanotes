const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://Admin_123:Jrr7x2Hg18bG7Xxx@cluster0.cz98hbm.mongodb.net/Dylanotes_DB?retryWrites=true&w=majority', (err) => {
    if (!err)
        console.log('MongoDB connection succeeded.');
    else
        console.log('Error in DB connection : ' + JSON.stringify(err, undefined, 2));
});

module.exports = mongoose;