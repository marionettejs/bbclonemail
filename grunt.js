/*global module:false*/
module.exports = function(grunt) {

  grunt.loadNpmTasks('grunt-jasmine-runner');

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
          "public/javascripts/vendor/backbone.routefilter.js",
          "public/javascripts/vendor/backbone.marionette.js",
          "public/javascripts/vendor/marionette.wreqr.js",
          "public/javascripts/bbclonemail/bbclonemail.js",
          "public/javascripts/bbclonemail/bbclonemail.mailrouter.js",
          "public/javascripts/bbclonemail/bbclonemail.mailapp.js",
          "public/javascripts/bbclonemail/bbclonemail.mailapp.mail.js",
          "public/javascripts/bbclonemail/bbclonemail.mailapp.inbox.js",
          "public/javascripts/bbclonemail/bbclonemail.contactsapp.js",
          "public/javascripts/bbclonemail/bbclonemail.contactrouter.js",
          "public/javascripts/bbclonemail/bbclonemail.contactsapp.contacts.js",
          "public/javascripts/bbclonemail/bbclonemail.contactsapp.contactlist.js",
          "public/javascripts/bbclonemail/**/*.js"
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

    jasmine : {
      src : [
        'public/javascripts/vendor/jquery.js',
        'public/javascripts/vendor/json2.js',
        'public/javascripts/vendor/underscore.js',
        'public/javascripts/vendor/backbone.js',
        'public/javascripts/vendor/backbone.routefilter.js',
        'public/javascripts/vendor/backbone.marionette.js',
        'public/javascripts/vendor/marionette.wreqr.js',
        'public/javascripts/bbclonemail/bbclonemail.js',
        'public/javascripts/bbclonemail/**/*.js',
      ],
      helpers : 'spec/javascripts/helpers/*.js',
      specs : 'spec/javascripts/**/*.spec.js'
    },

    'jasmine-server' : {
      browser : false
    },

  });

  // Default task.
  grunt.registerTask('default', 'concat min');

};
