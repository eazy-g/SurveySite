var express = require('express');
var Admin = require('../models/admin.js');
var bodyParser = require('body-parser');
var router = express.Router();

module.exports = router;

//get all of the admins questions and data
router.get('/questions', function (req, res) {
  Admin.getAllQuestions(req.query.member)
    .then(function(questions){

      for (var i = 0; i < questions.length; i++) {
        //remove the sequelize junk and turn into plain object so we can add properties
        questions[i] = questions[i].get({plain: true});

        questions[i].totalAnswers = 0;

        //each question has an associated array of answers, so we need to
        //reduce that array of answers into an object showing how many votes per answer
        questions[i].votesPerAnswer = questions[i].answers.reduce(function(answersObj, currAns){
          questions[i].totalAnswers++;

          //if we have already started counting the current answer in our answersObj, then
          //increment that value - otherwise, start a new key/value pair for that answer
          if(answersObj[currAns.user_answer]){
            answersObj[currAns.user_answer]++;
          } else {
            answersObj[currAns.user_answer] = 1;
          }
          return answersObj;
        }, {});

        //turn the votes per answer into percentages, in order to display nicely as stats on front end
        questions[i].percentages = {};
        for(var z in questions[i].votesPerAnswer) {
          var numVotes = questions[i].votesPerAnswer[z];
          //z is the answer letter
          questions[i].percentages[z] = numVotes/questions[i].totalAnswers;
        }

      } //end outter for loop

      res.status(200).send(questions);
    });
}); //end router.get for all an admins questions with data

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
