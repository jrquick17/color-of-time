(function() {
    'use strict';

    angular.module('ColorOfTimeApp').directive('colorOfTime', ['ColorOfTimeService', function(ColorOfTimeService) {
        return {
            restrict: 'AE',
            replace: true,
            link: function(scope, elem, attrs) {
                elem.css("background-color", ColorOfTimeService.getColor());
            }
        };
    }]);
})();