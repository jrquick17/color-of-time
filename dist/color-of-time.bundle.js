(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
(function () {
    'use strict';
})();
(function () {
    'use strict';

    angular.module('color-of-time', []);
})();
(function () {
    'use strict';

    angular.module('color-of-time').controller('ColorOfTimeController', ColorOfTimeController);

    ColorOfTimeController.$inject = ['ColorOfTimeService', '$scope'];

    function ColorOfTimeController(ColorOfTimeService, $scope) {
        var ColorOfTimeController = this;

        $scope.$watch(function () {
            return ColorOfTimeService.getColor(1);
        }, function (color) {
            ColorOfTimeController.color = color;
        });

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
(function () {
    'use strict';

    angular.module('color-of-time').directive('colorOfTime', colorOfTime);

    colorOfTime.$inject = ['ColorOfTimeService'];

    function colorOfTime(ColorOfTimeService) {
        return {
            restrict: 'AE',
            replace: true,
            link: function (scope, elem, attrs) {
                elem.css('background-color', ColorOfTimeService.getColor());
            }
        };
    }
})();
(function () {
    'use strict';

    angular.module('color-of-time').service('ColorOfTimeService', ColorOfTimeService);

    function ColorOfTimeService() {
        var ColorOfTimeService = this;

        ColorOfTimeService.getColor = function (speed) {
            if (typeof speed === 'undefined') {
                speed = 1;
            }

            //Calculate % of day already passed
            var date = new Date();
            var hour = (date.getHours() * 60 * 60 + date.getMinutes() * 60 + date.getSeconds()) / 86400;
            hour = hour * speed % 1;

            //Calculate color value [0-255] based on the time
            var red = 0;
            var green = 0;
            var blue = 0;

            if (hour < 0.17) {
                red = 1;
                green = hour / 0.17;
                blue = 0;
            } else if (hour < 0.34) {
                red = 1 - (hour - 0.17) / 0.17;
                green = 1;
                blue = 0;
            } else if (hour < 0.51) {
                red = 0;
                green = 1;
                blue = (hour - 0.34) / 0.17;
            } else if (hour < 0.68) {
                red = 0;
                green = 1 - (hour - 0.51) / 0.17;
                blue = 1;
            } else if (hour < 0.85) {
                red = (hour - 0.68) / 0.17;
                green = 0;
                blue = 1;
            } else if (hour <= 1) {
                red = 1;
                green = 0;
                blue = 1 - (hour - 0.85) / 0.15;
            }

            //Convert color value [0-255] to hexadecimal
            red = Math.floor(red * 255).toString(16);
            green = Math.floor(green * 255).toString(16);
            blue = Math.floor(blue * 255).toString(16);
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
        };
    }
})();

},{}]},{},[1]);

//# sourceMappingURL=color-of-time.bundle.js.map
