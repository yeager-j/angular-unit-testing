/**
 * Created by jacks on 1/19/2017.
 */

describe('Unit Testing', function () {
    beforeEach(module('unit-testing'));

    describe('Main Controller', function () {
        var ctrl;

        beforeEach(inject(function ($controller) {
            ctrl = $controller('UnitTestController', {});
        }));

        afterEach(function () {
            // Cleanup code
        });

        it('should init a variable called "hello"', function () {
            expect(ctrl.hello).toBeDefined();
            expect(ctrl.hello).toBe('Hello, World!');
        })
    })
});