var express = require('express');
var Questions = require('../models/questions.js');
var bodyParser = require('body-parser');
var router = express.Router();

module.exports = router;

router.get('*', function (req, res) {
  console.log('req query', req.query);
  Questions.findOne()
    .then(function(question){
      res.status(200).send(question);
    });
});

router.post('/answer', function (req, res) {
  Questions.answer(req.body)
    .then(function(status){
      res.status(201).send(status);
    });
});
