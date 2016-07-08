//This will hold the user's ip. In the case they decide to answer questions,
//it will be used to identify them
var user;

var App = (function App(){
  var publicAPI;
  var identity;
  var $homePage;
  var $questionBox;

  publicAPI = {
    init: init,

    identity: null
  };

  return publicAPI;


  function init() {
    $homePage = $(".jumbotron");
    $getQuestionsButton = $("#answer-qs");

    $getQuestionsButton.click(function(e) {
      $homePage.hide();
      QuestionPage.getQuestion();
    });


  }
})();

$(document).ready(App.init);
