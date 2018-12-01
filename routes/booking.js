var express = require('express');
var router = express.Router();
var User = require('../models/users');
var bookingModel = require('../models/booking');
var courtModel = require('../models/court');
var isNotLoggedin = require('../middlewares/checkLogin').isNotLoggedin;
var isLoggedin = require('../middlewares/checkLogin').isLoggedin;

router.get('/', isLoggedin, getBooking);
router.post('/', isLoggedin, addBooking);
router.delete('/:courtName/:date/:starttime', isLoggedin, deleteBooking);

// get all courts
router.get('/courts', function(req, res) {
    courtModel.find().exec(function(err, doc) {
      if (err) {
          res.status(500).send("Error");
      }
      res.send({"courts":doc});
    });
});


function getBooking(req, res, next) {
    var filter = {};
    if(req.query.studentNum){
      var studentNum = req.session.studentNum;
      bookingModel.find({studentNum:studentNum}, function(err, bookings) {
      if (err) return next(err);
          res.json(bookings);
      });
    }
    else{
      var filter = {};
      if(req.query.date)
        filter.date= req.query.date;
      if(req.query.starttime)
        filter.startname = req.query.startname;
      if(req.query.endtime)
        filter.endtime = req.query.endtime;
      if(req.query.courtname)
        filter.courtname = req.query.courtName;

      bookingModel.count(filter).exec(function(err, count){
        if(count != 0){
          return res.sendStatus(400);
        }
      });
  }
}

function addBooking(req, res, next) {
    if (!req.query.courtName || !req.query.date || !req.query.starttime || !req.query.endtime)
      return res.sendStatus(400);

    var startTime = req.query.starttime;
    var endTime = req.query.endtime;
    var date = req.query.date;
    courtModel.findOne({courtName: req.query.courtName}, function(err, court) {
      if (err) return next(err);
      if (!court) {
        return res.sendStatus(404);
      }
      var courtId = court._id;
      bookingModel.count({courtId:courtId, date:date, starttime:startTime}, function(err, count) {
        if (count!= 0) return res.sendStatus(403);
        var newBooking = bookingModel({
            studentNum: req.session.studentNum,
            courtId: courtId,
            date: date,
            starttime: startTime,
            endtime: endTime
        });
        newBooking.save(function(err) {
            if (err) return next(err);
            console.log('A new booking has created');
            res.sendStatus(200);
        });
      });
    });
}

function deleteBooking(req, res, next) {
    var courtName = req.params.courtNname;
    var date = req.params.date;
    var starttime = req.params.starttime;
    courtModel.find({name:courtName}, function(err, court) {
      if (err) return next(err);
      bookingModel.find({studentNum:req.session.studentNum,
        courtId:court.courtId, date:date, starttime:starttime}, function(err, booking) {
          if(err) return next(err);
          bookingModel.remove(booking);
          console.log('One Booking has been deleted');
      });
    });
}

module.exports = router;
