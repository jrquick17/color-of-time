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
            scope: {
                style: '='
            },
            link: function(scope, elem, attrs) {
                var styles = [
                    'background-color'
                ];

                if (typeof scope.style !== 'undefined') {
                    styles = scope.style.split(',');
                }

                var stylesCount = styles.length;
                for (var i = 0; i < stylesCount; i++) {
                    var style = styles[i];

                    elem.css(
                        style,
                        ColorOfTimeService.getColor()
                    );
                }
            }
        };
    }
})();