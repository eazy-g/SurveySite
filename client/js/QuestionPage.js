var QuestionPage = (function QuestionPage() {
  var publicAPI;
  var $questionBox;
  var $questionBody;
  var $answer;
  var $answerTemplate;
  var $answerList;
  var $questionHeading;
  var questions;
  var currentQuestion;
  var questionText;
  var selectedAnswer = '';

  publicAPI = {
    getQuestion: getQuestion
  };

  return publicAPI;

  function getQuestion () {
    $questionAnswers = $("#question-box").show();
    $questionBody = $('#question-body');
    $answer = $('#answer');
    $answerList = $('#answer-list');
    $questionHeading = $('.panel-heading');
    $answerTemplate = $answer.clone();
    $answer.remove();
    $questionHeading.append(selectedAnswer);

    $answerList.click(function(element) {
      selectedAnswer = element.toElement.textContent;
    });

    ServerAPI.getQuestion(user, function questionRetrieved(err, unanswered) {
      if(err) {
        console.error('error retrieving question', err);
      } else {
        questions = unanswered;
        if(questions.length) {
          currentQuestion = questions.shift();
          questionText = currentQuestion.question_text.split('^');
          $questionBody.text(questionText[0]);

          for (var i = 1; i < questionText.length; i++) {
            $answerList.append($answerTemplate.clone().text(questionText[i]));
          }

        }

      } //end else success block
    });
  }

})();
