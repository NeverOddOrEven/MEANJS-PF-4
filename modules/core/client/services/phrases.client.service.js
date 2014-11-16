'use strict';

//Phrases service used for communicating with the phrases REST endpoints
angular.module('core').factory('Phrases', ['$resource',
	function($resource) {
		return $resource('api/phrases/:phraseId', {
			phraseId: '@_id'
		}, {
			update: {
				method: 'PUT'
			}
		});
	}
]);