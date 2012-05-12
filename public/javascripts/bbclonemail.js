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

BBCloneMail.addRegions({
  content: ".content"
});

BBCloneMail.vent.on("layout:rendered", function(){
  Backbone.history.start();
});

// Set up async template loading from the server. A view with
// a template of `"#my-view-template"` will load a file called
// `"/templates/my-view-template.html"` from the server.
//
// Use the TrafficCop plugin to ensure we only make one
// request to get the template
Backbone.Marionette.TemplateCache.loadTemplate = function(templateId, callback){
  var that = this;
  var tmpId = templateId.replace("#", "");
  var url = "/templates/" + tmpId + ".html";
  var promise = $.trafficCop(url);
  promise.done(function(templateHtml){
    var $template = $(templateHtml);
    var template = that.compileTemplate($template.html());
    callback(template);
  });
}
