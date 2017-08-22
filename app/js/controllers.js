'use strict';

/* Controllers */

var trainCompositionControllers = angular.module('trainCompositionControllers', []);

// Define the `PhoneListController` controller on the `phonecatApp` module
trainCompositionControllers.controller('TrainCompositionController', function TrainCompositionController($scope) {
  $scope.trains = [
    {
      trainType: 'S',
      trainNumber: '967'
    }, {
      trainType: 'IC',
      trainNumber: '962'
    }
  ];
});