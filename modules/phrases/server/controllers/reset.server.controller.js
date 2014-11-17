'use strict';

/**
 * Module dependencies.
 */
var _ = require('lodash'),
	path = require('path'),
	mongoose = require('mongoose'),
	Phrase = mongoose.model('Phrase'),
    IconMap = mongoose.model('IconMap'),
    ColorMap = mongoose.model('ColorMap');
    
/**
 * Create a phrase
 */
exports.reset = function(req, res) {
	Phrase.remove({}, function(err){
        IconMap.remove({}, function(err) {
            ColorMap.remove({}, function(err) {
            });
        });
    });

    res.redirect('/');
};

