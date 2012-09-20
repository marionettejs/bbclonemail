BBCloneMail.module("ContactRouter", function(ContactRouter, App, Backbone, Marionette, $, _){

  // Contacts Router
  // -----------

  var Router = Backbone.Router.extend({
    routes: {
      "contacts": "showContacts",
    },

    showContacts: function(id){
      App.startSubApp("ContactsApp");
    }
  });

  // Initializer / Finalizer
  // -----------------------

  ContactRouter.addInitializer(function(){
    var router = new Router();
  });

});
