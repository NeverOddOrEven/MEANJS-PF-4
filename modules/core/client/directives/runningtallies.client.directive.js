'use strict';

angular.module('core').directive('runningTallies', [
	function() {
        function link(scope, element, attrs) {
            
        }

    
		return {
			templateUrl: 'modules/core/views/directives/runningtallies.view.html',
			restrict: 'E',
            scope: {
                tallies: '='
            },
			link: link
		};
	}
]);