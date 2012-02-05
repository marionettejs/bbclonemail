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

// Alias the views so they are easier to get to.
BBCloneMail.ItemView = Backbone.Marionette.ItemView;
BBCloneMail.CollectionView = Backbone.Marionette.CollectionView;

// Replace the default underscore.js templating with jQuery templates.
Backbone.Marionette.ItemView.prototype.renderTemplate = function(template, data){
  var html = template.tmpl(data);
  return html;
};

// Set up async template loading from the server. A view with
// a template of `"#my-view-template"` will load a file called
// `"/templates/my-view-template.html"` from the server.
Backbone.Marionette.TemplateManager.loadTemplate = function(templateId, callback){
  var tmpId = templateId.replace("#", "");
  $.get("/templates/" + tmpId + ".html", function(template){
    callback.call(this, $(template));
  });
}
