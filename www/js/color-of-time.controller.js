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