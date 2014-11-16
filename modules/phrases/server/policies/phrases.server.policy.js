'use strict';

/**
 * Module dependencies.
 */
var acl = require('acl');

// Using the memory backend
acl = new acl(new acl.memoryBackend());

/**
 * Invoke Phrases Permissions
 */
exports.invokeRolesPolicies = function() {
	acl.allow([{
		roles: ['admin'],
		allows: [{
			resources: '/api/phrases',
			permissions: '*'
		}, {
			resources: '/api/phrases/:phraseId',
			permissions: '*'
		}, {
            resources: '/api/phrases/charactertallies',
			permissions: ['get']
        }]
	}, {
		roles: ['user'],
		allows: [{
			resources: '/api/phrases',
			permissions: ['get', 'post']
		}, {
			resources: '/api/phrases/:phraseId',
			permissions: ['get']
		}, {
            resources: '/api/phrases/charactertallies',
			permissions: ['get']
        }]
	}, {
		roles: ['guest'],
		allows: [{
			resources: '/api/phrases',
			permissions: ['get', 'post']
		}, {
			resources: '/api/phrases/:phraseId',
			permissions: ['get']
		}, {
            resources: '/api/phrases/charactertallies',
			permissions: ['get']
        }]
	}]);
};

/**
 * Check If Phrases Policy Allows
 */
exports.isAllowed = function(req, res, next) {
	var roles = (req.user) ? req.user.roles : ['guest'];

	// If an phrase is being processed and the current user created it then allow any manipulation
	if (req.phrase && req.user && req.phrase.user.id === req.user.id) {
		return next();
	}

	// Check for user roles
	acl.areAnyRolesAllowed(roles, req.route.path, req.method.toLowerCase(), function(err, isAllowed) {
		if (err) {
			// An authorization error occurred.
			return res.status(500).send('Unexpected authorization error');
		} else {
			if (isAllowed) {
				// Access granted! Invoke next middleware
				return next();
			} else {
				return res.status(403).json({
					message: 'User is not authorized'
				});
			}
		}
	});
};