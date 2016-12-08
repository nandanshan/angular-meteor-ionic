angular.module('starter')
  .controller("ChatCtrl", ["$scope", "$stateParams", "moment", "$timeout", "$ionicScrollDelegate", function($scope, $stateParams, moment, $timeout, $ionicScrollDelegate) {
    var scope = $scope;
console.log($scope.currentUserId);
    if (Meteor.status().connected) {
      $scope.subscribe('users');

      $scope.subscribe("chats", function() {
        return [$scope.currentUserId]
      });
    } else {
      console.log("offline");
    }

    $scope.helpers({
      chat: function() {
        return Chats.findOne($stateParams.chatId);
      },
      messages: function() {
        return Messages.find({
          chatId: $stateParams.chatId
        });
      }
    });

    autoScrollBottom();

    scope.message = null;

    scope.sendMessage = function() {
      if (_.isEmpty(scope.message)) return;

      scope.callMethod('newMessage', {
        text: scope.message,
        chatId: $stateParams.chatId
      });

      delete scope.message;
    };

    function inputUp() {
      $timeout(function() {
        $ionicScrollDelegate.$getByHandle('chatScroll').scrollBottom(true);
      }, 300);
    }

    function inputDown() {
      $ionicScrollDelegate.$getByHandle('chatScroll').resize();
    }

    function autoScrollBottom() {
      var recentMessagesNum = scope.messages.length;
      scope.autorun(function() {
        const currMessagesNum = scope.getCollectionReactively('messages').length;
        const animate = recentMessagesNum != currMessagesNum;
        recentMessagesNum = currMessagesNum;
        scrollBottom(animate);
      });
    }

    function scrollBottom(animate) {
      console.log("coming");
      $timeout(function() {
        $ionicScrollDelegate.$getByHandle('chatScroll').scrollBottom(animate);
      });
    }

  }]);
