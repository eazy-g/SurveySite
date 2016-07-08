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
    $submitButton = $('button');
    $answerTemplate = $answer.clone();
    $answer.remove();

    $answerList.click(function(element) {
      $selectedAnswer.text('Your Answer: ' + element.toElement.textContent.charAt(0).toUpperCase());
      $submitButton.prop('disabled', false);
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
        console.log('questions', questions);
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
