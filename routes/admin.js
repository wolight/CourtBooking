var express = require('express');
var router = express.Router();
var userModel = require('../models/users');
var newsModel = require('../models/news');
var isAdmin = require('../middlewares/checkAdmin');
var bookingModel = require('../models/booking');
var sportModel = require('../models/sport');
var courtModel = require('../models/court');


router.get('/', isAdmin, function(req, res) {
    res.render('admin.html');
});

// TODO: get all users
router.get('/users', isAdmin, function(req, res) {
    userModel.find().exec(function(err, doc) {
        if (err) {
            res.status(500).send("Error");
        }
        res.send({"users":doc});
    });
});

// get all courts
router.get('/courts', isAdmin, function(req, res) {
    courtModel.find().exec(function(err, doc) {
    	if (err) {
    	    res.status(500).send("Error");
    	}
    	res.send({"courts":doc});
    });
});
// get all sports
router.get('/sports', function(req, res) {
    sportModel.distinct("sportName", function(err, sports) {
    	res.json({"sports":sports});
    }) ;
});

//TODO: make new notification
router.post('/news', isAdmin, function(req, res, next) {
    var news = newsModel({
        news_title: req.body.news_title,
        des: req.body.des,
        date: req.body.date
    });
    news.save(function(err) {
        if (err) return next(err);
        console.log('Add news');
        res.sendStatus(200);
    });
});

router.get('/news', function(req, res) {
	newsModel.find().sort({date: -1}).exec(function(err, doc) {
        if (err) {
            res.status(500).send("Error");
        }
        res.json(doc);
    });
});

// block users
router.delete('/users', isAdmin, function(req, res) {
    var uId = req.params.id;
    userModel.remove({ studentNum: uid }, function(err){
        if (err) return next(err);
        console.log('An old user has been blocked');
        res.sendStatus(200);
    });
    bookingModel.remove({ studentNum: uid });
});

module.exports = router;
