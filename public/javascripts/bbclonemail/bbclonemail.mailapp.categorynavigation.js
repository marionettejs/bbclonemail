BBCloneMail.module("MailApp.CategoryNavigation", {
  startWithApp: false,
  define: function(Nav, App, Backbone, Marionette, $, _){
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

    // Controller
    // ----------

    Nav.Controller = function(region){
      this.region = region;
    };

    _.extend(Nav.Controller.prototype, {

      showCategories: function(){
        var showCatListView = _.bind(this.showCatListView, this);
        this.getCategories(showCatListView);
      },

      showCatListView: function(categories){
        var view = new Nav.CategoryListView({
          collection: categories
        });

        this.region.show(view);
      },

      getCategories: function(callback){
        var categoryLoader = App.request("mail:categories");
        $.when(categoryLoader).then(callback);
      }

    });

    // Initializer / Finalizer
    // -----------------------

    Nav.addInitializer(function(){
      Nav.controller = new Nav.Controller(App.nav);
      Nav.controller.showCategories();
    });

    Nav.addFinalizer(function(){
      delete Nav.controller;
    });

  }
});
