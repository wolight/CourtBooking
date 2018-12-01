var express = require('express');
var router = express.Router();

var userModel = require('../models/users');
var isNotLoggedin = require('../middlewares/checkLogin').isNotLoggedin;


router.get('/', isNotLoggedin, function(req, res) {
    //get the page
});
router.post('/', isNotLoggedin, login);


// The user login
function login(req, res, next) {
    if (!req.body.hasOwnProperty('studentNum') || !req.body.hasOwnProperty('password')) {
        res.sendStatus(400);
        res.json({ error: 'Invalid message\n' });
    }
    else {
        // could handle the login post:
        userModel.findOne({ studentNum: req.body.studentNum }, function(err, student) {
            if (err) return next(err);
            // Student Found
            if (!student) {
              return res.sendStatus(400);
            }
            if (!student.validPassword(req.body.password)) {
                res.sendStatus(400);
            }
            else {
              req.session.loginStatus = 1;
              req.session.studentNum = req.body.studentNum;
              console.log(req.session);
              res.sendStatus(200);
            }
        });
    }
}

module.exports = router;
