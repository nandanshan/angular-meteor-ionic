angular
  .module('starter')
  .filter('chatPicture', chatPicture);

function chatPicture () {
  return function (chat) {
    if (!chat) return;

    var otherId = _.without(chat.userIds, Meteor.userId())[0];
    var otherUser = Meteor.users.findOne(otherId);
    var hasPicture = otherUser && otherUser.picture;
    return hasPicture ? otherUser.picture : '/img/user-default.svg';
  }
}
