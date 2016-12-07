angular.module('starter')
  .controller("loginCtrl", ["$scope", "$log", "$ionicPopup", "$state", function($scope, $log, $ionicPopup, $state) {
    var scope = $scope;

    scope.subscribe("chatusers");

    scope.helpers({
      users: function() {
        return Chats.find({});
      }
    });

    scope.model = {
      username: "",
      password: ""
    }

    scope.login = function() {

      Meteor.loginWithPassword(scope.model.username, scope.model.password, function(res){
        if(res){
          console.log(res.reason);
        }else {
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
