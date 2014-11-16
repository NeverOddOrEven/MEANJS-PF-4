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
                {'char': 'B', 'count' : 10, 'icon': 60}
            ];
            $scope.result = [
                {'char': 'A', 'icon': 10, 'color': '#123456'},
                {'char': 'l', 'icon': 20, 'color': '#345678'},
                {'char': 'e', 'icon': 35, 'color': '#ABC123'},
                {'char': 'x', 'icon': 49, 'color': '#987432'}
            ];
        };
        
        /* Invoked by the directive "phraseentry.client.directive" */
        $scope.SavePhrase = function() {
            console.log('Saving...' + $scope.phrase);
        };
	}
]);