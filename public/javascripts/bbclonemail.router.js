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
BBCloneMail.Routing = (function(BBCloneMail, Backbone){
  var Routing = {};

  // Router
  // ------

  // The router handles the incoming routes from the browser url, from
  // bookmarks, direct links and users typing directly in to the
  // url.
  Routing.Router = Backbone.Router.extend({
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

  // Updating The Current Route
  // --------------------------

  // The `showRoute` method is a private method used to update the 
  // url's hash fragment route. It accepts a base route and an 
  // unlimited number of optional parameters for the route: 
  // `showRoute("foo", "bar", "baz", "etc");`.
  var showRoute = function(base){
    var length = arguments.length;
    var route = base;

    if (length > 1){
      for(var i = 1; i < length; i++) {
        var arg = arguments[i];
        if (arg){
          route = route + "/" + arg;
        }
      }
    }

    // Note the `false` second parameter to the `navigate` call, 
    // ensuring the router does not fire it's callback method for 
    // the route we are showing.
    Routing.router.navigate(route, false);
  };

  // Show route for the mail app.
  BBCloneMail.vent.bind("mailApp:show", function(){
    showRoute("inbox");
  });

  // Show route for the email message display
  BBCloneMail.vent.bind("mail:message:show", function(message){
    showRoute("inbox", message.id);
  });

  // Show route for mail categories that are being displayed.
  BBCloneMail.vent.bind("mail:category:selected", function(category){
    showRoute("inbox", category);
  });

  // Show route for the contacts app
  BBCloneMail.vent.bind("contacts:show", function(){
    showRoute("contacts");
  });

  // Initialization
  // --------------

  // Initialize the router when the application starts
  BBCloneMail.addInitializer(function(){
    Routing.router = new Routing.Router();
  });

  return Routing;
})(BBCloneMail, Backbone);
