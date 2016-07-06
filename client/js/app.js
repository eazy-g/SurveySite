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
    $questionBox = $("#questionBox");

    //TODO
  }
