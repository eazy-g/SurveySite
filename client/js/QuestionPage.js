var QuestionPage = (function QuestionPage() {
  var publicAPI;
  var $questionBox;
  var $questionBody;
  var $answer;
  var $answerTemplate;
  var $answerList;
  var $selectedAnswer;
  var $submitButton;
  var questions;
  var currentQuestion;
  var questionText;

  publicAPI = {
    getQuestion: getQuestion
  };

  return publicAPI;

  function getQuestion () {
    $questionAnswers = $("#question-box").show();
    $questionBody = $('#question-body');
    $answer = $('#answer');
    $answerList = $('#answer-list');
    $selectedAnswer = $('#selected-answer');
    $submitButton = $('#submit-answer');
    $answerTemplate = $answer.clone();
    $answer.remove();

    $answerList.click(function(element) {
      $selectedAnswer.text('Your Answer: ' + element.toElement.textContent.charAt(0).toUpperCase());
      $submitButton.prop('disabled', false);
    });

    $submitButton.click(function(element) {
      answerQuestion($selectedAnswer.text().slice(-1));
    });

    ServerAPI.getQuestion(user, function questionRetrieved(err, unanswered) {
      if(err) {
        console.error('error retrieving question', err);
      } else {
        if(unanswered.hasOwnProperty('question_text')){
          //case where 'unanswered' is just a single question object
          questions = [unanswered];
        } else {
          //case where we get multiple questions in an array
          questions = unanswered;
        }

        buildQuestion();

      } //end else success block
    }); //ServerAPI.getQuesiton
  } //function getQuestion


  function answerQuestion(answer) {
    var data = {
      identity: user,
      questionId: currentQuestion.id,
      user_answer: answer.toLowerCase()
    };

    ServerAPI.submitAnswer(data, function answerSubmitted(err, success) {
      if(err) {
        console.error('error answering question', err);
      } else {
        buildQuestion();
      }
    });

  }


  function buildQuestion () {
    $submitButton.prop('disabled', true);
    $selectedAnswer.text('Your Answer: ');
    $answerList.empty();

    if(questions.length) {
      currentQuestion = questions.shift();
      questionText = currentQuestion.question_text.split('^');
      $questionBody.text(questionText[0]);

      for (var i = 1; i < questionText.length; i++) {
        $answerList.append($answerTemplate.clone().text(questionText[i]));
      }
    } else {
      //there are no questions left
      $questionBody.text('You\'ve answered every question in the system! Please come back later');
    }

  }

})();
