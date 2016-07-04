var express = require('express');
var Questions = require('../models/questions.js');
var bodyParser = require('body-parser');
var router = express.Router();

module.exports = router;

router.get('*', function (req, res) {
  Questions.getUnanswered(req.query.guest)
    .then(function(questions){
      res.status(200).send(questions);
    });
});

router.post('/answer', function (req, res) {
  Questions.answer(req.body)
    .then(function(status){
      res.status(201).send(status);
    });
});
