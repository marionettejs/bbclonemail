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

  // Export the item view
  BBCloneMail.ItemView = Backbone.View.extend({

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
      if (this.onRender){
        this.onRender();
      }
    }
  });

  // Export the collection view
  BBCloneMail.CollectionView = Backbone.View.extend({
    initialize: function(){
      _.bindAll(this, "renderItem");
    },
    
    // Automatic serialization the item (Backbone.Model)
    // that is passed in, typically from the collection of
    // this view, during rendering.
    //
    // You can override this method in your view to
    // provide custom serialization, without having to
    // replace the entire `render` method.
    serializeData: function(item){
      return item.toJSON();
    },

    // The generic rendering method. It works with
    // jQuery templates by default. Override this method
    // in your view, to perform custom rendering.
    render: function(){
      var el = $(this.el);
      var template = $(this.template);
      var self = this;
      this.collection.each(function(item){
        var data = self.serializeData(item);
        var html = self.renderItem(item);
        el.append(html);
      });
    },

    // Render an individual item. Provide an `itemView` 
    // attribute on your collection view definition, to
    // be used for the individual items.
    // Specify the view name, not an instance of a view.
    renderItem: function(item){
      var itemView = new this.itemView({model: item});
      itemView.render();
      return itemView.el;
    }
  });

})(BBCloneMail, Backbone, $);
