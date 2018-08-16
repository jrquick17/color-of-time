(function() {
    'use strict';

    angular.module('color-of-time').directive('colorOfTime', colorOfTime);

    colorOfTime.$inject = [
        'ColorOfTimeService'
    ];

    function colorOfTime(
        ColorOfTimeService
    ) {
        return {
            restrict: 'AE',
            replace:  true,
            link: function(scope, elem, attrs) {
                elem.css(
                    'background-color',
                    ColorOfTimeService.getColor()
                );
            }
        };
    }
})();