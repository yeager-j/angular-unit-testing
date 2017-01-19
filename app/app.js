/**
 * Created by jacks on 1/19/2017.
 */

angular.module('unit-testing', [])
    .controller('UnitTestController', UnitTestController);

UnitTestController.$inject = ['$rootScope'];
function UnitTestController($rootScope) {
    var vm = this;
    vm.hello = 'Hello, World!';
}