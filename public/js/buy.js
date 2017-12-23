var table = angular.module('table', []);
table.controller('tableCtrl', function($scope, $http) {
    $http.get('/api/Stations').then(successCallback, errorCallback);

    function successCallback(data) {
        if (data.data.length > 1) {
            $scope.Stations = [];
            $scope.Stations.push(data.data);
        } else {
            $scope.Stations = (data.data);
        }
    }

    function errorCallback(error) {
        console.log("Error in getting files");
    }
});