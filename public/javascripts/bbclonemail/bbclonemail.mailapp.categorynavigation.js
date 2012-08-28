BBCloneMail.module("MailApp.CategoryNavigation", function(Nav, App, Backbone, Marionette, $, _){

  // Category List View
  // ------------------
  // Display a list of categories in the navigation area

  Nav.CategoryListView = Marionette.ItemView.extend({
    template: "#mail-categories-view-template"
  });

  // Controller
  // ----------

  Nav.Controller = function(region){
    this.region = region;
  };

  _.extend(Nav.Controller.prototype, {

    showCategories: function(){
      var that = this;
        
      this.getCategories(function(categories){
        var view = new Nav.CategoryListView({
          collection: categories
        });

        that.region.show(view);
      });

    },

    getCategories: function(callback){
      var categoryLoader = App.request("mail:categories");
      $.when(categoryLoader).then(callback);
    }

  });

  // Initializer / Finalizer
  // -----------------------

  Nav.addInitializer(function(){
    this.controller = new Nav.Controller(App.nav);
    this.controller.showCategories();
  });

  Nav.addFinalizer(function(){
    delete this.controller;
  });

});
