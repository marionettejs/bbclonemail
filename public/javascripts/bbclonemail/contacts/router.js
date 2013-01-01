BBCloneMail.module("ContactsApp", {
  startWithParent: false,
  define: function(ContactsApp, App){

    // Contacts Router
    // -----------

    var Router = Backbone.Router.extend({
      routes: {
        "contacts": "showContacts",
      },

      // route filter before method
      // https://github.com/boazsender/backbone.routefilter
      before: function(){
        App.startSubApp("ContactsApp", {
          mainRegion: App.main,
          navRegion: App.nav,
          appSelectorRegion: App.appSelector
        });
      },

      showContacts: function(){
        App.ContactsApp.controller.showContacts();
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
