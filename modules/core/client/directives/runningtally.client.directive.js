'use strict';

angular.module('core').directive('runningTally', [
	function() {
        function link(scope, element, attrs) {
            console.log(scope.tally);
        }

    
		return {
			templateUrl: 'modules/core/views/directives/runningtally.view.html',
			restrict: 'E',
            scope: {
                tally: '='
            },
			link: link
		};
	}
]);