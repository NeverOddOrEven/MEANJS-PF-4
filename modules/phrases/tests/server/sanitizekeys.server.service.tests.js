'use strict';

/**
 * Module dependencies.
 */
var should = require('should'),
    assert = require('assert'),
    Sanitizer = require('../../server/services/sanitizekeys.server.service');

var key1, key2, key3;

/**
 * Unit tests
 */
describe('User Model Unit Tests:', function() {
	before(function(done) {
		key1 = '.';
        key2 = '$';
        key3 = 'H';

		done();
	});
    
	describe('Dollar sign key', function() {
		it('"$" should map to "dollar"', function(done) {
			Sanitizer.encode('$').should.be.exactly('dollar');
            done();
		});

		it('"dollar" should map to "$"', function(done) {
			Sanitizer.decode('dollar').should.be.exactly('$');
            done();
		});
	});
    
    describe('Period key', function() {
		it('"." should map to "period"', function(done) {
			Sanitizer.encode('.').should.be.exactly('period');
            done();
		});

		it('"period" should map to "."', function(done) {
			Sanitizer.decode('period').should.be.exactly('.');
            done();
		});
	});
    
    describe('Other keys...', function() {
		it('"H" should map to "H"', function(done) {
			Sanitizer.encode('H').should.be.exactly('H');
            done();
		});

		it('"a" should map to "a"', function(done) {
			Sanitizer.decode('a').should.be.exactly('a');
            done();
		});
	});

	after(function(done) {
		done();
	});
});
