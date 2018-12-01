// Login-popup toggle
$(window).click(function(event) {
    if (event.target.id == "login-popup") {
        $("#login-popup").css("visibility", "hidden");
    }
});
$(document).ready(function() {
  // Register Toggle
  $("#register").click(function() {
    $("#loginForm").css("display", "none");
    $("#regiForm").css("display", "block");
  });

  // Login toggle
  $("#backLog").click(function () {
    $("#loginForm").css("display", "block");
    $("#regiForm").css("display", "none");
  });

  // User login info fetch
  function fetchLoginInput() {
      var loginInfo = new Object();
      var value = $.trim($("#loginStudent").val());
      if(value.length > 0) {
        loginInfo.studentNum = value;
      }
      var value=$.trim($("#loginPass").val());
      if(value.length > 0) {
        loginInfo.password = value;
      }
      return loginInfo;
  }

  // Login the user
  $("#login").click(login);
  function login() {
      var loginInfo = fetchLoginInput();
      $.ajax({
          type : "POST",
          url : "/login",
          dataType : "json",
          data: JSON.stringify(loginInfo),
          contentType: "application/json; charset=utf-8",
          statusCode: {
            400: function() {alert("Invalid!");},
            200: function() {
              alert("Logged in!");
              $("#login-popup").css("visibility", "hidden");
              location.reload();
            }
          },
          success : function (data) {
            alert("Success log in!");
          }
      });
  }

  // User register info fetch:
  function fetchRegisterInput() {
      var regiInfo = new Object();
      var value = $.trim($("#regiStudentNum").val());
      if(value.length > 0) {
        regiInfo.studentNum = value;
      }
      var value=$.trim($("#regiPassword").val());
      if(value.length > 0) {
        regiInfo.password = value;
      }
      var value=$.trim($("#firstname").val());
      if(value.length > 0) {
        regiInfo.firstname = value;
      }
      var value=$.trim($("#lastname").val());
      if(value.length > 0) {
        regiInfo.lastname = value;
      }
      var value=$.trim($("#regiEmail").val());
      if(value.length > 0) {
        regiInfo.email = value;
      }
      return regiInfo;
  }

  // Register the user
  $("#regi").click(register);
  function register() {
        var regiInfo = fetchRegisterInput();
        regiInfo.admin = false;
        $.ajax({
            type : "POST",
            url : "/user",
            dataType : "json",
            data: JSON.stringify(regiInfo),
            contentType: "application/json; charset=utf-8",
            statusCode: {
              400: function() {alert("Invalid!");},
              200: function() {
                alert("Success Register, please login!\n");
                $("#regiForm").css("display", "none");
                $("#loginForm").css("display", "block");
              }
            },
            success : function (data) {
              alert("Success!");
            }
        });
      }

      // Register the user
      $("#regiAdmin").click(registerAdmin);
      function registerAdmin() {
            var regiInfo = fetchRegisterInput();
            regiInfo.admin = true;
            $.ajax({
                type : "POST",
                url : "/user",
                dataType : "json",
                data: JSON.stringify(regiInfo),
                contentType: "application/json; charset=utf-8",
                statusCode: {
                  400: function() {alert("Invalid!");},
                  200: function() {
                    alert("Success Register, please login!\n");
                    $("#regiForm").css("display", "none");
                    $("#loginForm").css("display", "block");
                  }
                },
                success : function (data) {
                  alert("Success!");
                }
            });
          }
});
