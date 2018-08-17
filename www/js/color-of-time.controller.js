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
        '$scope'
    ];

    function ColorOfTimeController(
        ColorOfTimeService,
        DefaultService,
        $element,
        $scope
    ) {
        var ColorOfTimeController = this;

        ColorOfTimeController.args = {};

        ColorOfTimeController.styles = '';

        $scope.$watch(
            'increment',
            function(increment) {
                ColorOfTimeController.args.increment = DefaultService.get(increment, 1);
            }.bind(ColorOfTimeController)
        );

        $scope.$watch(
            'skip',
            function(skip) {
                ColorOfTimeController.args.skip = DefaultService.get(skip, 0);
            }.bind(ColorOfTimeController)
        );

        $scope.$watch(
            'style',
            function(style) {
                ColorOfTimeController.styles = DefaultService.get(style, 'background-color').split(',');
            }.bind(ColorOfTimeController)
        );

        $scope.$watch(
            function() {
                return ColorOfTimeController.getColor();
            },
            function(color) {
                ColorOfTimeController.color = color;

                var stylesCount = ColorOfTimeController.styles.length;
                for (var i = 0; i < stylesCount; i++) {
                    var style = ColorOfTimeController.styles[i];

                    $element.css(style, ColorOfTimeController.color);
                }
            },
            true
        );

        ColorOfTimeController.getColor = getColor;
        function getColor() {
            return ColorOfTimeService.getColor(
                ColorOfTimeController.args
            );
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