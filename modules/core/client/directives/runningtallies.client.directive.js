'use strict';

angular.module('core').directive('runningTallies', [
	function() {
        function link(scope, element, attrs) {
            
        }

    
		return {
			templateUrl: '',
			restrict: 'E',
            scope: {
                characterTallies: '='
            },
			link: link
		};
	}
]);