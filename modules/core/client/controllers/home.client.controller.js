'use strict';

angular.module('core').controller('HomeController', ['$scope', 'Authentication', 'Phrases',
	function($scope, Authentication, Phrases) {
		// This provides Authentication context.
		$scope.authentication = Authentication;
        
        $scope.$watch('result', function() {
            // Update the tallies

        });
        
        $scope.init = function() {
            $scope.phrase = '';
            $scope.tallies = [];
            $scope.result = {};
        };
        
        /* Invoked by the directive "phraseentry.client.directive" */
        $scope.SavePhrase = function() {
            var phrase = new Phrases({
                content: $scope.phrase
            });
            
            phrase.$save(function(response) {
                $scope.result = response.symbols;
			}, function(errorResponse) {
				console.error(errorResponse.data.message);
			});
        };
	}
]);