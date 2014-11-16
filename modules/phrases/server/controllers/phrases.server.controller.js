'use strict';

/**
 * Module dependencies.
 */
var _ = require('lodash'),
	path = require('path'),
	mongoose = require('mongoose'),
	Phrase = mongoose.model('Phrase'),
    IconMap = require(path.resolve('./modules/iconmap/server/services/iconmap.server.service')),
    ColorMap = require(path.resolve('./modules/colormap/server/services/colormap.server.service')),
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
            IconMap.getIconsForPhrase(phrase.content, function(icons) {
                ColorMap.getColorsForPhrase(phrase.content, function(colors) {
                    var result = [];

                    for (var i = 0; i < phrase.content.length; ++i) {
                        var key = phrase.content[i];
                        
                        // TODO: refactor into an escape service
                        if (key === '.')
                            key = 'period';
                        if (key === '$')
                            key = 'dollar';
                            
                        result.push({
                            char: phrase.content[i],
                            icon: icons[key],
                            color: colors[key]   
                        });
                    }
                    res.json({symbols: result});
                });
            });
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

exports.characterTallies = function(req, res) {
    var mapReduceOptions = {
        map: function() {
            for (var i = 0; i < this.content.length; ++i) {
                emit(this.content.charAt(i), 1); // jshint ignore:line
            }
        },
        reduce: function(k, vals) {
            return vals.length;
        }
    };
    
    var results = Phrase.mapReduce(mapReduceOptions);
    
    results.then(function(model, stats) {
        return model.sort('field _id');
    }).then(function(counts) {
        IconMap.getAllIcons(function(iconsResult) {
            ColorMap.getAllColors(function(colorsResult) {
                var result = [];
                for (var i = 0; i < counts.length; ++i) {
                    var char = counts[i]._id;
                    
                    var key = char;
                    if (char === '.') 
                        key = 'period';
                    if (char === '$')
                        key = 'dollar';
                    
                    var icon = iconsResult.icons[key];
                    var color = colorsResult.colors[key];
                    var count = counts[i].value;
                    
                    result.push({
                        char: char,
                        icon: icon,
                        color: color,
                        count: count
                    });
                }
                
                res.json({tallies: result});
            });
        });
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