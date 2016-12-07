angular.module('starter')
  .controller("ChatsCtrl", ["$scope", "moment", "$ionicModal", "$ionicPopup", "$state", "$log", function($scope, moment, $ionicModal, $ionicPopup, $state, $log) {
    var scope = $scope;

    if (Meteor.status().connected) {
      $scope.subscribe('users');

      $scope.subscribe("chats", function() {
        return [$scope.currentUserId]
      });
    } else {
      console.log("offline");
    }

    $scope.helpers({
      users: function() {
        return Meteor.users.find({
          _id: {
            $ne: $scope.currentUserId
          }
        });
      },
      chats: function() {
        return Chats.find();
      }
    });

    $ionicModal.fromTemplateUrl('templates/new-chat.html', {
      scope: $scope
    }).then(function(modal) {
      scope.modal = modal;
    });

    scope.$on('$destroy', function() {
      scope.modal.remove();
    });

    scope.openNewChatModal = function() {
      scope.modal.show();
    }

    scope.hideModal = function() {
      $scope.modal.hide();
    }

    scope.newChat = function(userId) {
      var chat = Chats.findOne({
        userIds: {
          $all: [$scope.currentUserId, userId]
        }
      });
      if (chat) {
        scope.goToChat(chat._id);
      } else {
        scope.callMethod('newChat', userId, function(err, result) {
          if (err) {
            return handleError(err);
          }
          scope.goToChat(result);
        });
      }
    };

    scope.remove = function(chat) {
      scope.callMethod('removeChat', chat._id);
    }

    scope.goToChat = function(chatId) {
      $state.go('tab.chat', {
        chatId: chatId
      });
      scope.hideModal();
    }

    function handleError(err) {
      $log.error('new chat error ', err);
      $ionicPopup.alert({
        title: err.reason || 'Create chat fail',
        template: 'Please try again',
        okType: 'button-positive button-clear'
      });
    }
  }]);
