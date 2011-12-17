// Backbone.BBCloneMail
// A reference application for Backbone.Marionette
//
// Copyright (C)2011 Derick Bailey, Muted Solutions, LLC
// Distributed Under MIT License
//
// Documentation and Full License Available at:
// http://github.com/derickbailey/backbone.bbclonemail
// http://github.com/derickbailey/backbone.marionette

// Router
// ------

// The router callbacks are only fired when the url hash is
// directly hit, either by bookmark or manually changing
// the hash. 
//
// Also note that the router is as dumb as possible. It only
// calls out to other sub-app controlling objects, and lets
// those objects do the real work.
BBCloneMail.Router = Backbone.Router.extend({
  routes: {
    "": "mail",
    "inbox": "mail",
    "inbox/:category": "mailCategory",
    "contacts": "contacts",
  },

  mail: function(){
    BBCloneMail.MailApp.show();
  },

  mailCategory: function(category){
    BBCloneMail.MailApp.show(category);
  },

  contacts: function(){
    BBCloneMail.ContactsApp.show();
  }
});

// Used to update the url's hash fragment route. Note the
// `false` second parameter, ensuring the router does not
// fire it's callback method for the route we are showing
BBCloneMail.showRoute = function(route){
  BBCloneMail.router.navigate(route, false);
};

// Initialize the router when the application starts
BBCloneMail.addInitializer(function(){
  BBCloneMail.router = new BBCloneMail.Router();
});
