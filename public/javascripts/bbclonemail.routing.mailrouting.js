// Backbone.BBCloneMail
// A reference application for Backbone.Marionette
//
// Copyright (C)2011 Derick Bailey, Muted Solutions, LLC
// Distributed Under MIT License
//
// Documentation and Full License Available at:
// http://github.com/derickbailey/backbone.bbclonemail
// http://github.com/derickbailey/backbone.marionette

// Mail Routing
// ------------

// Handle all of the routing needs related to mail
BBCloneMail.Routing.MailRouting = (function(BBCloneMail, Backbone){
  var MailRouting = {};

  // Router
  // ------

  // The mail router handles the incoming routes from the browser url, from
  // bookmarks, direct links and users typing directly in to the url.
  //
  // The router callbacks are only fired when the url hash is
  // directly hit, either by bookmark or manually changing
  // the hash. 
  //
  // Also note that the router is as dumb as possible. It only
  // calls out to other sub-app controlling objects, and lets
  // those objects do the real work.
  MailRouting.Router = BBCloneMail.Routing.AppRouter.extend({
    appRoutes: {
      "": "showInbox",
      "inbox": "showInbox",
      "inbox/categories/:category": "showCategory",
      "inbox/:id": "showMessage"
    }
  });

  // Show route for the mail app.
  BBCloneMail.vent.bind("mail:show", function(){
    BBCloneMail.Routing.showRoute("inbox");
  });

  // Show route for the email message display
  BBCloneMail.vent.bind("mail:message:show", function(message){
    BBCloneMail.Routing.showRoute("inbox", message.id);
  });

  // Show route for mail categories that are being displayed.
  BBCloneMail.vent.bind("mail:category:show", function(category){
    BBCloneMail.Routing.showRoute("inbox", "categories", category);
  });

  // Initialization
  // --------------

  // Initialize the router when the application starts
  BBCloneMail.addInitializer(function(){
    MailRouting.router = new MailRouting.Router({
      app: BBCloneMail.MailApp
    });
  });

  return MailRouting;
})(BBCloneMail, Backbone);
