var db = require('../../db/db_deets');
var Questions = module.exports;

Questions.getUnanswered = function (ip) {
  //first do a comparison to see if new guest or returning
  return db.Guests.findOne({where: {identity: ip}})
    .then(function (guest){
      if(guest){
        //find questions they have not answered
        return db.Questions.findAll({
                 include: [{
                   model: db.Answers,
                   where: {
                     guestID: guest.dataValues.id
                   }
                 }]
               }).then(function (questions){
                 var alreadyAnswered = [0];
                 questions.forEach(function(question){
                   alreadyAnswered.push(question.id);
                 });
                 return db.Questions.findAll({
                   where: {
                     id: { $notIn: alreadyAnswered }
                   }
                 });
               });
      } else {
        return db.Guests.create({identity: ip})
          .then(function (newGuest){
            return db.Questions.findOne();
          })
        //create guest and then get first question
      }
    });
}

Questions.answer = function (details) {
  //post to answers table w/ guest_id, question_id, and answer
  return db.Answers.create({
    guestId: details.guestId,
    questionId: details.questionId,
    user_answer: details.user_answer
  }).catch(function (err) {
    console.error('error answering question', err);
  })
}
