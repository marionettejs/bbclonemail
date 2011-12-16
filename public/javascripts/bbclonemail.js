// Backbone.BBCloneMail
// A reference application for Backbone.Marionette
//
// Copyright (C)2011 Derick Bailey, Muted Solutions, LLC
// Distributed Under MIT License
//
// Documentation and Full License Available at:
// http://github.com/derickbailey/backbone.bbclonemail
// http://github.com/derickbailey/backbone.marionette

// BBCloneMail Application / Namespace
// -----------------------------------

// This is the primary application definition and
// application namespace. It's important to keep
// the JavaScript global scope clean, so everything
// we will do hangs off the 'Application' instance.
BBCloneMail = new Backbone.Marionette.Application();

// These are my visual regions: the "navigation" or
// left hand list of categories, and the "main"
// content area where the email list or contact list
// is displayed.
BBCloneMail.addRegions({
  navigationRegion: "#navigation",
  mainRegion: "#main"
});

// This kicks off after all of my other application
// initializers have fired, and starts the Backbone
// history. Doing that fires off the router's route
// based on the #hash fragment in the URL, and gets
// the app up and running in the correct mode.
BBCloneMail.bind("initialize:after", function(){
  if (Backbone.history){
    Backbone.history.start();
  }
});
