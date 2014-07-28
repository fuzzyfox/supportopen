/*
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this file,
 * You can obtain one at http://mozilla.org/MPL/2.0/.
 */

/* global define, jQuery, Make, Masonry */
'use strict';

function quilt( $, Make, Masonry ) {
  var called = false;

  // default configuration
  var config = {
    tags: [ 'supportopen', 'webwewant', 'millionmozillians' ],
    execution: 'or',
    limit: 100,
    duration: 7000,
    makeapi: {
      apiURL: 'https://makeapi.webmaker.org'
    },
    $quiltContainer: $( '#quiltContainer' ),
    $makesContainer: $( '#quiltMakes' ),
    $preview: $( '#quiltPreview' ),
    centerQuilt: true
  };

  // we'll need a makeapi
  var makeapi;
  var totalMakes = 0;
  var masonry;
  var previewInterval;
  var previewOrder = [];

  /**
   * Returns a shuffled version of the input array.
   *
   * Uses the Fisher-Yates shuffle.
   *
   * @param {Array} array The array to shuffle
   * @return {Array} Shuffled array.
   */
  function shuffleArray( array ) {
    var randomIndex = 0;
    var tempValue = null;
    var length = array.length;

    if( length < 2 ) {
      return array;
    }

    while( length ) {
      randomIndex = Math.floor( Math.random() * length );
      length--;

      tempValue = array[ length ];
      array[ length ] = array[ randomIndex ];
      array[ randomIndex ] = tempValue;
    }

    return array;
  }

  /**
   * Get makes from the makeapi
   *
   * @param  {Number}   page An integer indicating the search page
   * @param  {Function} done Function to run once search complete
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
        // stop on search error
        if( err ) {
          console.error( err );
          return;
        }

        // don't call done if no makes (and return null)
        if( makes.length === 0 ) {
          return;
        }

        // shuffle makes found
        makes = shuffleArray( makes );

        // add makes to the DOM
        makes.forEach( function( make ) {
          // construct avatar url
          var avatar = 'https://secure.gravatar.com/avatar/' + make.emailHash + '?s=200&d=' + make.thumbnail;

          // construct make thumb for injection into DOM
          var thumb = '<li class="quilt-msnry" data-make-url="' + make.url + '" style="background-image:url(' + avatar + ')">\n' +
                      '  <a href="' + make.url + '">\n' +
                      '    <img src="' + avatar + '" alt="' + make.title + ' by ' + make.user + '" />\n' +
                      '  </a>\n' +
                      '</li>';

          // inject thumb into DOM
          config.$makesContainer.append( thumb );

          // if masonry in use let it know we added something
          if( Masonry ) {
            masonry.appended( config.$makesContainer.children().last().get( 0 ) );
          }

          // add to previewOrder
          previewOrder.push( totalMakes );

          // increment total of makes
          totalMakes++;
        });

        // shuffle preview queue
        previewOrder = shuffleArray( previewOrder );

        // done w/ this page of search results
        if( ( totalMakes <= config.limit ) && done ) {
          done();
        }
      });
  }

  /**
   * Load a make into the preview iframe
   *
   * @param  {jQuery} $selection selected make to preview
   */
  function previewMake( $selection ) {
    // get all makes
    var $makes = config.$makesContainer.children();

    // check if a selection was provided
    if( ! $selection ) {
      // get a random make to show from the previewOrder array
      var selection = previewOrder.shift();
      // cycle previewOrder array
      previewOrder.push( selection );

      // make selection
      $selection = $makes.eq( selection );
    }

    // deactivate any previous selection
    $makes.filter( '.active' ).removeClass( 'active' );

    // preview selected make
    $selection.addClass( 'active' );
    config.$preview.attr( 'src', $selection.data( 'make-url' ) + '_' );
  }

  /**
   * (Re)starts the preview loading interval
   */
  function startPreviewInterval() {
    clearInterval( previewInterval );
    previewInterval = setInterval( previewMake, config.duration );
  }

  /**
   * Handle click on a make thumbnail
   */
  config.$makesContainer.on( 'click', 'li', function() {
    // load make into preview
    previewMake( $( this ) );

    // restart preview interval
    startPreviewInterval();

    // prevent link follow
    return false;
  });

  /**
   * An aid to centering the quilt in its parent
   */
  function centerContainer() {
    config.$quiltContainer.width( 160 * Math.floor( config.$quiltContainer.parent().width() / 160 ) );
  }

  // return init function
  return function( options ) {
    // prevent function being called more than once
    if( called ) {
      return;
    }
    called = true;

    // allow null options
    options = options || {};

    // extend default config w/ user options
    $.extend( config, options );

    // initilize makeapi
    makeapi = new Make( config.makeapi );

    // mansonry initilization if needed
    if( Masonry ) {
      masonry = new Masonry( config.$quiltContainer.get( 0 ), {
        itemSelector: '.quilt-msnry',
        columnWidth: 160, // this should be configurable or magical
        transitionDuration: 0.7 // this should be configurable
      });
    }

    // fetch makes
    getMakes( 1, function() {
      // we have some makes we can show now
      startPreviewInterval();
    });

    // center quilt if needed
    if( config.centerQuilt ) {
      centerContainer();
      $( window ).resize( centerContainer );
    }
  };
}

// check for AMD scope
if( typeof define !== 'undefined' ) {
  define( [ 'jquery', 'makeapi', 'masonry' ], quilt );
}
// fall back scope (browser)
else {
  window.Quilt = quilt( jQuery, Make, Masonry );
}
