// Backbone.BBCloneMail
// A reference application for Backbone.Marionette
//
// Copyright (C)2011 Derick Bailey, Muted Solutions, LLC
// Distributed Under MIT License
//
// Documentation and Full License Available at:
// http://github.com/derickbailey/backbone.bbclonemail
// http://github.com/derickbailey/backbone.marionette

BBCloneMail.ContactsApp = (function(BBCloneMail, Backbone){
  var Contacts = {};

  Contacts.ContactListView = BBCloneMail.SmartView.extend({
    tagName: "ul",
    className: "contact-list",
    template: "#contact-list-view-template"
  });

  Contacts.ContactCategoriesView = BBCloneMail.SmartView.extend({
    template: "#contact-categories-view-template",

    events: {
      "click a": "categoryClicked"
    },

    categoryClicked: function(e){
      e.preventDefault();
    }
  });

  Contacts.show = function(){
    BBCloneMail.mainRegion.show(new Contacts.ContactListView());
    BBCloneMail.navigationRegion.show(new Contacts.ContactCategoriesView());
    BBCloneMail.showRoute("contacts");
    BBCloneMail.AppSelection.showSelection("contacts");
  };
  
  return Contacts;
})(BBCloneMail, Backbone);

