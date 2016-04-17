var express = require('express'),
    app = express(),
    bodyParser = require('body-parser'),
    mongoose = require('mongoose'),
    port = process.env.PORT || 3000,
    Poll = require('./models/poll');

app.set('view engine', 'ejs');

app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({ extended: false }));

mongoose.connect("mongodb://localhost/voteapp");


app.get('/', function(req, res) {
    res.status(200).send('welcome to the app');
});

app.get('/polls', function(req, res) {
	var polls = [{name : 'koko'}];
    res.render('polls/index',{polls: polls});
});

app.get('/polls/new', function(req, res) {
    res.render('polls/new');
});

app.post('/polls', function(req, res) {

    var pollName = req.body.name;
    var formOptions = req.body.option;

    var options = [];
    formOptions.forEach(function(opt) {
        options.push({
            name: opt,
            count: 0
        });
    });
    newPoll = {
        name: pollName,
        options: options
    };
    Poll.create(newPoll, function(err, justCreated) {
        if (err) {
            console.log(err);

        } else {
            res.redirect('/');
        }
    });
});



app.listen(port, function() {

    console.log('Server is running on port ' + port);
});


module.exports = app;
