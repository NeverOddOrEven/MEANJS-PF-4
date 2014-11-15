'use strict';

angular.module('core').directive('phrasePreview', [
	function() {
        function link(scope, element, attrs) {
            
        }

		return {
			templateUrl: 'modules/core/views/directives/phrasepreview.view.html',
			restrict: 'E',
            scope: {
                phrase: '='
            },
			link: link
		};
	}
]);