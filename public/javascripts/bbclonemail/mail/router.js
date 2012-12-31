BBCloneMail.module("MailApp", {
  startWithParent: false,

  define: function(MailApp, App, Backbone, Marionette, $, _){
    "use strict";

    // Mail Router
    // -----------

    var Router = Backbone.Router.extend({
      routes: {
        "": "showInbox",
        "mail": "showInbox",
        "mail/categories/:id": "showMailByCategory",
        "mail/inbox/:id": "showMailById"
      },

      // this uses https://github.com/boazsender/backbone.routefilter
      // to do filters around the route methods, and fire this method
      // "before" any route method is called.
      before: function(){
        App.startSubApp("MailApp", {
          mainRegion: App.main,
          navRegion: App.nav,
          appSelectorRegion: App.appSelector
        });
      },

      showInbox: function(){
        App.MailApp.controller.showInbox();
      },

      showMailById: function(id){
        App.MailApp.controller.showMailById(id);
      },

      showMailByCategory: function(id){
        App.MailApp.controller.showMailByCategory(id);
      }
    });

    // Initializer / Finalizer
    // -----------------------

    App.addInitializer(function(){
      var router = new Router();
    });

  }
});
