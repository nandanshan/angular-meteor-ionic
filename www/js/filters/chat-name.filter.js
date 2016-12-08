angular
  .module('starter')
  .filter('chatName', chatName);

function chatName () {
  return function (chat) {
    if (!chat) return;

    var otherId = _.without(chat.userIds, Meteor.userId())[0];
    var otherUser = Meteor.users.findOne(otherId);
    var hasName = otherUser && otherUser.username;
    return hasName ? otherUser.username : 'PLACE HOLDER';
  }
}
