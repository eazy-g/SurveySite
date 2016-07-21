# SurveySite #
Survey Site is an application where users can create and manage survey questions, and guests can answer random survey questions.

This application is deployed publicly at http://survey-site.herokuapp.com/ 
It is hosted on a free server, so may take up to 30 seconds to load initially.

# Technical Documentation

## Getting Started
> If you'd like to run the app locally, first navigate to the parent folder you'd like the project to live in on your computer, and then run these commands: 

```
$ git clone https://github.com/eazy-g/SurveySite.git
$ cd SurveySite
$ bower install
$ npm install
$ npm start
```
If all goes well, you should see the message in your console
```
Listening on port 4400
```
Navigate to [localhost:4400](http://localhost:4400/) in your browser and you should see the site up and running!

## Database
Currently, the db file is pointing to an online MySQL database. If you'd like to use a local MySQL database, make the following changes to the db/db_deets.js file:
Comment out or delete the following line:
```
var sequelize = new Sequelize('mysql://s3nrwpp0w11o2h9h:t6o50clg223inm4h@nj5rh9gto1v5n05t.cbetxkdyhwsb.us-east-1.rds.amazonaws.com:3306/wlal2vxkd0jkqkcq');
```
And replace it with:
```
 var sequelize = new Sequelize("survey", "root", "", {
   host: 'localhost',
   dialect: 'mysql'
 });
```
Where 'survey' is the name of your database, 'root' is the username, and '' is the password. If the database is brand new, you need to **uncomment** this in the db_deets file: 
```
// sequelize.sync().then(function(){
//   return Database.Guests.create({identity: 'Joe'});
// }).then(function(results){
//   console.log('results', JSON.stringify(results));
// }).catch(function(err){
//   console.error('error connecting to db', err);
// });
```
And then run 
```
$ node db/db_deets.js
```
That command will execute the db_deets file, which in turn executes the sequelize.sync() functionality shown above, which creates the tables in your new db from the schema provided in this file. Press ctrl + c to stop the file from continuing to run. Your db should now be initialized with a Guest named 'Joe'. Go ahead and verify this in your mysql terminal.

>Once everything looks good in your db, comment that `sequelize.sync()` code chunk out again. Doing so will save the server from having to 'sync' with the database every time the db_deets file is executed.

## Testing
In order to test the backend functionality of the application, set the environment variable 'NODE_ENV' to 'test':
```
$ export NODE_ENV=test
```
Doing so makes the server file 'server/app.js' importable, so that you can test the following routes:

**GET /questions/?guest=bob**  ==> Gets all of the guests unanswered questions

 Where 'bob' is your guest identity. Currently, we are using the visitor's IP address. For testing, however, you could use whatever you'd like. If the identity is new to the database, a Guest entry will be made in the db and all of the questions will be returned in random order. If the identity is recognized in the db, only the questions not answered yet by the guest will be returned.
 
**POST /questions/answer**  ==> Answers a question

Where the request body is:
```
{
 identity: 'user's ip',
 questionId: currentQuestion's ID number,
 user_answer: 'just the answer letter in lower case format'
}
```

**GET /admin/questions?member=username**  ==> Gets all of an Admin's questions

Where 'username' is of course the admin's username. This request returns an array of questions, along with their associated answer data.

**POST /admin/login**  ==> Logs in an admin

Request body:
```
{
 username: 'username',
 password: 'password'
}
```

**POST /admin/signup**  ==> Signs up a new admin

Same request body as the login route.

**POST /admin/createQuestion**  ==> Allows an admin to create question

Request body:
```
{
 question_text: 'string containing the question itself as well as the answers seperated by carrots as shown? ^a) answer1 ^b) answer2 ^c) answer3',
 adminID: admins ID #
}
```

**POST /admin/deleteQuestion**  ==> deletes a question

Request body:
```
{
 id: question ID #
}
```

 
 



