var express = require('express');
var Admin = require('../models/admin.js');
var bodyParser = require('body-parser');
var router = express.Router();

module.exports = router;

//get all of the admins questions and data
router.get('/questions', function (req, res) {
  console.log('req query', req.query);
  Admin.getAllQuestions(req.query.member)
    .then(function (questions){
      console.log('questions', JSON.stringify(questions));
      // Admin.getAnswers(req.query.member)
      //   .then(function (answers) {

      //   })
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
