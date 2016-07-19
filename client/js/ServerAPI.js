var ServerAPI = (function ServerAPI(){
  var publicAPI;

  publicAPI = {
    login: login,
    getQuestion: getQuestion,
    submitAnswer: submitAnswer,
    adminQuestions: adminQuestions,
    deleteQuestion: deleteQuestion,
    createQuestion: createQuestion,
    signup: signup
  };

  return publicAPI;


  // ********************************

  function callAPI(endpoint,method,data,dataType,callback) {
    $.ajax("/" + endpoint,{
      method: method,
      data: data,
      dataType: dataType,
      cache: false,
      success: function onSuccess(resp){
        callback(null,resp);
      },
      error: function onError(jq,statusText,errText){
        callback(jq.responseText || errText);
      },
    });
  }

  function login(data,cb) {
    return callAPI("admin/login","POST",data,"json",cb);
  }

  function signup(data,cb) {
    return callAPI("admin/signup","POST",data,"json",cb);
  }

  function getQuestion(identity,cb) {
    return callAPI("questions?guest=" + identity, "GET", {}, "json", cb);
  }

  function submitAnswer(data,cb) {
    return callAPI("questions/answer","POST",data,"text",cb);
  }

  function adminQuestions(data,cb) {
    return callAPI("admin/questions?member=" + data.username,"GET",{},"json",cb);
  }

  function deleteQuestion(data,cb) {
    return callAPI("admin/deleteQuestion","POST",data,"text",cb);
  }

  function createQuestion(data,cb) {
    return callAPI("admin/createQuestion","POST",data,"json",cb);
  }

})();
