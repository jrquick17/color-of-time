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

        ColorOfTimeController.properties = '';

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
            'properties',
            function(properties) {
                ColorOfTimeController.properties = DefaultService.get(properties, 'background-color').split(',');
            }.bind(ColorOfTimeController)
        );

        $scope.$watch(
            function() {
                return ColorOfTimeController.getColor();
            },
            function(color) {
                ColorOfTimeController.color = color;

                var propertiesCount = ColorOfTimeController.properties.length;
                for (var i = 0; i < propertiesCount; i++) {
                    var property = ColorOfTimeController.properties[i];

                    $element.css(property, ColorOfTimeController.color);
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