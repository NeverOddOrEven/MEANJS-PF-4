'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	IconMap = mongoose.model('IconMap');

exports.getIconsForPhrase = function(phrase, cb) {
    /* Client styles must support at least ten colors */
    var AVAILABLE_ICONS = process.env.AVAILABLE_ICONS || 144;

    function updateIconMap(iconMap, phrase) {
        for (var i = 0; i < phrase.length; ++i) {
            var curChar = phrase.charAt(i);

            if (!iconMap[curChar]) {
                iconMap[curChar] = Math.ceil((Math.random() + 0.0001) * AVAILABLE_ICONS);
            }
        }
    }
    
    var promise = IconMap.findOne({}, function(err, doc) {
        if(err)
            console.error('err: ' + err);
        else {
            var iconMap = null;
            
            if (!doc) {
                iconMap = new IconMap({
                    icons: {}
                });
                
                updateIconMap(iconMap.icons, phrase);
                
                iconMap.save(function() {
                    cb(iconMap.icons);
                });
            } else {
                iconMap = doc.icons || {};
                
                updateIconMap(iconMap, phrase);
                IconMap.update({}, { $set: {icons: iconMap}}, {upsert: true}, function(err) {
                    if (err)
                        console.log('Problem updating icon map ' + err);
                    cb(iconMap);
                });
            }
        }
    });
};