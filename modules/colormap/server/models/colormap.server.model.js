'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * Phrase Schema
 */
var ColorMapSchema = new Schema({
	created: {
		type: Date,
		default: Date.now
	},
	colors: {
    },
	user: {
		type: Schema.ObjectId,
		ref: 'User'
	}
});

mongoose.model('ColorMap', ColorMapSchema);