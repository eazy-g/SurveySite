var db = require('../../db/db_deets');
var bcrypt = require('bcrypt-nodejs');
var Promise = require('bluebird');
var cipher = Promise.promisify(bcrypt.hash);
var decoder = Promise.promisify(bcrypt.compare);

var Admin = module.exports;

Admin.getAllQuestions = function (member_id) {
  return db.Questions.findAll({where: {admin_id: member_id}});
}

Admin.login = function (credentials) {
  return Admin.findUser(credentials.username)
    .then(function (user) {
      if(user){
        return decoder(credentials.password, user.password).bind(this)
          .then(function(match){
            if(match){
              return {success: true};
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
      console.log('made it', user);
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
      console.log('err on creation', err);
    });
}


Admin.createQuestion = function (details) {
  return db.Questions.create({
    question_text: details.question_text,
    admin_id: details.admin_id
  });
}


//helper function
Admin.findUser = function (user) {
  return db.sequelize.sync().then(function () {
    return db.Admins.findOne({
      where: {username: user}
    });
  }).catch(function(err){
    console.error('error connecting to db', err);
  });
}
