'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	ColorMap = mongoose.model('ColorMap');


exports.getColorsForPhrase = function(phrase, cb) {
    /* Client styles must support at least ten colors */
    var AVAILABLE_COLORS = process.env.AVAILABLE_COLORS || 14;

    function updateColorMap(colorMap, phrase) {
        for (var i = 0; i < phrase.length; ++i) {
            var curChar = phrase.charAt(i);

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