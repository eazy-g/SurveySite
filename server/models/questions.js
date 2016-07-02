var db = require('../../db/db_deets');
var Questions = module.exports;

Questions.findOne = function (ip) {
  //first do a comparison to see if new guest or returning

  //have to compare question list and answers
}

Questions.answer = function (details) {
  //post to answers table w/ guest_id, question_id, and answer
  return db.Answers.create({
    guest_id: details.guest_id,
    question_id: details.question_id,
    user_answer: details.answer
  }).catch(function (err) {
    console.error('error answering question', err);
  })
}
