var express = require('express');
var router = express.Router();
var courtModel = require('../models/court');
var sportModel = require('../models/sport');
var commentModel = require('../models/comment');
var userModel = require('../models/users');

var isAdmin = require('../middlewares/checkAdmin');
var isNotLoggedin = require('../middlewares/checkLogin').isNotLoggedin;
var isLoggedin = require('../middlewares/checkLogin').isLoggedin;


router.get('/', isLoggedin, function(req, res) {
    var courtId = req.query.id;
    courtModel.findOne({ _id: courtId }, function(err, court) {
        if (!court) return res.sendStatus(404);
        res.render('court_page.html', court);
    });
});


router.get('/booking', function(req, res) {
    res.render('booking.html');
});

// get the court with court id
router.get('/:id', function(req, res, next) {
    var cid = req.params.id; //get court id

    courtModel.findOne({ _id: cid }, function(err, court) {
        if (!court) return res.sendStatus(404);
        req.courtName = court.courtName;
        req.description = court.description;
        req.location = court.location;
        req.photo = court.photo;
        req.policy = court.policy;
        next();
    });
});

router.get('/:id', function(req, res, next) {
    sportModel.find({ courtId: req.params.id }, function(err, sports) {
        if (err) next(err);
        req.sports = sports;
        next();
    });

});

router.get('/:id', isLoggedin, function(req, res) {
    var cid = req.params.id;
    commentModel.find({ courtId: cid }, function(err, comments) {
        if (err) next(err);
        res.json({
            courtName: req.courtName,
            description: req.description,
            location: req.location,
            photo: req.photo,
            policy: req.policy,
            sports: req.sports,
            comments: comments
        });
    });
});

//only admin should have the privilages
router.post('/', isAdmin, function(req, res, next) {
    var newCourt = courtModel({
        courtName: req.body.courtName,
        description: req.body.description,
        location: req.body.location,
        policy: req.body.policy,
        photo: req.body.photo
    });
    console.log(newCourt);
    newCourt.save(function(err) {
        if (err) return next(err);
        console.log('A new court has created');
        res.sendStatus(200);
    });


});
// add sports of the court to the sport schema
router.post('/:id/sport', isAdmin, function(req, res) {
    courtModel.count({ _id: req.params.id }, function(err, count) {
        if (count == 0) {
            return res.senStatus(403);
        }
        var newSport = sportModel({
            courtId: req.params.id,
            sportName: req.body.sportName
        });
        newSport.save(function(err) {
            if (err) return next(err);
            console.log('Add sport to court');
            res.sendStatus(200);
        });
    });
});


//only admin should have the privilages
router.put('/:id/edit', isAdmin, function(req, res, next) {
    var cid = req.params.id; //get court id
    var description = req.body.description;
    var location = req.body.location;
    var photo = req.body.photo;
    var policy = req.body.policy;

    courtModel.findOne({ _id: cid },
        function(err, court) {
            if (err) return next(err);

            if (description) {
                court.description = description;
            }

            if (location) {
                court.location = location;
            }

            if (policy) {
            	court.policy = policy;
            }

            if (photo) {
            	court.photo = photo;
            }

            court.save(function(err) {
                if (err) return next(err);
                res.sendStatus(200);
            });
        }
    );
});

// delete a court
router.delete('/:id', isAdmin, function(req, res) {
    var cid = req.params.id;
    courtModel.remove({ _id: cid }, function(err) {
        if (err) return next(err);
        console.log('A court has been deleted');
        res.sendStatus(200);
    });
    sportModel.remove({ courtId: cid }, function(err) {
        if (err) return next(err);
        console.log('remove all sports from court');
    });

});

// TODO: post comment to the court
router.post('/:id/comment', isLoggedin, function(req, res) {
    var cid = req.params.id;
    var uid = req.session.studentNum;

    courtModel.count({ _id: req.params.id }, function(err, count) {
        if (count == 0) {
            return res.sendStatus(403);
        }
        userModel.findOne({ studentNum: uid }, function(err, user) {
            if (user.length = 0) return res.sendStatus(403);
            var dt = new Date();
            var date = dt.toUTCString();
            var newComment = commentModel({
                courtId: cid,
                firstname: user.firstname,
                lastname: user.lastname,
                content: req.body.content,
                date: date
            });
            console.log(newComment);
            newComment.save(function(err) {
                console.log(err);
                if (err) return res.sendStatus(405);
                console.log('Made commet to court');
                res.sendStatus(200);
            });

        });
    });
});


module.exports = router;
