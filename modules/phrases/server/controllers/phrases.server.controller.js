'use strict';

/**
 * Module dependencies.
 */
var _ = require('lodash'),
	path = require('path'),
	mongoose = require('mongoose'),
	Phrase = mongoose.model('Phrase'),
	errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller'));

/**
 * Create a phrase
 */
exports.create = function(req, res) {
	var phrase = new Phrase(req.body);
	phrase.user = req.user;

	phrase.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.json(phrase);
		}
	});
};

/**
 * Show the current phrase
 */
exports.read = function(req, res) {
	res.json(req.phrase);
};

/**
 * Update a phrase
 */
exports.update = function(req, res) {
	var phrase = req.phrase;

	phrase.content = req.body.content;

	phrase.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.json(phrase);
		}
	});
};

/**
 * List of Phrases
 */
exports.list = function(req, res) {
	Phrase.find().sort('-created').populate('user', 'displayName').exec(function(err, phrases) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.json(phrases);
		}
	});
};

/**
 * Phrase middleware
 */
exports.phraseByID = function(req, res, next, id) {
	Phrase.findById(id).populate('user', 'displayName').exec(function(err, phrase) {
		if (err) return next(err);
		if (!phrase) return next(new Error('Failed to load phrase ' + id));
		req.phrase = phrase;
		next();
	});
};