// Backbone.BBCloneMail
// A reference application for Backbone.Marionette
//
// Copyright (C)2012 Derick Bailey, Muted Solutions, LLC
// Distributed Under MIT License
//
// Documentation and Full License Available at:
// http://github.com/derickbailey/backbone.bbclonemail
// http://github.com/derickbailey/backbone.marionette

// Contact Categories
// --------

// Manage the list of categories, and the interactions with them,
// for the contacts app.
BBCloneMail.module("ContactsApp.Categories", function(Categories, BBCloneMail, Backbone, Marionette, $, _){

  // Categories Views
  // ----------------

  // Displays the hard coded list of contact categories, from
  // the view template.
  Categories.ContactCategoriesView = Marionette.ItemView.extend({
    template: "#contact-categories-view-template",

    events: {
      "click a": "categoryClicked"
    },

    categoryClicked: function(e){
      e.preventDefault();
    }
  });

  // Public API
  // ----------
  
  // Show the list of contact categories in the 
  // left hand navigation.
  Categories.show = function(){
    BBCloneMail.layout.navigation.show(new Categories.ContactCategoriesView());
  }

});
