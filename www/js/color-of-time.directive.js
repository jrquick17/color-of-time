(function() {
    'use strict';

    angular.module('color-of-time').directive('colorOfTime', colorOfTime);

    function colorOfTime() {
        return {
            controller: 'ColorOfTimeController',
            controllerAs: 'ctrl',
            restrict: 'AE',
            replace:  false,
            scope: {
                increment:  '=',
                rate:       '=',
                properties: '=',
                skip:       '='
            },
            template: ''
        };
    }
})();