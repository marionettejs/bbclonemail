// Backbone.BBCloneMail
// A reference application for Backbone.Marionette
//
// Copyright (C)2012 Derick Bailey, Muted Solutions, LLC
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
BBCloneMail.module("MailApp.Categories", function(Categories, BBCloneMail, Backbone, Marionette, $, _){

  // The category model and collection
  var Category = Backbone.Model.extend({});
  var CategoryCollection = Backbone.Collection.extend({
    url: "/categories",
    model: Category
  });

  // Mail Category Views
  // -------------------

  // The view to show the list of categories. The view
  // template includes the standard categories hard coded
  // and then it renders the individual categories, too.
  Categories.CategoriesView = Marionette.ItemView.extend({
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
    }
  });

  // Mail Categories Public API
  // --------------------------
  
  // Show the mail categories list
  Categories.showCategoryList = function(){
    var categoryView = new Categories.CategoriesView({
      collection: Categories.categoryCollection
    })
    BBCloneMail.layout.navigation.show(categoryView);
  }

  // Mail Categories Initializer
  // ---------------------------

  // Get the list of categories on startup and hold
  // then in memory, so we can render them on to the
  // screen when we need to.
  BBCloneMail.addInitializer(function(){
    Categories.categoryCollection = new CategoryCollection();
    Categories.categoryCollection.fetch();
  });

});
