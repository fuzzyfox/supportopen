/*
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this file,
 * You can obtain one at http://mozilla.org/MPL/2.0/.
 */

/* jshint strict:false, curly:false */

// Does an inplace shuffle of an array in O(n) time. Uses the Fisher-Yates Shuffle.
if( !Array.prototype.shuffle ) Array.prototype.shuffle = function() {
	for(var j, x, i = this.length; i; j = parseInt( Math.random() * i, 10 ), x = this[--i], this[i] = this[j], this[j] = x);
};
