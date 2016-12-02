angular
  .module('starter')
  .filter('chatPicture', chatPicture);

function chatPicture ($rootScope) {
  var currentUserId = $rootScope.currentUserId;
  return function (chat) {
    if (!chat) return;

    var otherId = _.without(chat.userIds, currentUserId)[0];
    var otherUser = ChatUsers.findOne(otherId);
    var hasPicture = otherUser && otherUser.picture;

    return hasPicture ? otherUser.picture : '/img/user-default.svg';
  }
}
