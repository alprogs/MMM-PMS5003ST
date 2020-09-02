'use strict';

/* Magic Mirror
 * Module: MMM-PMS5003ST
 *
 * By Brad Kim
 * MIT Licensed.
 */

const NodeHelper = require('node_helper');
const exec = require('child_process').exec;

module.exports = NodeHelper.create({
	start: function () {
		console.log('[MMM-PMS5003ST] MMM-PMS5003ST helper started ...');
	},

	socketNotificationReceived: function(notification, payload) {
		const self = this;
		if (notification === 'REQUEST') {
			const self = this;
			this.config = payload;

			exec("java -jar ./modules/MMM-PMS5003ST/pms5003st-tool.jar -ext.tool", (error, stdout) => {
				if (error) {
					console.error(`exec error: ${error}`);
					return;
				}

				console.log('[MMM-PMS5003ST] ext.tool log: '+ stdout);
				var arr = stdout.split(",");

				/* 
				 * SAMPLE
				 * PM  1.0(ATMO) : 4
				 * PM  2.5(ATMO) : 5
				 * PM 10.0(ATMO) : 5
				 * FORMALDEHYDE  : 0.001
				 * TEMPERATURE   : 24.4
				 * HUMIDITY      : 64.8
				 */

				self.sendSocketNotification('DATA', {
					pm1_0 		: arr[0],
					pm2_5 		: arr[1],
					pm10_0 		: arr[2],
					formaldehyde: arr[3],
					temperature : arr[4],
					humidity 	: arr[5]
				});
			});
		}
	}
});

