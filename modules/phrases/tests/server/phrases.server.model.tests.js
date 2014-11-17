'use strict';

/**
 * Module dependencies.
 */
var should = require('should'),
	mongoose = require('mongoose'),
	Phrase = mongoose.model('Phrase');

/**
 * Globals
 */
var phrase, phrase2;

/**
 * Unit tests
 */
describe('Phrase Model Unit Tests:', function() {
	before(function(done) {
		phrase = new Phrase({
			content: '1234567890'
		});

		done();
	});

	describe('Method Save', function() {
		it('should begin with no phrases', function(done) {
			Phrase.find({}, function(err, phrases) {
				phrases.should.have.length(0);
				done();
			});
		});

		it('should be able to save without problems', function(done) {
			phrase.save(done);
		});

	});

	after(function(done) {
		Phrase.remove().exec();
		done();
	});
});
