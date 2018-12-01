var express = require('express');
var userModel = require('../models/users');

module.exports = function isAdmin(req, res, next) {
  var uid = req.session.studentNum;
  userModel.findOne({studentNum:uid}, function(err,user) {
    if (err) return next(err);
    // Find the user:
    if (!user.admin) {
      //Not admin
      return res.sendStatus(400);
    }
    next();
  });
}
