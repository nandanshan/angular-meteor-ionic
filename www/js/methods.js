Meteor.methods({

  newChat: function (newChat) {
    // if (! this.userId) {
    //   throw new Meteor.Error('not-logged-in',
    //     'Must be logged to create a chat.');
    // }
    //
    // check(otherId, String);

    // var otherUser = Meteor.users.findOne(otherId);
    // if (! otherUser) {
    //   throw new Meteor.Error('user-not-exists',
    //     'Chat\'s user not exists');
    // }

    var chat = {
      userIds: [newChat.this, newChat.that],
      createdAt: new Date()
    };

    return Chats.insert(chat);
  },
  removeChat(chatId) {
    // if (! this.userId) {
    //   throw new Meteor.Error('not-logged-in',
    //     'Must be logged to create a chat.');
    // }
    //
    // check(chatId, String);

    // var chat = Chats.findOne(chatId);
    // if (! chat || ! _.include(chat.userIds, this.userId)) {
    //   throw new Meteor.Error('chat-not-exists',
    //     'Chat not exists');
    // }

    Messages.remove({ chatId: chatId });
    return Chats.remove({ _id: chatId });
  },

  newUser(user) {
    // check(user, {
    //   name: String,
    //   phone: String
    // });

    var user2 = ChatUsers.findOne({
      phone: user.phone
    });

    if (user2) {
      return user2._id;
    } else {
      return ChatUsers.insert(user);
    }

  },

  newMessage(message) {
    // if (! this.userId) {
    //   throw new Meteor.Error('not-logged-in',
    //     'Must be logged to send a message.');
    // }
    //
    // check(message, {
    //   text: String,
    //   chatId: String
    // });

    message.timestamp = new Date();

    var messageId = Messages.insert(message);
    Chats.update(message.chatId, { $set: { lastMessage: message } });
    return messageId;
  }

});
