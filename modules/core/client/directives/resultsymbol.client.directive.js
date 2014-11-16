'use strict';

angular.module('core').directive('resultSymbol', [
	function() {
        function link(scope, element, attrs) {
        }

    
		return {
			templateUrl: 'modules/core/views/directives/resultsymbol.view.html',
			restrict: 'E',
            scope: {
                symbol: '='
            },
			link: link
		};
	}
]);