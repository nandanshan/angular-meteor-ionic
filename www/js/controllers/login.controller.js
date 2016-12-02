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
      phone: "",
      name: ""
    }

    scope.login = function() {
      if (scope.model.phone.length >= 10 && scope.model.name) {
        scope.callMethod('newUser', scope.model, function(err, result) {
          if (err) {
            return handleError(err);
          } else {
            localforage.setItem("currentUserId", result);
            $state.go('tab.chats',{userId:result});
          }
        });
      }
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
