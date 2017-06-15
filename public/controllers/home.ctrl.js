(function(){

'use strict';

angular.module('authApp').controller('homeController', homeController);

function homeController($http, $scope){
 $('.tap-target').tapTarget('open');

}

})();