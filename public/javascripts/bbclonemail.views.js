// Backbone.BBCloneMail
// A reference application for Backbone.Marionette
//
// Copyright (C)2011 Derick Bailey, Muted Solutions, LLC
// Distributed Under MIT License
//
// Documentation and Full License Available at:
// http://github.com/derickbailey/backbone.bbclonemail
// http://github.com/derickbailey/backbone.marionette

// Backbone View Rendering
// -----------------------

// Replace the default underscore.js templating with
// jQuery templates.
Backbone.Marionette.ItemView.prototype.renderTemplate = function(template, data){
  var html = template.tmpl(data);
  return html;
};

// Alias the views so they are easier to get to.
BBCloneMail.ItemView = Backbone.Marionette.ItemView;
BBCloneMail.CollectionView = Backbone.Marionette.CollectionView;
