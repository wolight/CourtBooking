var express = require('express');
var router = express.Router();
var userModel = require('../models/users');
var bookingModel = require('../models/booking');
var newsModel = require('../models/news');
var courtModel = require('../models/court');

var isNotLoggedin = require('../middlewares/checkLogin').isNotLoggedin;
var isLoggedin = require('../middlewares/checkLogin').isLoggedin;

router.get('/', isLoggedin, function(req, res) {
    var uid = req.session.studentNum;
    userModel.findOne({studentNum: uid}, function(err, user) {
      if (err) throw err;
      res.render('user.html', user);
    });
});




// create user
router.post('/', isNotLoggedin, function(req, res, next) {
    if (!req.body.studentNum || !req.body.password || !req.body.email || !req.body.firstname || !req.body.lastname) {
      return res.sendStatus(400);
    }
    userModel.count({ studentNum: req.body.studentNum }, function(err, count) {
        if (count != 0) {
            // Already Exists!
            console.log('This user already exists!!!');
            return res.sendStatus(400);
        }
        var newUser = userModel({
            studentNum: req.body.studentNum,
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            email: req.body.email,
            admin: req.body.admin,
            icon: "https://upload.wikimedia.org/wikipedia/commons/3/34/PICA.jpg"
        });
        if (req.body.phoneNum) {
            newUser.phoneNum = req.body.phoneNum;
        }

        newUser.setPassword(req.body.password);

        newUser.save(function(err) {
            if (err) return next(err);
            console.log('A new user has created');
            res.sendStatus(200);
        });
    });
});

router.put('/', isLoggedin, function(req, res, next) {
    var uid = req.session.studentNum;
    var email = req.body.email;
    var phoneNum = req.body.phoneNum;
    var password = req.body.password;
    var icon = req.body.icon;


    userModel.findOne({ studentNum: uid }, function(err, user) {
        if (err) return next(err);
        if (email) {
            user.email = email;
        }

        if (phoneNum) {
            user.phoneNum = phoneNum;
        }

        if (password) {
            user.setPassword(password);
        }

        if (icon) {
            user.icon = icon;
        }

        user.save(function(err) {
            if (err) return next(err);
            console.log('Update User Info')
            return res.sendStatus(200);
        })

    });
});

router.delete('/', isLoggedin, function(req, res, next) {
    var uid = req.session.studentNum;
    userModel.remove({ studentNum: uid }, function(err) {
        if (err) return next(err);
        console.log('An old user has been deleted');
        bookingModel.remove({ studentNum: uid });
        req.session.destroy();
        res.sendStatus(200);
    });
});

router.get('/news', isLoggedin, function(req, res) {
    newsModel.find().exec(function(err, doc) {
        if (err) {
            res.status(500).send("Error");
        }
        res.send(doc);
    });
});

router.get('/bookings', isLoggedin, function(req, res){
	var uid = req.session.studentNum;
	bookingModel.find({studentNum:uid}, function(err, bookings) {
		if (err) return res.sendStatus(403);
		var result = [];
		courtModel.find({}, function(err, courts){
			for (c in courts) {
				for (b in bookings) {
					if (courts[c]._id == bookings[b].courtId) {
						var item ={};
						item.courtName = courts[c].courtName;
						item.date = bookings[b].date;
						item.starttime = bookings[b].starttime;
						item.endtime = bookings[b].endtime;
						result.push(item);
					}
				}
			}

			res.json({"bookings":result});
		});
	});
});

module.exports = router;
