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

// Rendering is 99% the same across all of my
// views, so I've encapsulated the logic of it
// here, by providing a prototype render method
// on `Backbone.View`. Of course, this can be 
// overridden in a specific view instance, which
// you'll see in other places.

(function(Backbone, $){

  BBCloneMail.SmartView = Backbone.View.extend({
    serializeData: function(){
      var data;
      if (this.model){data = this.model.toJSON();}
      if (this.collection){data = this.collection.toJSON();}
      return data;
    },

    render: function(){
      var data = this.serializeData();
      var html = $(this.template).tmpl(data);
      $(this.el).html(html);
    }
  });

})(Backbone, $);
