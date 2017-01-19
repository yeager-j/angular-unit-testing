/**
 * Created by jacks on 1/19/2017.
 */

describe('Unit Testing', function () {
    beforeEach(module('unit-testing'));

    describe('Main Controller', function () {
        var ctrl, httpBackend;

        beforeEach(inject(function ($controller, $httpBackend) {
            ctrl = $controller('UnitTestController', {});
            httpBackend = $httpBackend;
        }));

        afterEach(function () {
            httpBackend.verifyNoOutstandingExpectation();
            httpBackend.verifyNoOutstandingRequest();
        });

        it('should init a variable called "title"', function () {
            expect(ctrl.title).toBeDefined();
            expect(ctrl.title).toBe('Angular Unit Testing');
        });

        it('should add 2 destinations to the list', function () {
            expect(ctrl.destinations).toBeDefined();
            expect(ctrl.destinations.length).toBe(0);

            ctrl.newDestination = {
                city: "London",
                country: "England"
            };

            ctrl.addDestination();

            expect(ctrl.destinations.length).toBe(1);
            expect(ctrl.destinations[0].city).toBe('London');
            expect(ctrl.destinations[0].country).toBe('England');

            ctrl.newDestination = {
                city: "Athens",
                country: "Greece"
            };

            ctrl.addDestination();

            expect(ctrl.destinations.length).toBe(2);
            expect(ctrl.destinations[0].city).toBe('London');
            expect(ctrl.destinations[0].country).toBe('England');
            expect(ctrl.destinations[1].city).toBe('Athens');
            expect(ctrl.destinations[1].country).toBe('Greece');
        });

        it('should remove a destination from the destinations list', function () {
            ctrl.destinations = [
                {
                    city: "London",
                    country: "England"
                },
                {
                    city: "Paris",
                    country: "France"
                }
            ];

            expect(ctrl.destinations).toBeDefined();
            expect(ctrl.destinations.length).toBe(2);

            ctrl.removeDestination(0);

            expect(ctrl.destinations.length).toBe(1);
            expect(ctrl.destinations[0].city).toBe("Paris");
        });

        it('should update the weather for a specific destination', function () {
            ctrl.destination = {
                city: 'Atlanta',
                country: 'USA'
            };

            httpBackend.expectGET('http://api.openweathermap.org/data/2.5/weather?q=' + ctrl.destination.city + '&appid=' + ctrl.apiKey)
                .respond({
                    weather: [{main: 'Rain', detail: 'Light rain'}],
                    main: {temp: 288}
                });
            ctrl.getWeather(ctrl.destination);
            httpBackend.flush();

            expect(ctrl.destination.weather.main).toBe('Rain');
            expect(ctrl.destination.weather.temp).toBe(15);
        })
    })
});