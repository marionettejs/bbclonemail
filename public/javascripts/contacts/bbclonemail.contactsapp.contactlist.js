// Backbone.BBCloneMail
// A reference application for Backbone.Marionette
//
// Copyright (C)2012 Derick Bailey, Muted Solutions, LLC
// Distributed Under MIT License
//
// Documentation and Full License Available at:
// http://github.com/derickbailey/backbone.bbclonemail
// http://github.com/derickbailey/backbone.marionette

// Contacts List
// -------------

// Manage the display of, and interaction with, the list of contacts.
BBCloneMail.module("ContactsApp.ContactList", function(ContactList, BBCloneMail, Backbone, Marionette, $, _){

  // Contact List Views
  // ------------------

  // Display an individual contact in the list.
  var ContactItemView = Marionette.ItemView.extend({
    tagName: "li",
    template: "#contact-item-template"
  });

  // Display the list of contacts.
  var ContactListView = Marionette.CollectionView.extend({
    tagName: "ul",
    className: "contact-list",
    itemView: ContactItemView
  });

  // Public API
  // ----------

  // Show the list of contacts.
  ContactList.show = function(contacts){
    var contactsView = new ContactListView({
      collection: contacts
    });
    BBCloneMail.layout.main.show(contactsView);
  }

});
