var express = require('express');
var router = express.Router();
var isNotLoggedin = require('../middlewares/checkLogin').isNotLoggedin;
var isLoggedin = require('../middlewares/checkLogin').isLoggedin;
var newsModel = require('../models/news');
var courtModel = require('../models/court');

//logout function
function logout(req, res) {
  console.log('logging out ' + req.session.studentNum);
  req.session.destroy(function(err) {
    if (!err) {
      res.json({});
    }
  })
}

router.get('/news', function(req, res) {
    newsModel.find().exec(function(err, doc) {
        if (err) {
            res.status(500).send("Error");
        }
        res.send({"news":doc});
    });
});

// get all courts
router.get('/courts', function(req, res) {
    courtModel.find().exec(function(err, doc) {
      if (err) {
          res.status(500).send("Error");
      }
      res.send({"courts":doc});
    });
});

router.get('/',  function(req, res) {
    if (!req.session.loginStatus == 1) {
          //Not Logged In Yet!
        res.render("indexbeforelogin.html");
    }
    else {
      res.render("index.html");
    }
});
router.get('/logout', isLoggedin, logout);
module.exports = router;
