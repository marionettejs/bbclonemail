BBCloneMail.module("MailRouter", function(MailRouter, App, Backbone, Marionette, $, _){
  "use strict";

  // Mail Router
  // -----------

  var Router = Backbone.Router.extend({
    routes: {
      "": "showInbox",
      "mail": "showInbox",
      "mail/categories/:id": "showMailByCategory",
      "mail/inbox/mail/:id": "showMailById"
    },

    // this uses https://github.com/boazsender/backbone.routefilter
    // to do filters around the route methods, and fire this method
    // "before" any route method is called.
    before: function(){
      App.startSubApp("MailApp");
    },

    showInbox: function(){
      App.MailApp.Inbox.controller.showInbox();
    },

    showMailByCategory: function(id){
      App.MailApp.Inbox.controller.showMailByCategory(id);
    },

    showMailById: function(id){
      App.MailApp.Inbox.controller.showMailById(id);
    }
  });

  // Initializer / Finalizer
  // -----------------------

  MailRouter.addInitializer(function(){
    var router = new Router();
  });

});
