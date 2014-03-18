module.exports = function( grunt ) {
  'use strict';

  grunt.initConfig({
    pkg: grunt.file.readJSON( 'package.json' ),

    jshint: {
      options: {
        strict: true,
        curly: true,
        newcap: true,
        quotmark: true,
        camelcase: true,
        undef: true,
        unused: true,
        eqeqeq: true,
        node: true,
        browser: true
      },
      files: [
      'Gruntfile.js',
      'asset/js/**/*.js'
      ]
    }
  });

  grunt.loadNpmTasks( 'grunt-contrib-jshint' );

  grunt.registerTask( 'default', [ 'jshint' ]);
};
