angular.module('starter')
  .controller("ChatsCtrl", ["$scope", "moment", "$ionicModal", "$ionicPopup", "$stateParams", "$state", "$log", function($scope, moment, $ionicModal, $ionicPopup, $stateParams, $state, $log) {
    var scope = $scope;
    scope.userId = $stateParams.userId;
    if(Meteor.status().connected){
      console.log("online");
      scope.subscribe("chats",function(){
        return [$stateParams.userId,scope.getReactively('$stateParams.userId')]
      });
    }else {
      console.log("offline");
    }
    scope.subscribe('chatusers');
    scope.helpers({
      chats: function() {
        return Chats.find();
      },
      users: function() {
        return ChatUsers.find({
          _id: {
            $ne: scope.userId
          }
        });
      }
    });

    scope.openNewChatModal = openNewChatModal;
    $scope.hideModal = hideModal;
    scope.remove = remove;
    $scope.newChat = newChat;


    $ionicModal.fromTemplateUrl('templates/new-chat.html', {
      scope: $scope
    }).then(function(modal) {
      scope.modal = modal;
    });

    scope.$on('$destroy', function() {
      scope.modal.remove();
    });

    function openNewChatModal() {
      scope.modal.show();
    }

    function hideModal() {
      $scope.modal.hide();
    }

    function newChat(userId) {
      var chat = Chats.findOne({
        userIds: {
          $all: [scope.userId, userId]
        }
      });
      if (chat) {
        scope.goToChat(chat._id);
      } else {

        var newChat = {
          this: scope.userId,
          that: userId
        }
        scope.callMethod('newChat', newChat, function(err, result) {
          if (err) {
            return handleError(err);
          }

          scope.goToChat(result);
        });

      }
    }

    scope.goToChat = function(chatId) {
      $state.go('tab.chat', {
        userId: scope.userId,
        chatId: chatId
      });
      hideModal();
    }

    function remove(chat) {
      scope.callMethod('removeChat', chat._id);
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
