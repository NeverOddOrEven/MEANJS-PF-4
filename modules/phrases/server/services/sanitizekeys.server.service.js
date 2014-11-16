'use strict';

exports.encode = function(plainKey) {
    if (plainKey === '.')
        return 'period';
    
    if (plainKey === '$')
        return 'dollar';
                            
    return plainKey;
};

exports.decode = function(encodedKey) {
    if (encodedKey === 'period')
        return '.';
    
    if (encodedKey === 'dollar')
        return '$';
    
    return encodedKey;
};