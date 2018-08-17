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
        'DefaultService',
        '$element',
        '$scope',
        '$interval'
    ];

    function ColorOfTimeController(
        ColorOfTimeService,
        DefaultService,
        $element,
        $scope,
        $interval
    ) {
        var ColorOfTimeController = this;

        ColorOfTimeController.args = {};

        ColorOfTimeController.properties = '';

        $scope.$watch(
            'increment',
            function(increment) {
                ColorOfTimeController.args.increment = DefaultService.get(increment, 1);
            }.bind(ColorOfTimeController)
        );

        $scope.$watch(
            'properties',
            function(properties) {
                ColorOfTimeController.properties = DefaultService.get(properties, 'background-color').split(',');
            }.bind(ColorOfTimeController)
        );

        $scope.$watch(
            'rate',
            function(rate) {
                ColorOfTimeController.rate = DefaultService.get(rate, 1000);
            }.bind(ColorOfTimeController)
        );

        $scope.$watch(
            'skip',
            function(skip) {
                ColorOfTimeController.args.skip = DefaultService.get(skip, 0);
            }.bind(ColorOfTimeController)
        );

        $interval(
            function() {
                ColorOfTimeController.getColor();
            },
            ColorOfTimeController.rate
        );

        ColorOfTimeController.getColor = getColor;
        function getColor() {
            var color = ColorOfTimeService.getColor(
                ColorOfTimeController.args
            );

            ColorOfTimeController.setColor(color);

            return color;
        }

        ColorOfTimeController.setColor = setColor;
        function setColor(color) {
            ColorOfTimeController.color = color;

            var propertiesCount = ColorOfTimeController.properties.length;
            for (var i = 0; i < propertiesCount; i++) {
                var property = ColorOfTimeController.properties[i];

                $element.css(property, ColorOfTimeController.color);
            }
        }

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
(function() {
    'use strict';

    angular.module('color-of-time').service('ColorOfTimeService', ColorOfTimeService);

    ColorOfTimeService.$inject = [
        'DefaultService'
    ];

    function ColorOfTimeService(
        DefaultService
    ) {
        var SECONDS_PER_DAY = 86400;

        var ColorOfTimeService = this;

        ColorOfTimeService.getColor = function(args) {
            var remainingPercent = ColorOfTimeService._getRemainingDayPercent(args);

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
        function _getRemainingDayPercent(args) {
            var increment = DefaultService.get(
                args.increment,
                1
            );

            var skip = DefaultService.get(
                args.skip,
                0
            );

            var date = new Date();

            var minutes = date.getHours() * 60;
            var seconds = date.getMinutes() * 60 + minutes;

            seconds += date.getSeconds();
            seconds *= increment;

            if (typeof skip === 'number') {
                seconds += skip;
            }

            if (seconds > SECONDS_PER_DAY) {
                seconds -= SECONDS_PER_DAY;
            }

            var percent = seconds / SECONDS_PER_DAY;

            return percent % 1;
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
(function() {
    'use strict';

    angular.module('color-of-time').service('DefaultService', DefaultService);

    function DefaultService() {
        var DefaultService = this;

        DefaultService.get = get;
        function get(alpha, beta) {
            if (typeof alpha !== 'undefined') {
                return alpha;
            } else if (typeof beta !== 'undefined') {
                return beta;
            } else {
                return false;
            }
        }
    }
})();