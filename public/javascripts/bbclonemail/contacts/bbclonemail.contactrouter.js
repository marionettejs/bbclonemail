BBCloneMail.module("ContactRouter", function(ContactRouter, App, Backbone, Marionette, $, _){

  // Contacts Router
  // -----------

  var Router = Backbone.Router.extend({
    routes: {
      "contacts": "showContacts",
    },

    before: function(){
      App.startSubApp("ContactsApp");
    },

    showContacts: function(){
      App.module("ContactsApp").showContacts();
    }
  });

  // Initializer / Finalizer
  // -----------------------

  ContactRouter.addInitializer(function(){
    var router = new Router();
  });

});
