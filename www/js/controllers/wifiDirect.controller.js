angular
  .module('starter')
  .controller('wifiDirectCtrl', wifiDirectCtrl);

function wifiDirectCtrl($scope,$cordovaHotspot) {
  var scope = $scope;
  scope.config = {
    ssid: "skhotspot",
    mode: "Open"
  }

  scope.start = function() {
    $cordovaHotspot.createHotspot(
      $scope.config.ssid, $scope.config.mode,
      function() {
        // delay UI refresh
        console.log("hotspot created");
      },
      function() {
        console.log('Hotspot creation failed');
      }
    );
  };

  scope.stop = function() {
    $cordovaHotspot.stopHotspot(
      function() {
        console.log("hotspot stopped");
      },
      function() {
        console.log('AP disabling failed');
      }
    );
  };

}
