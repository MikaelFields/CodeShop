(function () {

    'use strict';

    angular.module('authApp').controller('loginController', loginController);

    function loginController($http, $scope, $window) {
  
    
     document.getElementById('LogMatch').innerHTML = ""; 
     document.getElementById('prealoader-logIn').style = "display: none";
   // SEND USER DATA TO THE SERVER
    $scope.login = function () {
    document.getElementById('prealoader-logIn').style = "display: block";
    document.getElementById('buttons').style = "display: none";
     document.getElementById('LogMatch').innerHTML = ""; 

       var logUserData = {
        userName: $scope.user.username,
        userPassword: $scope.user.password
      };

       $http.post('/logInSuser', logUserData).then(function(res){
           console.log(res.data);
          if(res.data===true){
            $window.location = "/#!/landing";
            document.getElementById('LogMatch').innerHTML = "";  
          } else if (res.data===false){
            document.getElementById('prealoader-logIn').style = "display: none";
            document.getElementById('buttons').style = "display: block";
            document.getElementById('LogMatch').innerHTML = "Username or password incorrect, please try it again...";  
          } else if(res.data=="Username does not exist!, please try another username or create an account"){
             document.getElementById('prealoader-logIn').style = "display: none";
            document.getElementById('buttons').style = "display: block";
            document.getElementById('LogMatch').innerHTML = "Username does not exist!, please try another username or create an account.";  
          }
      });
      // socket.emit('logUser', logUserData);
    };



  
 

  }//end function controller

})();