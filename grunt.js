/*global module:false*/
module.exports = function(grunt) {

  grunt.initConfig({
    meta: {
      version: '0.2.0',
      banner: '// BBCloneMail, v<%= meta.version %>\n' +
        '// Copyright (c)<%= grunt.template.today("yyyy") %> Muted Solutions, LLC.\n' + 
        '// Distributed under MIT license\n' + 
        '// http://github.com/derickbailey/bbclonemail'
    },

    concat: {
      dist: {
        src: [
          "public/javascripts/vendor/json2.js",
          "public/javascripts/vendor/jquery.js",
          "public/javascripts/vendor/underscore.js",
          "public/javascripts/vendor/backbone.js",
          "public/javascripts/vendor/backbone.marionette.js",
          "public/javascripts/bbclonemail/bbclonemail.js",
          "public/javascripts/bbclonemail/js"
        ],
        dest: 'public/javascripts/build/bbclonemail.js'
      }
    },

    min: {
      dist: {
        src: ['public/javascripts/build/bbclonemail.js'],
        dest: 'public/javascripts/build/bbclonemail.min.js'
      }
    },

    lint: {
      files: ['public/javascripts/bbclonemail/**/*.js']
    },

    jshint: {
      options: {
        curly: true,
        eqeqeq: true,
        immed: false,
        latedef: true,
        newcap: true,
        noarg: true,
        sub: true,
        undef: true,
        boss: true,
        eqnull: true,
        browser: true
      },
      globals: {
        jQuery: true,
        Backbone: true,
        _: true,
        BBCloneMail: true,
        console: true
      }
    },
    uglify: {}
  });

  // Default task.
  grunt.registerTask('default', 'lint concat min');

};
