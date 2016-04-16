var express = require('express'),
    app = express(),
    bodyParser = require('body-parser'),
    mongoose = require('mongoose'),
    port = process.env.PORT || 3000;

app.set('view engine', 'ejs');

app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({ extended: false }));


app.get('/', function(req, res) {
    res.status(200).send('welcome to the app');
});

app.get('/polls', function(req, res) {
    res.render('polls/index');
});

app.get('/polls/new', function(req, res) {
    res.render('polls/new');
});

app.post('/polls', function(req, res) {
    console.log(req.body);
    res.sendStatus(201);
});



app.listen(port, function() {

    console.log('Server is running on port ' + port);
});


module.exports = app;
