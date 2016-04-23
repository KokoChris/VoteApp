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

router.put('/:id', editOrVote, function(req, res) {

    var pollId = req.params.id;

    Poll.findById(pollId, function(err, poll) {
        var notNew;
        for (var i = 0; i < poll.options.length; i++) {

            if (poll.options[i]["name"] === req.body.optionsRadios) {
                poll.options[i]["count"] += 1;
                notNew = true;
                poll.save(function(err) {
                    if (err) return handleError(err);
                    res.redirect("/polls/" + pollId);
                });
            }
        }
        if (!notNew) {
            var newPollOption = { name: req.body.optionsRadios, count: 1 };
            poll.options.push(newPollOption);
            poll.save(function(err) {
                if (err) return handleError(err);
                res.redirect("/polls/" + pollId);

            });
        }

    });
});


router.delete("/:id", function(req, res) {
    Poll.findByIdAndRemove(req.params.id, function(err) {
        if (err) {
            console.log(err);
        } else {
            res.redirect("/polls");
        }
    });

})

function editOrVote(req, res, next) {
    if (req.body.poll) {
        Poll.findById(req.params.id, function(err, poll) {

            for (var j = 0; j < poll.options.length; j++) {
                poll.options[j].name = req.body.poll.options[j]
            }
            poll.save(function(err) {
                if (err) return handleError(err);
                res.redirect("back")

            })
        });
    }
    if (req.body.optionsRadios) {
        next();
    }
}
module.exports = router;
