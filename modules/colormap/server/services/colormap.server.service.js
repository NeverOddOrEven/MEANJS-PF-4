'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    path = require('path'),
    Sanitizer = require(path.resolve('./modules/phrases/server/services/sanitizekeys.server.service')),
	ColorMap = mongoose.model('ColorMap');

exports.getAllColors = function(cb) {
    ColorMap.findOne({}).lean().exec(function(err, result) {
        cb(result);
    });
};

exports.getColorsForPhrase = function(phrase, cb) {
    /* Client styles must support at least ten colors */
    var AVAILABLE_COLORS = process.env.NUM_AVAILABLE_COLORS || 14;

    function updateColorMap(colorMap, phrase) {
        for (var i = 0; i < phrase.length; ++i) {
            var curChar = Sanitizer.encode(phrase.charAt(i));
            
            if (!colorMap[curChar]) {
                colorMap[curChar] = Math.ceil((Math.random() + 0.0001) * AVAILABLE_COLORS);
            }
        }
    }
    
    ColorMap.findOne({}, function(err, doc) {
        if(err)
            console.error('err: ' + err);
        else {
            var colorMap = null;
            
            if (!doc) {
                colorMap = new ColorMap({
                    colors: {}
                });
                
                updateColorMap(colorMap.colors, phrase);
                
                colorMap.save(function() {
                    cb(colorMap.colors);
                });
            } else {
                colorMap = doc.colors || {};
                
                updateColorMap(colorMap, phrase);

                ColorMap.update({}, { $set: {colors: colorMap}}, {upsert: true}, function(err) {
                    if (err)
                        console.log('Problem updating color map ' + err);
                    
                    cb(colorMap);
                });
            }
        }
    });
};