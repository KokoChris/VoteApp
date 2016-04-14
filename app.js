var express = require('express'),
    app = express(),
    bodyParser = require('body-parser'),
    mongoose = require('mongoose'),
    port = process.env.PORT || 3000;



app.set('view engine', 'ejs');

app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({ extended: false }));


app.get('/', function(req, res) {
    res.render('partials/header');
});



app.listen(port, function() {

    console.log('Server is running on port ' + port);
});


module.exports = app;