var Admin = (function Admin() {
  var publicAPI;
  var data;
  var $username;
  var $password;
  var $percentage;
  var $questionBox;
  var $questionBoxTemplate;
  var $answer;
  var $answerTemplate;
  var $createButton;
  var questionAndAnswers;
  var currentAnswer;
  var answerLetter;
  var answerClone;

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
    $createButton = $('#create-button');
    $createButton.show();
    $createButton.find('button').click(createQuestion);

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

    $questionBoxTemplate.find('#admin-answer-list').empty();

    questionAndAnswers = question.question_text.split('^');

    $questionBoxTemplate.find('#admin-question-body').text(questionAndAnswers[0]);

    $questionBoxTemplate.find('#total-votes').text('Total Votes: ' + question.totalAnswers);

    $questionBoxTemplate.find('#delete-answer').click(function(evt){deleteQuestion(evt, question.id);});

    for (var i = 1; i < questionAndAnswers.length; i++) {
      currentAnswer = questionAndAnswers[i];
      answerClone = $answerTemplate.clone();
      answerClone.find('#admin-answer-text').text(currentAnswer);

      answerLetter = currentAnswer[0];

      if(question.percentages[answerLetter]){
        answerClone.find('#percentage').text((question.percentages[answerLetter]*100).toFixed(1) + '%');
      } else {
        answerClone.find('#percentage').text('0%');
      }

      $questionBoxTemplate.find('#admin-answer-list').append(answerClone);
    }
    return $questionBoxTemplate.show();
  }

  function deleteQuestion (evt, questionID) {
    if(confirm('Are you sure you want to delete this question?')) {
      ServerAPI.deleteQuestion({id: questionID}, function successDeleting(err, success) {
        if(err) {
          console.error('error deleting question', err);
        } else {
          // buildProfilePage();
          $(evt.target).closest('#admin-question-box').remove();
        }
      });
    }
  }

  function createQuestion () {
    var $addOption = $('add-answer-choice');
    $addOption.click()
  }

})();
