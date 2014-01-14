'use strict';

/* App Module */

var app = angular.module("hotdishSidebar",[]);

function hotdishController($scope, Phone) {
  $scope.messages = [];
  $scope._mess = [];
  $scope.peers = [];
  $scope.$on("outsideMessage",function(){
  	// $broadcasts?  tons of logic here, atm
  	console.log("got an outside message!");
  	$scope.$apply();
  })

  $scope.msgPause = function() { console.log("PAUSING"); $scope.msgpaused = true }
  $scope.msgResume = function() { $scope.msgpaused = false }

  $scope.$watch("msgpaused", function(oldval,newval){
    console.log("msgpaused watcher",oldval,newval)
    if (!newval) {
      $scope.messages.length=0;
      Array.prototype.push.apply($scope.messages, $scope._mess);
    }
  },true);
  $scope.msgpaused = false;

  // we would need to make a new directive based on ng repeat
  // called like 'ng-repeat-pausible' or something.
  // Orrrr, have _messages and messages, and not allow
  // i.e., this should 'pause' on hover, and 'unpause' off-hover



  $scope.$watch("_mess", function(oldval,newval){
    if ($scope.msgpaused) { console.log("paused!"); return false}
    else {
      console.log("setting!");
      $scope.messages.length=0;
      Array.prototype.push.apply($scope.messages, $scope._mess);
    }
  },true);

}
hotdishController.$inject = ['$scope'];


app.directive('peer', function() {
    return {
        restrict: 'E',
        templateUrl: 'templates/peer.html',
        replace: true,
        // pass these two names from attrs into the template scope
        scope: {
            caption: '@',
            photoSrc: '@'
        }
    }
})


app.directive('message', function() {
    return {
        restrict: 'E',
        templateUrl: 'templates/message.html',
        replace: true,
        // pass these two names from attrs into the template scope
        scope: {
            message: '@',
        }
    }
})


app.directive('photo', function() {
    return {
        restrict: 'E',
        templateUrl: 'photo.html',
        replace: true,
        // pass these two names from attrs into the template scope
        scope: {
            caption: '@',
            photoSrc: '@'
        }
    }
})
