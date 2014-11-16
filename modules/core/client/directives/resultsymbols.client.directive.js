'use strict';

angular.module('core').directive('resultSymbols', [
	function() {
        function link(scope, element, attrs) {
            
        }

		return {
			templateUrl: 'modules/core/views/directives/resultsymbols.view.html',
			restrict: 'E',
            scope: {
                symbols: '='
            },
			link: link
		};
	}
]);