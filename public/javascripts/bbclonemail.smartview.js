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

// Rendering is mostly the same across all of my
// views, with only a few differences between item
// rendering and collection rendering.
// So I've encapsulated the logic of it
// here, in a `SmartView`. The basic rendering can be 
// overridden in a specific view instance by adding
// a `render` method to your view.
BBCloneMail.SmartView = (function(Backbone, $){

  // Export the view
  return Backbone.View.extend({

    // Automatic serialization of either `this.model`
    // or `this.collection` for the rendered template.
    //
    // You can override this method in your view to
    // provide custom serialization, without having to
    // replace the entire `render` method.
    serializeData: function(){
      var data;
      if (this.model){data = this.model.toJSON();}
      if (this.collection){data = this.collection.toJSON();}
      return data;
    },

    // The generic rendering method. It works with
    // jQuery templates by default. Override this method
    // in your view, to perform custom rendering.
    render: function(){
      var data = this.serializeData();
      var html = $(this.template).tmpl(data);
      $(this.el).html(html);
    }
  });

})(Backbone, $);
