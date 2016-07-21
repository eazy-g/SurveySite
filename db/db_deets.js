var Sequelize = require("sequelize");
// var sequelize = new Sequelize("sleepy-bayou-85275", "s3nrwpp0w11o2h9h", "t6o50clg223inm4h", {
//   host: 'nj5rh9gto1v5n05t.cbetxkdyhwsb.us-east-1.rds.amazonaws.com',
//   port: 3306,
//   dialect: 'mysql'

//   // pool: {
//   //   max: 5,
//   //   min: 0,
//   //   idle: 10000
//   // }
// });

var sequelize = new Sequelize('mysql://s3nrwpp0w11o2h9h:t6o50clg223inm4h@nj5rh9gto1v5n05t.cbetxkdyhwsb.us-east-1.rds.amazonaws.com:3306/wlal2vxkd0jkqkcq');

var Database = module.exports;
Database.sequelize = sequelize;

Database.Guests = sequelize.define('guests', {
  id: {type: Sequelize.INTEGER, unique: true, primaryKey: true, autoIncrement: true},
  identity: Sequelize.STRING
});

Database.Answers = sequelize.define('answers', {
  id: {type: Sequelize.INTEGER, unique: true, primaryKey: true, autoIncrement: true},
  user_answer: Sequelize.STRING
});

Database.Questions = sequelize.define('questions', {
  id: {type: Sequelize.INTEGER, unique: true, primaryKey: true, autoIncrement: true},
  question_text: Sequelize.STRING(1234)
});

Database.Admins = sequelize.define('admins', {
  id: {type: Sequelize.INTEGER, unique: true, primaryKey: true, autoIncrement: true},
  username: Sequelize.STRING,
  password: Sequelize.STRING
});

Database.Answers.belongsTo(Database.Questions);
Database.Questions.hasMany(Database.Answers);

Database.Answers.belongsTo(Database.Guests);
Database.Guests.hasMany(Database.Answers);

Database.Questions.belongsTo(Database.Admins);
Database.Admins.hasMany(Database.Questions);

// sequelize.sync().then(function(){
//   return Database.Guests.create({identity: 'Joe'});
// }).then(function(results){
//   console.log('results', JSON.stringify(results));
// }).catch(function(err){
//   console.error('error connecting to db', err);
// });
