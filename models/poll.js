var mongoose = require('mongoose');

var pollSchema = new mongoose.Schema({
    name: String,
    options: [{
        name: String,
        count: Number,
    }]
});

module.exports = mongoose.model('Poll', pollSchema);
