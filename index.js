'use strict';
var linuxBattery = require('linux-battery');
var osxBattery = require('osx-battery');
var toDecimal = require('to-decimal');

function osx(cb) {
	osxBattery(function (err, res) {
		if (err) {
			cb(err);
			return;
		}

		cb(null, parseFloat((res.mAhRemaining / res.mAhCapacity).toFixed(2)));
	});
}

function linux(cb) {
	linuxBattery(function (err, res) {
		if (err) {
			cb(err);
			return;
		}

		res = res.percentage.slice(0, res.percentage.length);
		cb(null, toDecimal(parseFloat(res)));
	});
}

module.exports = function (cb) {
	if (process.platform === 'darwin') {
		osx(cb);
		return;
	}

	if (process.platform === 'linux') {
		linux(cb);
		return;
	}

	throw new Error('Only OS X and Linux systems are supported');
};