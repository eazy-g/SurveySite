var Sequelize = require("sequelize");
var sequelize = new Sequelize("survey", "root", "", {
  host: 'localhost',
  dialect: 'mysql'

  // pool: {
  //   max: 5,
  //   min: 0,
  //   idle: 10000
  // }
});

var Database = module.exports;
Database.sequelize = sequelize;

Database.Guests = sequelize.define('guests', {
  id: {type: Sequelize.INTEGER, unique: true, primaryKey: true, autoIncrement: true},
  indentity: Sequelize.STRING
});

Database.Answers = sequelize.define('answers', {
  id: {type: Sequelize.INTEGER, unique: true, primaryKey: true, autoIncrement: true},
  guest_id: Sequelize.INTEGER,
  question_id: Sequelize.INTEGER,
  user_answer: Sequelize.STRING
});

Database.Questions = sequelize.define('questions', {
  id: {type: Sequelize.INTEGER, unique: true, primaryKey: true, autoIncrement: true},
  question_text: Sequelize.STRING(1234),
  admin_id: Sequelize.INTEGER
});

Database.Admins = sequelize.define('admins', {
  id: {type: Sequelize.INTEGER, unique: true, primaryKey: true, autoIncrement: true},
  username: Sequelize.STRING,
  password: Sequelize.STRING
});

// sequelize.sync().then(function () {
//   // Table created
//   return Guests.create({
//     indentity: 'will Hamm'
//   });

// }).catch(function(err){
//   console.error('error connecting to db', err);
// });

// sequelize.sync().then(function () {

//   return Guests.create({'indentity': 'John Smith'}).then(function() {
//     console.log('yes?');
//     // Retrieve objects from the database:
//     // Guests.findAll({ where: {username: "Jean Valjean"} }).then(function(usrs) {
//     //   // This function is called back with an array of matches.
//     //   for (var i = 0; i < usrs.length; i++) {
//     //     console.log(usrs[i].username + " exists");
//     //   }
//     // }).catch(function(err) {
//     //   console.error('place2', err)
//     // });

//   }).catch(function (err) {
//     console.error('place1', err);
//   });

// }).catch(function(err) {
//   console.error('ugh', err);
// })