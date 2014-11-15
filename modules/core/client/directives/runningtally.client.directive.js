'use strict';

angular.module('core').directive('runningTally', [
	function() {
        function link(scope, element, attrs) {
            
        }

    
		return {
			templateUrl: '',
			restrict: 'E',
            scope: {
                characterTally: '='
            },
			link: link
		};
	}
]);