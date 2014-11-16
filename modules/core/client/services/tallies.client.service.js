'use strict';

//Tallies service used for communicating with the phrases REST endpoints
angular.module('core').factory('Tallies', ['$resource',
	function($resource) {
		return $resource('api/phrases/charactertallies', {
		}, {
            
		});
	}
]);