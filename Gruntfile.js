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
    },

    concat: {
      dist: {
        src: [
          'asset/js/Array.prototype.shuffle.js',
          'asset/js/query2object.js',
          'asset/js/quilt.js'
        ],
        dest: 'dist/quilt.js'
      }
    },

    uglify: {
      dist: {
        options: {
          mangle: false,
          sourceMap: true
        },
        files: {
          'dist/quilt.min.js': [ 'dist/quilt.js' ]
        }
      }
    },

    cssmin: {
      dist: {
        files: {
          'dist/quilt.min.css': [ 'asset/css/quilt.css' ]
        }
      }
    },

    copy: {
      dist: {
        src: 'asset/css/quilt.css',
        dest: 'dist/quilt.css'
      }
    }
  });

  grunt.loadNpmTasks( 'grunt-contrib-jshint' );
  grunt.loadNpmTasks( 'grunt-contrib-concat' );
  grunt.loadNpmTasks( 'grunt-contrib-uglify' );
  grunt.loadNpmTasks( 'grunt-contrib-cssmin' );
  grunt.loadNpmTasks( 'grunt-contrib-copy' );

  grunt.registerTask( 'default', [ 'jshint' ]);
  grunt.registerTask( 'build', [ 'jshint', 'copy', 'concat', 'uglify', 'cssmin' ]);
};
