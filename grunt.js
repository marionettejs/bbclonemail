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
          "public/javascripts/vendor/jquery.resolved.js",
          "public/javascripts/vendor/underscore.js",
          "public/javascripts/vendor/backbone.js",
          "public/javascripts/vendor/backbone.compute.js",
          "public/javascripts/vendor/backbone.routefilter.js",
          "public/javascripts/vendor/backbone.wreqr.js",
          "public/javascripts/vendor/backbone.babysitter.js",
          "public/javascripts/vendor/backbone.marionette.js",

          "public/javascripts/bbclonemail/bbclonemail.js",
          "public/javascripts/bbclonemail/components/appSelector.js",
          "public/javascripts/bbclonemail/components/appController.js",

          "public/javascripts/bbclonemail/mail/categories/categoryView.js",
          "public/javascripts/bbclonemail/mail/categories/categories.js",
          "public/javascripts/bbclonemail/mail/mail/mailListView.js",
          "public/javascripts/bbclonemail/mail/mail/mailItemView.js",
          "public/javascripts/bbclonemail/mail/mail/mail.js",
          "public/javascripts/bbclonemail/mail/mailapp.js",
          "public/javascripts/bbclonemail/mail/router.js",

          "public/javascripts/bbclonemail/contacts/router.js",
          "public/javascripts/bbclonemail/contacts/contactsapp.js",
          "public/javascripts/bbclonemail/contacts/categories.js",
          "public/javascripts/bbclonemail/contacts/contacts.js",
          "public/javascripts/bbclonemail/contacts/contactlist.js",

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
        'public/javascripts/vendor/jquery.resolved.js',
        'public/javascripts/vendor/json2.js',
        'public/javascripts/vendor/underscore.js',
        'public/javascripts/vendor/backbone.js',
        "public/javascripts/vendor/backbone.wreqr.js",
        "public/javascripts/vendor/backbone.eventaggregator.js",
        'public/javascripts/vendor/backbone.compute.js',
        'public/javascripts/vendor/backbone.routefilter.js',
        'public/javascripts/vendor/backbone.marionette.js',
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
