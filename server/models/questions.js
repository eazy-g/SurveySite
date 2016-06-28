var db = require('../../db/db_deets');
var Questions = module.exports;

Questions.findOne = function (ip) {
  //first do a comparison to see if new guest or returning

  //have to compare question list and answers
  //return a db promise call
}

Questions.answer = function (details) {
  //post to answers table w/ guest_id, question_id, and answer

}
