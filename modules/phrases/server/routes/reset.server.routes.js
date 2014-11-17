'use strict';

/**
 * Module dependencies.
 */
var reset = require('../controllers/reset.server.controller');

module.exports = function(app) {
	// Phrases collection routes
	app.route('/api/reset')
		.get(reset.reset);
};