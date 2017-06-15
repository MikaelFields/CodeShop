(function () {

  'use strict';

  angular.module('authApp').controller('registerController', registerController);

  function registerController($http, $scope, $location,  $window) {

  

    // PARALAX MATERIALIZE FOR COVER PAGES
    $('.parallax').parallax();
 
    //INICIALIZE FORM CARDS
    document.getElementById('formReg').style = "display: block";
    document.getElementById('welcomeReg').style = "display: none";

    // SEND USER DATA TO THE SERVER
       document.getElementById('prealoader-logIn').style = "display: none";
    $scope.regist = function () {
    document.getElementById('prealoader-logIn').style = "display: block";
    document.getElementById('buttons').style = "display: none";
      var newUser = {
        userName: $scope.user.username,
        userEmail: $scope.user.email,
        userPassword: $scope.user.password
      };
      $http.post('/registAUser', newUser).then(function(res){
          if (res.data) {
          //  $window.location = "/#!/login";
           document.getElementById('formReg').style = "display: none";
           document.getElementById('welcomeReg').style = "display: block";
           document.getElementById('userMatch').innerHTML = "";

          } else {
             document.getElementById('prealoader-logIn').style = "display: none";
            document.getElementById('buttons').style = "display: block";
           document.getElementById('userMatch').innerHTML = "The username or email already exist, please verify and try it again..";
           }
          console.log("message from server:" + res.data);
    });
      // socket.emit('newUser', newUser);
    };
  }
  // END CONTROLLER

})();