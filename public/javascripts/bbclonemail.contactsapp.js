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

// Manage the list of contacts and the categories for
// the contacts. Limited functionality at this point,
// but slowly adding more.
BBCloneMail.ContactsApp = (function(BBCloneMail, Backbone){
  var Contacts = {};

  // Contact Model And Collection
  // -----------------------------

  Contacts.Contact = Backbone.Model.extend({});

  Contacts.ContactCollection = Backbone.Collection.extend({
    model: Contacts.Contact
  });

  // Public API
  // ----------
  
  // Show the contact list and the categories.
  Contacts.show = function(){
    BBCloneMail.ContactsApp.ContactList.show(Contacts.contacts);
    BBCloneMail.ContactsApp.Categories.show();
    BBCloneMail.vent.trigger("contacts:show");
  };

  // Initializer
  // -----------
  
  BBCloneMail.addInitializer(function(options){
    Contacts.contacts = new Contacts.ContactCollection(options.contacts);
  });
  
  return Contacts;
})(BBCloneMail, Backbone);

