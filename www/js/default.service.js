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