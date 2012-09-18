BBCloneMail.module("MailApp.CategoryNavigation", function(Nav, App, Backbone, Marionette, $, _){

  // Category List View
  // ------------------
  // Display a list of categories in the navigation area

  Nav.CategoryListView = Marionette.ItemView.extend({
    template: "#mail-categories-view-template",

    render: function(){
      Marionette.ItemView.prototype.render.apply(this, arguments);
    },

    events: {
      "click .mail-category": "mailCategoryClicked"
    },

    mailCategoryClicked: function(e){
      e.preventDefault();
      var categoryName = $(e.currentTarget).data("category");
      this.trigger("category:selected", categoryName);
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

      view.bindTo(view, "category:selected", this.showCategory, this);

      this.region.show(view);
    },

    showCategory: function(categoryName){
      if (categoryName){
        App.execute("show:category", categoryName);
      } else {
        App.execute("show:inbox");
      }
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
