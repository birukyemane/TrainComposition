'use strict';

/* Controllers */

var trainCompositionControllers = angular.module('trainCompositionControllers', ['ngAnimate', 'ngSanitize', 'ui.bootstrap']);

// Define the `PhoneListController` controller on the `phonecatApp` module
trainCompositionControllers.controller('TrainCompositionController', function TrainCompositionController($scope, $http) {
 
 
  $scope.NumberOfTrains = 0; 
 
  getStations();
 
  
  function getStations (){
     $http.get('https://rata.digitraffic.fi/api/v1/metadata/stations').then(function(response) {
       $scope.states =  response.data.map(function(item){
           return item.stationShortCode;
        });     
       
      }); 
      
  }
  
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
    angular.forEach($scope.trains, function(value, key) {
           var url = urlBase + value.trainNumber + '?' + 'departure_date=' + value.departureDate; 
           $http.get(url).then(function successCallback(response) {
              var index = searchTrain(response.data.trainNumber,$scope.trains);
              $scope.trains[index].composition = response.data;                
            });         
     });     
  }
  
  function searchTrain(nameKey, myArray){
    for (var i=0; i < myArray.length; i++) {
        if (myArray[i].trainNumber === nameKey) {
            return i;
        }
    }
  }  
  
  $scope.search = function(){       
     getTrainNumbers();// get train numbers using the search key             
  }  
  
  $scope.ListWagons = function(wagons){
    var log = [];
    angular.forEach(wagons, function(value, key) {
      this.push(value.wagonType);
    }, log);
      return log.join();    
  }
      
});