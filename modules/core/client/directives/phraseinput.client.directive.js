'use strict';

angular.module('core').directive('phraseInput', [
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