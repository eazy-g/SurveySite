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
                 //had to initialize array with '0' b/c the $notIn functionality below
                 //failed when searching an empty array
                 var alreadyAnswered = [0];
                 questions.forEach(function(question){
                   alreadyAnswered.push(question.id);
                 });
                 return db.Questions.findAll({
                   where: {
                     id: { $notIn: alreadyAnswered }
                   },
                   order: [
                     db.sequelize.fn('RAND')
                   ]
                 });
               });
      } else {
        //create guest and then get first question
        return db.Guests.create({identity: ip})
          .then(function (newGuest){
            return db.Questions.findOne({
              order: [
                db.sequelize.fn('RAND')
              ]
            });
          });
      }
    });
}

Questions.answer = function (details) {
  //post to answers table w/ guest_id, question_id, and answer
  return db.Guests.findOne({where: {identity: details.identity}})
    .then(function (guest) {
      return db.Answers.create({
        guestId: guest.id,
        questionId: details.questionId,
        user_answer: details.user_answer
      });
    }).catch(function (err) {
        console.error('error answering question', err);
    })

}
