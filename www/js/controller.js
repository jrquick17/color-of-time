colorOfTime.controller('ColorOfTimeController', ['ColorOfTimeService', '$scope', function(ColorOfTimeService, $scope) {
    $scope.color = '#FFFFFF';

    $scope.$watch(
        function() {
            return ColorOfTimeService.getColor(1);
        },
        function(color) {
            $scope.color = color;
        }
    );

    /**
     * Get the current time's color
     *
     * @returns {string|*}
     */
    this.getColor = function() {
        return $scope.color;
    }
}]);