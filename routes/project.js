var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Project = require('../models/Project.js');

// GET projects
router.get('/', function(req, res, next) {
  Project.find(function(err, projects) {
    if (err) return next(err);
    res.json(project);
  });
});

// Get single project
