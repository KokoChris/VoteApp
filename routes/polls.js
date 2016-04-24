var express = require('express'),
    router = express.Router(),
    Poll = require('../models/poll')



router.get('/', isLoggedIn, function(req, res) {

    Poll.find({'owner.id': req.user._id}, function(err, allPolls) {
        if (err) {
            console.log(err);
        } else {
            res.render('polls/index', { polls: allPolls });
        }
    });
});
router.get('/new', isLoggedIn, function(req, res) {
    res.render('polls/new');
});

router.get('/:id', function(req, res) {
    var pollId = req.params.id;
    Poll.findById(pollId, function(err, poll) {
        res.render('polls/show', { poll: poll });
    });
});
router.post('/', isLoggedIn, function(req, res) {

    var pollName = req.body.poll.name;
    var formOptions = req.body.poll.options;
    console.log(req.user)
    var owner = {
        id: req.user._id,
        username: req.user.username
    };
    console.log(owner)

    var options = [];
    formOptions.forEach(function(opt) {
        options.push({
            name: opt,
            count: 0
        });
    });
    newPoll = {
        name: pollName,
        options: options,
        owner: owner
    };
    Poll.create(newPoll, function(err, justCreated) {
        if (err) {
            console.log(err);

        } else {
            console.log(justCreated);
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
            poll.name = req.body.poll.name;
            console.log(poll, req.body.poll)
            var extraOptions = [];


            for (var j = 0; j < req.body.poll.options.length; j++) {
                if (poll.options[j]) {
                    poll.options[j].name = req.body.poll.options[j]
                }
                if (!poll.options[j]) {
                    console.log("hey")
                    extraOptions.push({
                        name: req.body.poll.options[j],
                        count: 0
                    });
                };
            }

            for (var k = 0; k < extraOptions.length; k++) {
                poll.options.push(extraOptions[k])
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


function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect("/login");
}

module.exports = router;
