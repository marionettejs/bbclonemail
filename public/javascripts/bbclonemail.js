// Backbone.BBCloneMail
// A reference application for Backbone.Marionette
//
// Copyright (C)2012 Derick Bailey, Muted Solutions, LLC
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
