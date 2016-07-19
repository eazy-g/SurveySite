//This will hold the user's ip. In the case they decide to answer questions,
//it will be used to identify them
var user;

var App = (function App(){
  var publicAPI;
  var identity;
  var $questionBox;
  var $getQuestionsButton;
  var $signInButton;
  var $spinner;
  var $signinModal;
  var $signupModal;

  publicAPI = {
    init: init,
    clearHomePage: clearHomePage,
    homePage: null,

    identity: null
  };

  return publicAPI;


  function init() {
    publicAPI.homePage = $(".jumbotron");
    $getQuestionsButton = $("#answer-qs");
    $signInButton = $('#sign-in');
    $signUpButton = $('#sign-up');
    $spinner = $('.spinner');
    $signinModal = $('#myModal-signin');
    $signupModal = $('#myModal-signup');

    $getQuestionsButton.click(function(e) {
      clearHomePage();
      QuestionPage.getQuestion();
    });

    $signInButton.click(function(e) {
      Admin.signIn();
    });

    $signUpButton.click(function(e) {
      Admin.signUp();
    });
  }

  function clearHomePage () {
    publicAPI.homePage.hide();
    $signinModal.modal('hide');
    $signupModal.modal('hide');
  }

})();

$(document).ready(App.init);
