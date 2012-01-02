// Backbone.BBCloneMail
// A reference application for Backbone.Marionette
//
// Copyright (C)2011 Derick Bailey, Muted Solutions, LLC
// Distributed Under MIT License
//
// Documentation and Full License Available at:
// http://github.com/derickbailey/backbone.bbclonemail
// http://github.com/derickbailey/backbone.marionette

// Contact Categories
// --------

BBCloneMail.ContactsApp.Categories = (function(BBCloneMail, Backbone){
  var Categories = {};

  // Displays the hard coded list of contact categories, from
  // the view template.
  Categories.ContactCategoriesView = BBCloneMail.ItemView.extend({
    template: "#contact-categories-view-template",

    events: {
      "click a": "categoryClicked"
    },

    categoryClicked: function(e){
      // ignore the clicks for now, just make sure they don't
      // cause a page refresh.
      e.preventDefault();
    }
  });

  // Public API
  // ----------
  
  Categories.show = function(){
    BBCloneMail.navigationRegion.show(new Categories.ContactCategoriesView());
  }

  return Categories;
})(BBCloneMail, Backbone);
