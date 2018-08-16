(function() {
    'use strict';

})();
(function() {
    'use strict';

    angular.module('color-of-time', []);
})();
(function() {
    'use strict';

    angular.module('color-of-time').controller(
        'ColorOfTimeController',
        ColorOfTimeController
    );

    ColorOfTimeController.$inject = [
        'ColorOfTimeService',
        '$scope'
    ];

    function ColorOfTimeController(
        ColorOfTimeService,
        $scope
    ) {
        var ColorOfTimeController = this;

        $scope.$watch(
            function() {
                return ColorOfTimeService.getColor(1);
            },
            function(color) {
                ColorOfTimeController.color = color;
            }
        );

        ColorOfTimeController.reset = reset;
        function reset() {
            ColorOfTimeController.color = '#FFFFFF';
        }

        ColorOfTimeController.init = init;
        function init() {
            ColorOfTimeController.reset();
        }

        ColorOfTimeController.init();
    }
})();
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
(function() {
    'use strict';

    angular.module('color-of-time').service('ColorOfTimeService', ColorOfTimeService);

    function ColorOfTimeService() {
        var ColorOfTimeService = this;

        ColorOfTimeService.getColor = function() {
            var remainingPercent = ColorOfTimeService._getRemainingDayPercent();

            return ColorOfTimeService._getColorPercent(remainingPercent);
        };

        ColorOfTimeService._getColorPercent = _getColorPercent;
        function _getColorPercent(percent) {
            var red = 0;
            var green = 0;
            var blue = 0;

            if (percent < 0.17) {
                red = 1;
                green = percent / 0.17;
                blue = 0;
            } else if (percent < 0.34) {
                red = 1 - ((percent - 0.17) / 0.17);
                green = 1;
                blue = 0;
            } else if (percent < 0.51) {
                red = 0;
                green = 1;
                blue = (percent - 0.34) / 0.17;
            } else if (percent < 0.68) {
                red = 0;
                green = 1 - ((percent - 0.51) / 0.17);
                blue = 1;
            } else if (percent < 0.85) {
                red = (percent - 0.68) / 0.17;
                green = 0;
                blue = 1;
            } else if (percent <= 1) {
                red = 1;
                green = 0;
                blue = 1 - ((percent - 0.85) / 0.15);
            }

            return ColorOfTimeService._toHexadecimal(red, blue, green);
        }

        ColorOfTimeService._getRemainingDayPercent = _getRemainingDayPercent;
        function _getRemainingDayPercent() {
            var date = new Date();

            var hour = (date.getHours() * 60 * 60 + date.getMinutes() * 60 + date.getSeconds()) / 86400;

            return hour % 1;
        }

        ColorOfTimeService._toHexadecimal = _toHexadecimal;
        function _toHexadecimal(red, blue, green) {
            red = _to255(red, blue, green);
            green = _to255(green);
            blue = _to255(blue);

            if (red.length === 1) {
                red = "0".concat(red);
            }
            if (green.length === 1) {
                green = "0".concat(green);
            }
            if (blue.length === 1) {
                blue = "0".concat(blue);
            }

            return "#" + red.concat(green).concat(blue).toUpperCase();
        }

        ColorOfTimeService._to255 = _to255;
        function _to255(value) {
            return Math.floor(value * 255).toString(16);
        }
    }
})();