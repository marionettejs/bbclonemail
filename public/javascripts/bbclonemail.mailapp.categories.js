// Backbone.BBCloneMail
// A reference application for Backbone.Marionette
//
// Copyright (C)2011 Derick Bailey, Muted Solutions, LLC
// Distributed Under MIT License
//
// Documentation and Full License Available at:
// http://github.com/derickbailey/backbone.bbclonemail
// http://github.com/derickbailey/backbone.marionette

// MailApp.Categories
// ------------------

// The list of categories for email. Right now this 
// displayed a hard coded list, stuffed directly in
// the HTML template. 
BBCloneMail.MailApp.Categories = (function(Backbone, $){

  return Backbone.View.extend({
    template: "#mail-categories-view-template",

    events: {
      "click a": "categoryClicked"
    },

    categoryClicked: function(e){
      e.preventDefault();
    }
  });

})(Backbone, jQuery);
