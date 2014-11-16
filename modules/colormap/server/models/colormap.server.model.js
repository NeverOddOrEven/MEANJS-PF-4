'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

var CharToColorSchema = new Schema({
    char: { 
        type: String 
    },
    color: { 
        type: String 
    }
});

/**
 * Phrase Schema
 */
var ColorMapSchema = new Schema({
	created: {
		type: Date,
		default: Date.now
	},
	content: [CharToColorSchema],
	user: {
		type: Schema.ObjectId,
		ref: 'User'
	}
});

mongoose.model('ColorMap', ColorMapSchema);