var express = require('express');
var Admin = require('../models/admin.js');
var bodyParser = require('body-parser');
var router = express.Router();

module.exports = router;

//get all of the admins questions and data
router.get('/questions', function (req, res) {
  Admin.getAllQuestions(req.query.member)
    .then(function(questions){
      res.status(200).send(questions);
    });
});

router.post('/login', function (req, res) {
  Admin.login(req.body)
    .then(function (status) {
      res.status(201).send(status);
    });
});

router.post('/signup', function (req, res) {
  Admin.signup(req.body)
    .then(function (status) {
      res.status(201).send(status);
    });
});

router.post('/createQuestion', function (req, res) {
  Admin.createQuestion(req.body)
    .then(function (status) {
      res.status(201).send(status);
    });
});
