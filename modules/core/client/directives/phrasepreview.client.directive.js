'use strict';

angular.module('core').directive('phrasePreview', [
	function() {
        function link(scope, element, attrs) {
            
        }

    
		return {
			templateUrl: '',
			restrict: 'E',
            scope: {
                phrase: '='
            },
			link: link
		};
	}
]);