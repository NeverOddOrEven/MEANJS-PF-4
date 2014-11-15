'use strict';

angular.module('core').controller('HomeController', ['$scope', 'Authentication',
	function($scope, Authentication) {
		// This provides Authentication context.
		$scope.authentication = Authentication;
        
        $scope.init = function() {
            $scope.phrase = '';
            $scope.tallies = [{'a': 5}, {'A': 3}, {'B': 10}];
        };
	}
]);