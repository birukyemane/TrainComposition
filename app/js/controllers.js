'use strict';

/* Controllers */

var trainCompositionControllers = angular.module('trainCompositionControllers', []);

// Define the `PhoneListController` controller on the `phonecatApp` module
trainCompositionControllers.controller('TrainCompositionController', function TrainCompositionController($scope, $http) {
 
 
  $scope.NumberOfTrains = 0; 
  
  function getTrainNumbers(){
    // use url variable 
      $http.get('https://rata.digitraffic.fi/api/v1/live-trains?station=' + $scope.stationCode).then(function(response) {
        $scope.trains = response.data; 
        $scope.NumberOfTrains = $scope.trains.length;
        getCompositions();      
      });       
  }
  
  function getCompositions(){  
    var urlBase = 'https://rata.digitraffic.fi/api/v1/compositions/'; 
    $scope.compositions = [];
    angular.forEach($scope.trains, function(value, key) {
           var url = urlBase + value.trainNumber + '?' + 'departure_date=' + value.departureDate; 
           $http.get(url).then(function(response) {
              $scope.compositions.push(response.data);              
            });         
     });     
  }
  
  $scope.search = function(){       
     getTrainNumbers();// get train numbers using the search key             
  }  
       
});