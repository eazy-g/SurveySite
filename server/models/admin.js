var db = require('../../db/db_deets');
var bcrypt = require('bcrypt-nodejs');
var Promise = require('bluebird');
var cipher = Promise.promisify(bcrypt.hash);
var decoder = Promise.promisify(bcrypt.compare);

var Admin = module.exports;

Admin.getAllQuestions = function (member_name) {
  return db.Admins.findOne({
           where: {username: member_name},
           include: [{
             model: db.Questions,
             include: [db.Answers]
           }]
         }).then(function getStats (user) {
           return user.questions;
         });
}


Admin.login = function (credentials) {
  return Admin.findUser(credentials.username)
    .then(function (user) {
      if(user){
        return decoder(credentials.password, user.password).bind(this)
          .then(function(match){
            if(match){
              return {user: user.id};
            } else {
              return {success: false};
            }
        });
      } else {
        return {error: 'not found'}
      }
    });
}


Admin.signup = function (credentials) {
  return Admin.findUser(credentials.username)
    .then(function (user) {
      if(user){
        return {error: 'User already exists'}
      } else {
        return cipher(credentials.password, null, null).bind(this)
                 .then(function (hash) {
                   return db.Admins.create({
                     username: credentials.username,
                     password: hash
                 });
               });
      }
    }).catch(function(err){
      console.error('err on creation', err);
    });
}


Admin.createQuestion = function (details) {
  return db.Questions.create({
    question_text: details.question_text,
    adminId: details.adminId
  }).catch(function (err) {
    console.error('error creating question', err);
  });
}

Admin.deleteQuestion = function (questionID) {
  return db.Questions.destroy({
    where: {
      id: questionID
    }
  });
}

//helper function
Admin.findUser = function (user) {
  return db.Admins.findOne({
    where: {username: user}
  });
}
