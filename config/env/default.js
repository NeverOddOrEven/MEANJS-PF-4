'use strict';

module.exports = {
	app: {
		title: 'Portfolio 4',
		description: 'MEAN PF 4',
		keywords: 'mongodb, express, angularjs, node.js, mongoose, passport',
		googleAnalyticsTrackingID: process.env.GOOGLE_ANALYTICS_TRACKING_ID || 'GOOGLE_ANALYTICS_TRACKING_ID'
	},
	port: process.env.PORT || 3000,
	templateEngine: 'swig',
	sessionSecret: 'asdfasdfasdf',
	sessionCollection: 'sessions'
};
