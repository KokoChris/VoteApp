var mongoose = require('mongoose');

var pollSchema = new mongoose.Schema({
    name: String,

    options: [{
        name: String,
        count: Number,
        _id: false,
    }],
    owner: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        username: String
    }

});



module.exports = mongoose.model('Poll', pollSchema);
 