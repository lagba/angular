(function () {
'use strict'

angular.module('LaunchCheck', [])
.controller('LaunchCheckController', MyController);

MyController.$inject = ['$scope'];
function MyController ($scope) {
  $scope.dishes = '';
  $scope.message = '';
  $scope.SayMessage = function () {
    var separator = /\s*(?:,|$)\s*/;
    var foodStr = $scope.dishes.split(separator);
    if ($scope.dishes.length == 0) {
      $scope.message = 'Please enter data first'
    } else if (foodStr.length <= 3) {
      $scope.message = 'Enjoy!'
    } else {
      $scope.message = 'Too much!'
    }
  }
}

})();
