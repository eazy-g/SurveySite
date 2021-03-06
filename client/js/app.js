//This will hold the user's ip. When they decide to answer questions, it will be used to identify them
var user;

var App = (function App() {
  var publicAPI = {
    init: init,
    clearHomePage: clearHomePage,
    showHomePage: showHomePage,
    homePage: null,
    identity: null
  };

  var identity;
  var $questionBox;
  var $getQuestionsButton;
  var $signInButton;
  var $createButton;
  var $homeButton;
  var $spinner;
  var $signinModal;
  var $signupModal;

  return publicAPI;


  function init() {
    publicAPI.homePage = $(".jumbotron");
    $getQuestionsButton = $("#answer-qs");
    $signInButton = $('#sign-in');
    $signUpButton = $('#sign-up');
    $createButton = $('#create-button');
    $homeButton = $('#home-button-box');
    $questionBox = $('#question-box');
    $signinModal = $('#myModal-signin');
    $signupModal = $('#myModal-signup');

    $getQuestionsButton.click(function (e) {
      clearHomePage();
      QuestionPage.getQuestion();
    });

    $signInButton.click(function (e) {
      Admin.signIn();
    });

    $signUpButton.click(function (e) {
      Admin.signUp();
    });
  }

  function clearHomePage() {
    publicAPI.homePage.hide();
    $signinModal.modal('hide');
    $signupModal.modal('hide');
  }

  function showHomePage() {
    publicAPI.homePage.show();
    $createButton.hide();
    $questionBox.hide();
    $homeButton.hide();

    //remove all of the users questions from the page
    $('*').filter(function () {
      if ($(this).data('question-id')) {
        $(this).remove();
      }
    });
  }

})();

$(document).ready(App.init);
