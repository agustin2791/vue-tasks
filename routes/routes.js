var express = require('express'),
    router = express.Router(),
    mongoose = require('mongoose'),
    User = require('../models/User.js'),
    Profile = require('../models/Projects.js');


router.post('/account', function(req, res, next) {
  if (req.body.email &&
      req.body.username &&
      req.body.password &&
      req.body.passwordConf
    ) {
      var userData = {
        email: req.body.email,
        username: req.body.username,
        password: req.body.password,
        passwordConf: req.body.passwordConf
      }

      // Use Schema.create to insert data into DB
      User.create(userData, function(err, user) {
        if (err) return next(err);
        return res.redirect('/profile');
      });
    }
});
