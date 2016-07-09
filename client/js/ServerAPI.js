var ServerAPI = (function ServerAPI(){
  var publicAPI;

  publicAPI = {
    login: login,
    getQuestion: getQuestion,
    submitAnswer: submitAnswer,
    adminQuestions: adminQuestions,
    addReminder: addReminder,
    updateReminder: updateReminder,
    setReminderInvitees: setReminderInvitees,
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
    return callAPI("admin/login","POST",data,"text",cb);
  }

  function getQuestion(identity,cb) {
    return callAPI("questions?guest=" + identity, "GET", {}, "json", cb);
  }

  function submitAnswer(data,cb) {
    return callAPI("questions/answer","POST",data,"text",cb);
  }

  function adminQuestions(data,cb) {
    return callAPI("admin/questions?member=" + data.username,"GET",{},"text",cb);
  }

  function addReminder(data,cb) {
    return callAPI("reminder/add","POST",data,"text",cb);
  }

  function updateReminder(data,cb) {
    return callAPI("reminder/update","POST",data,"text",cb);
  }

  function setReminderInvitees(data,cb) {
    return callAPI("reminder/invite","POST",data,"text",cb);
  }

})();
