'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

var CharToIconSchema = new Schema({
    char: {
        type: String
    },
    icon: {
        type: Number
    }
});

/**
 * Phrase Schema
 */
var IconMapSchema = new Schema({
	created: {
		type: Date,
		default: Date.now
	},
	content: [CharToIconSchema],
	user: {
		type: Schema.ObjectId,
		ref: 'User'
	}
});

mongoose.model('IconMap', IconMapSchema);