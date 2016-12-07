angular.module('starter')
  .controller("signupCtrl", ["$scope", "$log", "$ionicPopup", "$state", function($scope, $log, $ionicPopup, $state) {
    var scope = $scope;

    scope.model = {
      username: "",
      email: "",
      password: ""
    }


    scope.signup = function() {
      Accounts.createUser(scope.model, function(res) {
        if (res) {
          console.log(res);
        } else {
          $state.go('tab.chats');
        }
      })
    };



    function handleError(err) {
      $log.error('setting error ', err);
      $ionicPopup.alert({
        title: err.reason || 'Logout fail',
        template: 'Please try again',
        okType: 'button-positive button-clear'
      });
    }

  }])
