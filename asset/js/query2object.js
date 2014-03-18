/*
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this file,
 * You can obtain one at http://mozilla.org/MPL/2.0/.
 */

/**
 * turn a querystring into an easy to use `key:value` object
 *
 * @param  {String} queryString  querystring to convert
 * @return {Object}              querystring as object (duh)
 */
var query = window.query = (function( window, document, undefined ){
	'use strict';

	return function parse( queryString ) {
		// use given string OR use window.location.search
		queryString = queryString || window.location.search;

		// define internal variables
		var pairs  = queryString.slice( 1 ).split( '&' );
		var result = {};

		// loop through all `key=value` pairs and convert to object
		pairs.forEach( function( pair ) {
			pair = pair.split( '=' );
			result[ pair[ 0 ] ] = decodeURIComponent( pair[ 1 ] || '' );
		});

		// stringify + parse to help prevent malicious code.
		return JSON.parse( JSON.stringify( result ) );
	};
})( this, this.document );
