'use strict';

angular.module('core').directive('runningTally', [
	function() {
        function link(scope, element, attrs) {
            
        }

    
		return {
			templateUrl: 'modules/core/views/directives/runningtally.view.html',
			restrict: 'E',
            scope: {
                characterTally: '='
            },
			link: link
		};
	}
]);