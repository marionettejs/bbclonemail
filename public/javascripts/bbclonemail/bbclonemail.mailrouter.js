BBCloneMail.module("MailRouter", function(MailRouter, App, Backbone, Marionette, $, _){

  // Mail Router
  // -----------

  var Router = Backbone.Router.extend({
    routes: {
      "": "showInbox",
      "categories/:id": "showMailByCategory",
      "inbox/mail/:id": "showMailById"
    },

    // this uses https://github.com/boazsender/backbone.routefilter
    // to do filters around the route methods, and fire this method
    // "before" any route method is called.
    before: function(){
      App.startSubApp("MailApp");
    },

    showInbox: function(id){
      App.execute("show:inbox");
    },

    showMailByCategory: function(id){
      App.execute("show:category", id);
    },

    showMailById: function(id){
      App.execute("show:mail", id);
    }
  });

  // Initializer / Finalizer
  // -----------------------

  MailRouter.addInitializer(function(){
    var router = new Router();
  });

});
