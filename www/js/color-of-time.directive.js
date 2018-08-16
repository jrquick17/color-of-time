(function() {
    'use strict';

    angular.module('color-of-time').directive('colorOfTime', colorOfTime);

    colorOfTime.$inject = [
        'ColorOfTimeService',
        'DefaultService'
    ];

    function colorOfTime(
        ColorOfTimeService,
        DefaultService
    ) {
        return {
            restrict: 'AE',
            replace:  true,
            scope: {
                skip: '=',
                style:     '='
            },
            link: function(scope, elem, attrs) {
                var skip = DefaultService.get(
                    scope.skip,
                    0
                );

                var styles = DefaultService.get(
                    scope.style,
                    'background-color'
                ).split(',');

                var stylesCount = styles.length;
                for (var i = 0; i < stylesCount; i++) {
                    var style = styles[i];

                    elem.css(
                        style,
                        ColorOfTimeService.getColor(skip)
                    );
                }
            }
        };
    }
})();