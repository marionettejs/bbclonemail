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
BBCloneMail.MailApp.Categories = (function(BBCloneMail, Backbone, $){
  var Categories = {};

  // The category model and collection
  var Category = Backbone.Model.extend({});
  var CategoryCollection = Backbone.Collection.extend({
    model: Category
  });

  // Mail Category Views
  // -------------------

  // The view to show the list of categories. The view
  // template includes the standard categories hard coded
  // and then it renders the individual categories, too.
  Categories.CategoriesView = BBCloneMail.ItemView.extend({
    template: "#mail-categories-view-template",

    events: {
      "click a": "categoryClicked"
    },

    // Raise an event aggregator event, to say that a
    // particular category was clicked, and let the other
    // parts of the system figure out how to respond.
    categoryClicked: function(e){
      e.preventDefault();
      var category = $(e.currentTarget).data("category");
      if (category){
        BBCloneMail.vent.trigger("mail:category:show", category);
      } else {
        BBCloneMail.vent.trigger("mail:show");
      }
    },

    // serialize the collection in a way that lets us 
    // iterate through it in the template
    serializeData: function(){
      return {categories: this.collection.toJSON()};
    }
  });

  // Mail Categories Helper Methods
  // ----------------------------

  // Build a proper collection of category models
  var buildCategories = function(categoryNames){
    var category;
    var categoryCollection = new CategoryCollection();
    _.each(categoryNames, function(categoryName){
      category = new Category({name: categoryName});
      categoryCollection.add(category);
    });
    return categoryCollection;
  };

  // Mail Categories Initializer
  // ---------------------------

  // Get the list of categories on startup and hold
  // then in memory, so we can render them on to the
  // screen when we need to.
  BBCloneMail.addInitializer(function(options){
    Categories.categoryCollection = buildCategories(options.categories);
  });

  return Categories;
})(BBCloneMail, Backbone, jQuery);
