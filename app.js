var express = require('express'),
    app = express(),
    bodyParser = require('body-parser'),
    mongoose = require('mongoose'),
    passport = require('passport'),
    LocalStrategy = require('passport-local'),
    port = process.env.PORT || 3000,
    Poll = require('./models/poll'),
    User = require('./models/user'),
    methodOverride = require("method-override"),
    pollRoutes = require('./routes/polls'),
	indexRoutes = require('./routes/index');



app.set('view engine', 'ejs');


app.use(require('express-session')({
    secret: 'Nasty Bananas',
    resave: false ,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()))

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
app.use(function (req,res,next) {
	
	res.locals.currentUser = req.user;
	next();
});
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.use('/polls', pollRoutes);
app.use(indexRoutes);

//mongoose.connect("mongodb://localhost/voteapp");
mongoose.connect("mongodb://test:test123@ds013250.mlab.com:13250/vtapp");

app.get('/', function(req, res) {
     Poll.find({}, function(err, allPolls) {
        if (err) {
            console.log(err);
        } else {
            res.render('landing', { polls: allPolls });
        }
    });
});

app.listen(port, function() {

    console.log('Server is running on port ' + port);
});


module.exports = app;
