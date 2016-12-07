angular
  .module('starter')
  .controller('SettingsCtrl', SettingsCtrl);

function SettingsCtrl($scope, $state, $ionicPopup, $log) {
  $scope.logout = logout;

  function logout() {
    localforage.clear();
    Meteor.logout();
    $state.go('login');
  }
}
