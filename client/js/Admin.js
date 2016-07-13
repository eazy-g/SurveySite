var Admin = (function Admin() {
  var publicAPI;
  var data;
  var $username;
  var $password;
  var $fraction;
  var $percentage;
  var $questionBox;
  var $questionBoxTemplate;
  var $questionBody;
  var $answer;
  var $answerTemplate;
  var $answerList;
  var $answerText;
  var questionAndAnswers;
  var currentAnswer;
  var answerLetter;

  publicAPI = {
    signIn: signIn
  };

  return publicAPI;

  function signIn () {

    $username = $('#sign-in-username').val();
    $password = $('#sign-in-password').val();

    data = {
      username: $username,
      password: $password
    };

    ServerAPI.login(data, function loginStatus(err, status) {
      if(err) {
        console.error('error logging in', err);
      } else {
        buildProfilePage();
      }
    });

  } //function signIn

  function buildProfilePage () {
    $questionBox = $('#admin-question-box');

    App.clearHomePage();
    ServerAPI.adminQuestions({username: $username}, function adminInfo (err, questions) {
      if(err) {
        console.error('error logging in', err);
      } else {
        $('body').append(questions.map(buildQuestion));
      }
    });
  }

  function buildQuestion (question) {
    $questionBoxTemplate = $questionBox.clone();
    $answer = $('#admin-answer');
    $answerTemplate = $answer.clone();
    var x;
    // $fraction = $('#fraction');
    // $percentage = $('#percentage');
    // $answerText = $('#admin-answer-text');

    // $answerList = $('#admin-answer-list');
    $questionBoxTemplate.find('#admin-answer-list').empty();

    questionAndAnswers = question.question_text.split('^');

    // $questionBody = $('#admin-question-body');
    // $questionBody.text(questionAndAnswers[0]);
    $questionBoxTemplate.find('#admin-question-body').text(questionAndAnswers[0]);

    for (var i = 1; i < questionAndAnswers.length; i++) {
      currentAnswer = questionAndAnswers[i];
      x = $answerTemplate.clone();
      x.find('#admin-answer-text').text(currentAnswer);

      answerLetter = currentAnswer[0];
      console.log('in here', questionAndAnswers[i]);
      if(question.percentages[answerLetter]){
        x.find('#percentage').text(question.percentages[answerLetter]*100 + '%');
      } else {
        x.find('#percentage').text('0%');
      }

      $questionBoxTemplate.find('#admin-answer-list').append(x);
    }
    return $questionBoxTemplate.show();
  }

})();
