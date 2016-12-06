angular.module('starter')
  .config(config);

function config($stateProvider, $urlRouterProvider) {
  $stateProvider
    .state('tab', {
      url: '/tab',
      abstract: true,
      templateUrl: 'templates/tabs.html'
    })
    .state('tab.chats', {
      cache: false,
      url: '/chats',
      views: {
        'tab-chats': {
          templateUrl: 'templates/chats.html',
          controller: 'ChatsCtrl'
        }
      },
      params: {
        userId: null
      },
      resolve: {
        login: function($auth) {
          return $auth.requireUser();
        }
      }
    })
    .state('tab.chat', {
      // cache:false,
      url: '/chat',
      views: {
        'tab-chats': {
          templateUrl: 'templates/chat.html',
          controller: 'ChatCtrl'
        }
      },
      params: {
        userId: null,
        chatId: null
      }
    })
    .state('login', {
      url: '/login',
      cache: false,
      templateUrl: 'templates/login.html',
      controller: 'loginCtrl'
    })
    .state('tab.settings', {
      url: '/settings',
      views: {
        'tab-settings': {
          templateUrl: 'templates/tab-settings.html',
          controller: 'SettingsCtrl'
        }
      }
    });



  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/login');
}
