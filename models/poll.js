var mongoose = require('mongoose');

var pollSchema = new mongoose.Schema({
    name: String,

    options: [{
        name: String,
        count: Number,
        _id:false,
    }]
});

module.exports = mongoose.model('Poll', pollSchema);
