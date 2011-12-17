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

  // The view to show the list of categories. The view
  // template includes the standard categories hard coded
  // and then it renders the individual categories, too.
  Categories.CategoriesView = Backbone.View.extend({
    template: "#mail-categories-view-template",

    events: {
      "click a": "categoryClicked"
    },

    categoryClicked: function(e){
      e.preventDefault();
      var category = $(e.currentTarget).data("category");
      BBCloneMail.vent.trigger("mail:category:selected", category);
    },

    render: function(){
      var data = {categories: this.collection.toJSON()};
      var html = $(this.template).tmpl(data);
      $(this.el).html(html);
    }
  });

  var buildCategories = function(categoryNames){
    var category;
    var categoryCollection = new CategoryCollection();
    _.each(categoryNames, function(categoryName){
      category = new Category({name: categoryName});
      categoryCollection.add(category);
    });
    return categoryCollection;
  };

  // Get the list of categories on startup and hold
  // then in memory, so we can render them on to the
  // screen when we need to.
  BBCloneMail.addInitializer(function(options){
    Categories.categoryCollection = buildCategories(options.categories);
  });

  return Categories;
})(BBCloneMail, Backbone, jQuery);
