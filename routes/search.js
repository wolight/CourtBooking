var express = require('express');
var router = express.Router();
var courtModel = require('../models/court');
var sportModel = require('../models/sport');
var isLoggedin = require('../middlewares/checkLogin').isLoggedin;

router.get('/', function(req, res, next) {
    if (Object.keys(req.query).length === 0) {
      if (!req.session.loginStatus == 1) {
        res.render("searchbeforelogin.html");
      }
      else{
        res.render('search.html')
      }
    } else {
        var name = req.query.court;
        var sport = req.query.sport;
        var location = req.query.location;
        var day = req.query.day;

        if (!name) {
            return res.sendStatus(403);
        }

        let all = courtModel.find({ courtName: new RegExp(name, "i") })
        if (location) {
            all = all.where('location').equals(location);
        }
        if (day) {

        }

        all.exec(function(err, courts, next) {
            if (err) return next(err);
            if (sport) {
                sports_all = sportModel.find({ sportName: sport }).select('courtId').exec(
                    function(err, sports) {
                        if (err) return next(err);
                        var result = [];
                        for (c in courts) {
                            for (s in sports) {
                                //find courts with the sport
                                if (courts[c]._id == sports[s].courtId) {
                                    result.push(courts[c]);
                                }
                            }
                        }
                        return res.json(unique(result));
                    }
                );
            } else {
                return res.json(courts);
            }


        });
    }
});


router.get('/all_location', function(req, res, next) {
    courtModel.find({}).select('location').exec(
        function(err, locations) {
            if (err) return next(err);
            res.json(locations);
        });
});

router.get('/all_sport', function(req, res, next) {
    sportModel.find({}).select('sportName').exec(
        function(err, sports) {
            if (err) return next(err);
            res.json(sports);
        });
});


function unique(array) {
    array = array.filter(function(i, index, self) {
        return index == self.indexOf(i);
    });

    return array;
}


module.exports = router;
