angular.module('starter')
  .controller("ChatCtrl", ["$scope", "$stateParams", "moment","$timeout","$ionicScrollDelegate", function($scope, $stateParams, moment,$timeout,$ionicScrollDelegate) {
    var scope = $scope;
    scope.userId = $stateParams.userId;
    scope.chatId = $stateParams.chatId;
    // scope.subscribe("chats");
    // scope.subscribe("messages",function(){
    //   return [$stateParams.chatId]
    // });
console.log(scope.userId,scope.chatId);
scope.subscribe('chatusers');
    scope.helpers({
      messages: function() {
        return Messages.find({ chatId: scope.chatId });
      },
      data: function() {
        return Chats.findOne(scope.chatId);
      }
    });
    // autoScrollBottom();

    scope.message = null;

    scope.sendMessage = function() {
      if (_.isEmpty(scope.message)) return;
      scope.callMethod('newMessage', {
        text: scope.message,
        chatId: scope.chatId,
        userId: scope.userId
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
        $timeout(function() {
          $ionicScrollDelegate.$getByHandle('chatScroll').scrollBottom(animate);
        }, 300);
      }

  }]);
