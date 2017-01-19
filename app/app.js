/**
 * Created by jacks on 1/19/2017.
 */

angular.module('unit-testing', [])
    .controller('UnitTestController', UnitTestController)
    .filter('warmestDestinations', WarmestDestinationsFilter);

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

                vm.error = '';
            }, function failure(response) {
                vm.error = 'Error fetching weather data for that city.';
            })
    };

    function kelvinToCelsius(temp) {
        return Math.round(temp - 273);
    }
}

function WarmestDestinationsFilter() {
    return function (destinations, minTemp) {
        var warmDestinations = [];

        angular.forEach(destinations, function (destination) {
            if (destination.weather && destination.weather.temp && destination.weather.temp > minTemp) {
                warmDestinations.push(destination);
            }
        });

        return warmDestinations;
    }
}