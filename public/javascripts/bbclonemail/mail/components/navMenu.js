BBCloneMail.module("MailApp.Navigation", function(Nav, App, Backbone, Marionette, $, _){
  "use strict";

  // Category List View
  // ------------------
  // Display a list of categories in the navigation area

  Nav.CategoryListView = Marionette.ItemView.extend({
    template: "#mail-categories-view-template",

    render: function(){
      Marionette.ItemView.prototype.render.apply(this, arguments);
    }
  });

  // Navigation Component Controller
  // -------------------------------

  Nav.Menu = Marionette.Controller.extend({
    
    initialize: function(options){
      this.region = options.region;
    },

    show: function(){
      var showCatListView = _.bind(this._showCatListView, this);
      this._getCategories(showCatListView);
    },

    _showCatListView: function(categories){
      var view = new Nav.CategoryListView({
        collection: categories
      });

      this.region.show(view);
    },

    _getCategories: function(callback){
      var categoryLoader = App.request("mail:categories");
      $.when(categoryLoader).then(callback);
    }
  });

});
