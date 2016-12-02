angular
  .module('starter')
  .filter('chatName', chatName);

function chatName () {
  return function (chat,userId) {
    if (!chat) return;

    var otherId = _.without(chat.userIds, userId)[0];
    var otherUser = ChatUsers.findOne(otherId);
    var hasName = otherUser && otherUser.name;
    return hasName ? otherUser.name : 'PLACE HOLDER';
  }
}
