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

      // route filter before method
      // https://github.com/boazsender/backbone.routefilter
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

      showMailByCategory: function(category){
        App.MailApp.controller.showMailByCategory(category);
      }
    });

    // Initializer
    // -----------
    //
    // The router must always be alive with the app, so that it can
    // respond to route changes and start up the right sub-app 
    App.addInitializer(function(){
      var router = new Router();
    });
  }
});
