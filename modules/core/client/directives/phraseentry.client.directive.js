'use strict';

angular.module('core').directive('phraseEntry', [
	function() {
        function link(scope, element, attrs) {
        }

    
		return {
			templateUrl: 'modules/core/views/directives/phraseentry.view.html',
			restrict: 'E',
            scope: {
                phrase: '='
            },
			link: link
		};
	}
]);