var Admin = (function Admin() {
  var publicAPI = {
    signIn: signIn,
    signUp: signUp
  };

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
  var $createQmodal;
  var questionAndAnswers;
  var currentAnswer;
  var answerLetter;
  var answerClone;
  var errorMessage;

  return publicAPI;

  function signIn() {

    $username = $('#sign-in-username').val();
    $password = $('#sign-in-password').val();
    $errorMessage = $('#warning-message');

    data = {
      username: $username,
      password: $password
    };

    ServerAPI.login(data, function loginStatus(err, status) {
      if (err) {
        console.error('error logging in', err);
      } else {

        //will only have a 'user' property if successful login
        if(status.user){
          userID = status.user;
          buildProfilePage();
          $errorMessage.text('');
        } else {
          errorMessage = status.error ? 'Username not found!' : 'Password incorrect!';
          $errorMessage.text(errorMessage).show();
        }
      }
    });
  }

  function signUp() {

    $username = $('#sign-up-username').val();
    $password = $('#sign-up-password').val();
    $errorMessage = $('#username-warning-message');

    data = {
      username: $username,
      password: $password
    };

    ServerAPI.signup(data, function loginStatus(err, status) {
      if (err) {
        console.error('error logging in', err);
      } else {
        if (status.userTaken) {

          //user already exists, display error message
          $errorMessage.show();
        } else {

          //user signup successful
          userID = status.user;
          buildProfilePage();
          $errorMessage.hide();
        }
      }
    });

  }

  function buildProfilePage() {
    $questionBox = $('#admin-question-box');
    $createButton = $('#create-button');
    $homeButton = $('#home-button');

    $originalCreateQmodal = $('#myModal-create').clone();
    $createButton.show();
    $createButton
      .find('button')
        .click(createQuestion);

    App.clearHomePage();

    $homeButton.click(App.showHomePage);

    ServerAPI.adminQuestions({username: $username}, function adminInfo(err, questions) {
      if (err) {
        console.error('error logging in', err);
      } else {
        $('body').append(questions.map(buildQuestion));
      }
    });
  }

  function buildQuestion(question) {
    $questionBoxTemplate = $questionBox.clone();
    $answer = $('#admin-answer');
    $answerTemplate = $answer.clone();

    //I used the ^ as identifier so that the question text as well as answers could be put into one string
    questionAndAnswers = question.question_text.split('^');

    $questionBoxTemplate
      .find('#admin-answer-list')
        .empty();

    $questionBoxTemplate
      .find('#admin-question-body')
        .text(questionAndAnswers[0]);

    $questionBoxTemplate
      .find('#total-votes')
        .text('Total Votes: ' + question.totalAnswers);

    $questionBoxTemplate
      .find('#delete-answer')
        .click(function (evt) {
          deleteQuestion(evt, question.id);
        });

    $questionBoxTemplate.attr("data-question-id", question.id);

    for (var i = 1; i < questionAndAnswers.length; i++) {
      currentAnswer = questionAndAnswers[i];
      answerClone = $answerTemplate.clone();
      answerClone
        .find('#admin-answer-text')
          .text(currentAnswer);

      answerLetter = currentAnswer[0];

      if (question.percentages[answerLetter]) {
        answerClone
          .find('#percentage')
            .text((question.percentages[answerLetter]*100).toFixed(1) + '%');
      } else {
        answerClone
          .find('#percentage')
            .text('0%');
      }

      $questionBoxTemplate
        .find('#admin-answer-list')
          .append(answerClone);
    }

    return $questionBoxTemplate.show();
  }

  function deleteQuestion(evt, questionID) {
    if (confirm('Are you sure you want to delete this question?')) {
      ServerAPI.deleteQuestion({id: questionID}, function successDeleting(err, success) {
        if (err) {
          console.error('error deleting question', err);
        } else {
          $(evt.target)
            .closest('#admin-question-box')
            .remove();
        }
      });
    }
  }

  function createQuestion() {
    var $answersForm = $('#answer-form');
    var $addOption = $('#add-choice');
    var $answerFormDiv = $('#created-answers');
    var $submitQuestion = $('#submit-question');
    var $optionTemplate = $answersForm.clone();
    var letter = 'a';
    var option;

    $createQmodal = $('#myModal-create');
    $createQmodal.on('hidden.bs.modal', function (e) {
      $createQmodal.remove();
      $('body').append($originalCreateQmodal.clone());
    });

    $addOption.click(function () {

      //only allow options up to 'z'
      if (letter.charCodeAt(0) < 122) {
        option = $optionTemplate.clone();
        letter = nextChar(letter);
        option.find('#answer-label').text(letter + ')');
        $answerFormDiv.append(option);
      }
    });

    $submitQuestion.click(submitQuestion);
  }

  function nextChar(letter) {
    return String.fromCharCode(letter.charCodeAt(0) + 1);
  }

  function submitQuestion() {
    var letter = 'a';
    var questionText = [$('#question-text').val()];

    $('*[id*=answer-option]:visible').each(function () {
      questionText.push(' ^' + letter + ') ' + $( this ).val());
      letter = nextChar(letter);
    });

    ServerAPI.createQuestion({
      question_text: questionText.join(''),
      adminId: userID
      }, function answerSubmitted(err, success) {
        if (err) {
          console.error('error submitting question', err);
        } else {

          //Making the new question have all the properties necessary to 'buildQuestion'
          success.answers = [];
          success.percentages = {};
          success.totalAnswers = 0;
          success.votesPerAnswer = {};
          $('body').append(buildQuestion(success));
          $createQmodal.modal('hide');

          /**
          * I had to setTimeout because the modal was being removed from the page before the modal's 'hide' animation was   * finished. Also, removing the modal with all of the user's input, and then adding back in a clone of the original * seemed easier than backtracking through all the changes to the modal.
          */
          setTimeout(function () {
            $createQmodal.remove();
            $('body').append($originalCreateQmodal.clone());
          }, 1000);
        }
      });
  }

})();
