// Backbone.BBCloneMail
// A reference application for Backbone.Marionette
//
// Copyright (C)2011 Derick Bailey, Muted Solutions, LLC
// Distributed Under MIT License
//
// Documentation and Full License Available at:
// http://github.com/derickbailey/backbone.bbclonemail
// http://github.com/derickbailey/backbone.marionette

// Contacts List
// -------------

BBCloneMail.ContactsApp.ContactList = (function(BBCloneMail, Backbone){
  var ContactList = {};

  // Contact List Views
  // -------------

  ContactList.ContactItemView = BBCloneMail.ItemView.extend({
    tagName: "li",
    template: "#contact-item-template"
  });

  ContactList.ContactListView = BBCloneMail.CollectionView.extend({
    tagName: "ul",
    className: "contact-list",
    itemView: ContactList.ContactItemView
  });

  // Public API
  // ----------
  ContactList.show = function(contacts){
    var contactsView = new ContactList.ContactListView({
      collection: contacts
    });
    BBCloneMail.mainRegion.show(contactsView);
  }
  

  return ContactList;
})(BBCloneMail, Backbone);
