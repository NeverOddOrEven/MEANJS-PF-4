'use strict';

angular.module('core').directive('phraseEntry', [
	function() {
        function link(scope, element, attrs) {
            scope.SavePhrase = function() {
                scope.save();
            };
        }

    
		return {
			templateUrl: 'modules/core/views/directives/phraseentry.view.html',
			restrict: 'E',
            scope: {
                phrase: '=',
                save: '&'
            },
			link: link
		};
	}
]);