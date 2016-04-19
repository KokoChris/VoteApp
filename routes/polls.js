var express = require('express'),
    router = express.Router(),
    Poll = require('../models/poll');



router.get('/', function(req, res) {

    Poll.find({}, function(err, allPolls) {
        if (err) {
            console.log(err);
        } else {
            res.render('polls/index', { polls: allPolls });
        }
    });
});
router.get('/new', function(req, res) {
    res.render('polls/new');
});

router.get('/:id', function(req, res) {
    var pollId = req.params.id;
    Poll.findById(pollId, function(err, poll) {
        res.render('polls/show', { poll: poll });
    });
});
router.post('/', function(req, res) {

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
            res.redirect('/polls');
        }
    });
});


router.get('/:id/edit', function(req, res) {
    var pollId = req.params.id;
    Poll.findById(pollId, function(err, poll) {
        res.render('polls/edit', { poll: poll });
    });
});

router.put('/:id', function(req, res) {
    var pollId = req.params.id;
    console.log(req.body.optionsRadios);
    Poll.findById(pollId, function(err, poll) {
        poll.options.forEach(function(opt) {
           
            if (opt.name === req.body.optionsRadios) {
                opt.count += 1;
            }

        });
        poll.save(function(err) {
            if (err) return handleError(err);
            res.redirect("/polls/" + pollId);

        });
    });
});


module.exports = router;
