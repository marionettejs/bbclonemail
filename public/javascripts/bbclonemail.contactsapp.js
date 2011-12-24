// Backbone.BBCloneMail
// A reference application for Backbone.Marionette
//
// Copyright (C)2011 Derick Bailey, Muted Solutions, LLC
// Distributed Under MIT License
//
// Documentation and Full License Available at:
// http://github.com/derickbailey/backbone.bbclonemail
// http://github.com/derickbailey/backbone.marionette

// Contacts
// --------

// The contacts app is mostly hard coded at this point. It is
// not very functional, other than to show the list of hard coded
// contacts (coming straight from the view template). It does
// demonstrate how I am using region managers to swap out content
// in various parts of the app, though. 

BBCloneMail.ContactsApp = (function(BBCloneMail, Backbone){
  var Contacts = {};

  // Displays the hard coded list of contacts, from the
  // view template.
  Contacts.ContactListView = BBCloneMail.ItemView.extend({
    tagName: "ul",
    className: "contact-list",
    template: "#contact-list-view-template"
  });

  // Displays the hard coded list of contact categories, from
  // the view template.
  Contacts.ContactCategoriesView = BBCloneMail.ItemView.extend({
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

  // Replaces the main and navigation regions of the screen with
  // the content for the contacts, using the region managers. Also
  // sets the correct route and ensures the aplication selection is
  // set correctly.
  Contacts.show = function(){
    BBCloneMail.mainRegion.show(new Contacts.ContactListView());
    BBCloneMail.navigationRegion.show(new Contacts.ContactCategoriesView());

    // Let the rest of the app know that the Contacts app is now
    // running
    BBCloneMail.vent.trigger("contacts:show");
  };
  
  return Contacts;
})(BBCloneMail, Backbone);

