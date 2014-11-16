'use strict';

angular.module('core').controller('HomeController', ['$scope', 'Authentication',
	function($scope, Authentication) {
		// This provides Authentication context.
		$scope.authentication = Authentication;
        
        $scope.init = function() {
            $scope.phrase = '';
            $scope.tallies = [
                {'char': 'a', 'count': 5, 'icon': 1}, 
                {'char': 'A', 'count': 3, 'icon': 2}, 
                {'char': 'B', 'count' : 10, 'icon': 3}
            ];
        };
	}
]);