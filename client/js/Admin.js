var Admin = (function Admin() {
  var publicAPI;
  var data;
  var userID;
  var $username;
  var $password;
  var $percentage;
  var $questionBox;
  var $questionBoxTemplate;
  var $answer;
  var $answerTemplate;
  var $createButton;
  var $originalCreateQmodal;
  var questionAndAnswers;
  var currentAnswer;
  var answerLetter;
  var answerClone;

  publicAPI = {
    signIn: signIn,
    signUp: signUp
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
        userID = status.user;
        buildProfilePage();
      }
    });

  } //function signIn

  function signUp () {

    $username = $('#sign-up-username').val();
    $password = $('#sign-up-password').val();
    $errorMessage = $('#username-warning-message');

    data = {
      username: $username,
      password: $password
    };

    ServerAPI.signup(data, function loginStatus(err, status) {
      if(err) {
        console.error('error logging in', err);
      } else {
        if(status.userTaken) {
          //user already exists, display error message
          $errorMessage.show();
        } else {
          //user signup successful
          userID = status.user;
          buildProfilePage();
        }
      }
    });

  }

  function buildProfilePage () {
    $questionBox = $('#admin-question-box');
    $createButton = $('#create-button');
    $originalCreateQmodal = $('#myModal-create').clone();
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
    var $answersForm = $('#answer-form');
    var $addOption = $('#add-choice');
    var $answerFormDiv = $('#created-answers');
    var $submitQuestion = $('#submit-question');
    var $optionTemplate = $answersForm.clone();
    var option;
    var letter = 'a';
    $addOption.click(function(){
      option = $optionTemplate.clone();
      letter = nextChar(letter);
      option.find('#answer-label').text(letter + ')');
      $answerFormDiv.append(option);
    });

    $submitQuestion.click(submitQuestion);
  }

  function nextChar(letter) {
    return String.fromCharCode(letter.charCodeAt(0) + 1);
  }

  function submitQuestion () {
    var letter = 'a';
    var $createQmodal = $('#myModal-create');
    var $questionText = $('#question-text').val();
    $('*[id*=answer-option]:visible').each(function() {
      $questionText += ' ^' + letter + ') ' + $( this ).val();
      letter = nextChar(letter);
    });
    ServerAPI.createQuestion({
      question_text: $questionText,
      adminId: userID
      }, function answerSubmitted (err, success) {
        if (err) {
          console.error('error submitting question', err);
        } else {
          //Making the new question have all the properties necessary to buildQuestion
          success.answers = [];
          success.percentages = {};
          success.totalAnswers = 0;
          success.votesPerAnswer = {};
          $('body').append(buildQuestion(success));
          $createQmodal.modal('hide');

          //had to setTimeout because modal was being removed before the modal's 'hide' animation was finished. Removing the modal with all of the user's input and then adding back in a clone of the original seemed easier than backtracking through all the changes to the modal.
          setTimeout(function(){
            $createQmodal.remove();
            $('body').append($originalCreateQmodal.clone());
          }, 1000);
        }
      });
  }

})();
