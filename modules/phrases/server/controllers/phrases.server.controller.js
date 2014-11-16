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
                        result.push({
                            char: phrase.content[i],
                            icon: icons[phrase.content[i]],
                            color: colors[phrase.content[i]]   
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
                    var char = counts[i]._id[0];
                    var icon = iconsResult.icons[char];
                    var color = colorsResult.colors[char];
                    result.push({
                        char: char,
                        icon: icon,
                        color: color
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