/*
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this file,
 * You can obtain one at http://mozilla.org/MPL/2.0/.
 */

(function(window, document, undefined){
	'use strict';

	// list of dependencies
	var deps = [
		window.jQuery,
		window.Make,
		window.Masonry,
		window.query,
		Array.prototype.shuffle
	];

	// check for all dependencies, and abort if any are missing
	var missingDepsFlag = false;

	deps.forEach( function(dep) {
		if ( !dep ) {
			missingDepsFlag = true;
		}
	});

	if ( missingDepsFlag ) {
		return;
	}

	// init makeapi client
	var makeapi = new window.Make({
		apiURL: 'https://makeapi.webmaker.org'
	});

	// utilize jQuery
	var $ = window.jQuery;

	// reference to the quilt's container
	var $quiltContainer = $( '#quiltContainer' );
	// reference to the preview iframe
	var $makePreview = $( 'makePreview' );

	// init masonry
	$quiltContainer.masonry({
		itemSelector: '.quilt-msnry',
		columnWidth: 160,
		transitionDuration: 0.7
	});
	var masonry = $quiltContainer.data( 'masonry' );

	// set default options
	var config = {
		tags: [ 'supportopen', 'webwewant', 'millionmozillians' ],
		execution: 'or',
		limit: 100,
		duration: 7000
	};

	// get user config and convert any tags into array.
	var userConfig = window.query();
	if ( userConfig.tags ) {
		userConfig.tags = userConfig.tags.split(',');
	}

	// override config w/ userConfig were possible
	$.extend( true, config, userConfig );

	// set internal variables
	var numberOfMakes = 0;
	var pageNumber    = 1;
	var displayOrder  = [];
	var displayTimer  = null;

	/**
	 * get makes from the makeapi
	 *
	 * @param  {Integer}  page page number of results to fetch
	 * @param  {Function} done callback to run once search complete
	 */
	function getMakes( page, done ) {
		page = page || 1;
		makeapi
			.tags({
				tags: config.tags,
				execution: config.execution
			})
			.sortByField( 'createdAt', 'desc' )
			.limit( config.limit )
			.contentType( 'application/x-thimble' )
			.page( page )
			.then( function( err, makes ) {
				// check if search failed or not
				if ( err ) {
					console.log( err );
					return;
				}

				// check some makes were returned
				if ( makes.length === 0 ) {
					console.log( 'no makes found' );
					return;
				}

				// shuffle the order of the makes returned
				makes.shuffle();

				// reference to makes
				var $makes = $( '#quiltMakes' );

				// add each make to the DOM
				makes.forEach( function( make ) {
					var thumbnail = 'https://secure.gravatar.com/avatar/' + make.emailHash + '?s=200&d=' + make.thumbnail;

					var thumb = '<li class="quilt-msnry" data-make="' + make.url + '" style="background-image:url(' + thumbnail + ')">';
					thumb += '<a href="' + make.url +'">';
					thumb += '<img src="' + thumbnail + '" alt="' + make.title + ' by ' + make.user + '" /></a></li>';

					$makes.append( thumb );

					$quiltContainer.masonry( 'appended', $makes.children().last() );

					numberOfMakes++;
				});

				// up the number of makes found
				numberOfMakes += makes.length;

				// add new makes to the queue
				for( var i = numberOfMakes, j = numberOfMakes + makes.length; i < j; i++ ) {
					displayOrder[i] = i;
				}
				displayOrder.shuffle();

				// we're done w/ the async + dom manipulation
				if ( (numberOfMakes <= config.limit) && done ) {
					done();
				}
			});
	}

	/**
	 * load the next make into the preview iframe
	 */
	function showNextMake() {
		// get latest makes in DOM
		var $makes    = $( '#quiltMakes' );
		var selection = displayOrder.shift();

		displayOrder.push( selection );

		$makes.each( function() {
			$( this ).removeClass( 'active' );
		});

		$makes.eq( selection ).addClass( 'active' );

		$makePreview.attr( 'src', $makes.eq( selection ).data( 'make' ) + '_' );
	}

	// start display timer
	function startDisplayTimer() {
		clearInterval( displayTimer );
		displayTimer = setInterval( showNextMake, config.duration );
	}

	// run search and start showing makes
	getMakes( pageNumber, startDisplayTimer );

	// keep getting results till none left
	getMakes( ++pageNumber, function getNextMakes() {
		getMakes( ++pageNumber, getNextMakes );
	});

	// when a make is clicked load it into preview
	$( document ).on( 'click', '#quiltMakes li', function( e ){
		$makePreview.attr( 'src', $( this ).data( 'make' ) + '_' );

		// restart time so that this make gets full time
		startDisplayTimer();

		return false;
	});

	// handle page resizes better
	function setContainerWidth() {
		$quiltContainer.width( 160 * Math.floor( $quiltContainer.parent().width() / 160 ) );
	}
	setContainerWidth();
	$( window ).resize( setContainerWidth );

	// attempt to get more makes for infinite scroll
	$( window ).scroll( function( e ) {
		if ( $( window ).scrollTop() === $( document ).height() - $( window ).height() ) {
			getMakes( pageNumber + 1, function() {
				pageNumber++;
				startDisplayTimer
			});
		}
	});
})(this, this.document);
