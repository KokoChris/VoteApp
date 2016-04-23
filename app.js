var express = require('express'),
    app = express(),
    bodyParser = require('body-parser'),
    mongoose = require('mongoose'),
    port = process.env.PORT || 3000,
    Poll = require('./models/poll'),
    methodOverride = require("method-override"),
    pollRoutes = require('./routes/polls');

app.set('view engine', 'ejs');

app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.use('/polls', pollRoutes);

mongoose.connect("mongodb://localhost/voteapp");


app.get('/', function(req, res) {
    res.redirect('/polls');
});

app.listen(port, function() {

    console.log('Server is running on port ' + port);
});


module.exports = app;
