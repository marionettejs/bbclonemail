// Backbone.BBCloneMail
// A reference application for Backbone.Marionette
//
// Copyright (C)2012 Derick Bailey, Muted Solutions, LLC
// Distributed Under MIT License
//
// Documentation and Full License Available at:
// http://github.com/derickbailey/backbone.bbclonemail
// http://github.com/derickbailey/backbone.marionette

// Contacts Routing
// ------------

// Handle all of the routing needs related to contacts
BBCloneMail.Routing.ContactsRouting = (function(BBCloneMail, Backbone){
  var ContactsRouting = {};

  // Router
  // ------

  // The contacts router handles the incoming routes from the browser url, from
  // bookmarks, direct links and users typing directly in to the url.
  //
  // The router callbacks are only fired when the url hash is
  // directly hit, either by bookmark or manually changing
  // the hash. 
  //
  // Also note that the router is as dumb as possible. It only
  // calls out to other sub-app controlling objects, and lets
  // those objects do the real work.
  ContactsRouting.Router = Backbone.Marionette.AppRouter.extend({
    appRoutes: {
      "contacts": "showContactList"
    }
  });

  // Show route for the contacts app
  BBCloneMail.vent.bind("contacts:show", function(){
    BBCloneMail.Routing.showRoute("contacts");
  });

  // Initialization
  // --------------

  // Initialize the router when the application starts
  BBCloneMail.addInitializer(function(){
    ContactsRouting.router = new ContactsRouting.Router({
      controller: BBCloneMail.ContactsApp
    });
  });

  return ContactsRouting;
})(BBCloneMail, Backbone);

