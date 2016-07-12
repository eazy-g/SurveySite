var Admin = (function Admin() {
  var publicAPI;
  var data;
  var $username;
  var $password;
  var $homepage;

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
    App.clearHomePage();
    ServerAPI.adminQuestions({username: $username}, function adminInfo (err, questions) {
      if(err) {
        console.error('error logging in', err);
      } else {
        console.log('questions', questions);
      }
    });
  }

})();
