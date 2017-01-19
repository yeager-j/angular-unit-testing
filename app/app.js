/**
 * Created by jacks on 1/19/2017.
 */

angular.module('unit-testing', [])
    .controller('UnitTestController', UnitTestController);

UnitTestController.$inject = ['$http'];
function UnitTestController($http) {
    var vm = this;

    vm.title = 'Angular Unit Testing';
    vm.apiKey = 'c9f1140b11ead40a9c2b78dfe2c61776';
    vm.destinations = [];
    vm.newDestination = {
        city: undefined,
        country: undefined
    };

    vm.addDestination = function () {
        vm.destinations.push({
            city: vm.newDestination.city,
            country: vm.newDestination.country
        });
    };

    vm.removeDestination = function (index) {
        vm.destinations.splice(index, 1);
    };

    vm.getWeather = function (destination) {
        $http.get('http://api.openweathermap.org/data/2.5/weather?q=' + destination.city + '&appid=' + vm.apiKey)
            .then(function success(response) {
                if (response.data.weather) {
                    destination.weather = {};
                    destination.weather.main = response.data.weather[0].main;
                    destination.weather.temp = kelvinToCelsius(response.data.main.temp);
                }
            }, function failure(response) {
                vm.title += ' - Error fetching weather data. Error: ' + response;
            })
    };

    function kelvinToCelsius(temp) {
        return Math.round(temp - 273);
    }
}