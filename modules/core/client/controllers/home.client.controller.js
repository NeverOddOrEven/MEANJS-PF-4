'use strict';

angular.module('core').controller('HomeController', ['$scope', 'Authentication',
	function($scope, Authentication) {
		// This provides Authentication context.
		$scope.authentication = Authentication;
        
        $scope.init = function() {
            $scope.phrase = '';
            $scope.tallies = [
                {'char': 'a', 'count': 5, 'icon': 10}, 
                {'char': 'A', 'count': 3, 'icon': 20}, 
                {'char': 'B', 'count' : 10, 'icon': 35},
                {'char': 'a', 'count': 5, 'icon': 40}, 
                {'char': 'A', 'count': 3, 'icon': 55}, 
                {'char': 'B', 'count' : 10, 'icon': 60},
            ];
        };
	}
]);