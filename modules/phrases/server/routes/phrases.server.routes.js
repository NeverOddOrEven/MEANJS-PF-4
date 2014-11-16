'use strict';

/**
 * Module dependencies.
 */
var phrasesPolicy = require('../policies/phrases.server.policy'),
	phrases = require('../controllers/phrases.server.controller');

module.exports = function(app) {
	// Phrases collection routes
	app.route('/api/phrases').all(phrasesPolicy.isAllowed)
		.get(phrases.list)
		.post(phrases.create);

    // Summary statistics
    app.route('/api/phrases/charactertallies').all(phrasesPolicy.isAllowed)
        .get(phrases.characterTallies);
    
	// Single phrase routes
	app.route('/api/phrases/:phraseId').all(phrasesPolicy.isAllowed)
		.get(phrases.read);

	// Finish by binding the phrase middleware
	app.param('phraseId', phrases.phraseByID);
};