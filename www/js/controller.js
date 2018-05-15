(function() {
    'use strict';

    angular.module('ColorOfTimeApp').controller(
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

        $scope.color = '#FFFFFF';

        $scope.$watch(
            function () {
                return ColorOfTimeService.getColor(1);
            },
            function (color) {
                $scope.color = color;
            }
        );

        /**
         * Get the current time's color
         *
         * @returns {string|*}
         */
        this.getColor = function () {
            return $scope.color;
        }
    }
})();