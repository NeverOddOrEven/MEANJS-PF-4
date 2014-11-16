'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * Phrase Schema
 */
var IconMapSchema = new Schema({
	created: {
		type: Date,
		default: Date.now
	},
	icons: {
    },
	user: {
		type: Schema.ObjectId,
		ref: 'User'
	}
});

mongoose.model('IconMap', IconMapSchema);