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

// The basic rendering can be overridden in a specific 
// view instance by adding a `render` method to a view.
(function(BBCloneMail, Backbone, $){

  BBCloneMail.ItemView = Backbone.Marionette.ItemView.extend({
    renderTemplate: function(template, data){
      var html = $(template).tmpl(data);
      return html;
    }
  });

  BBCloneMail.CollectionView = Backbone.Marionette.CollectionView.extend({
  });

})(BBCloneMail, Backbone, $);
