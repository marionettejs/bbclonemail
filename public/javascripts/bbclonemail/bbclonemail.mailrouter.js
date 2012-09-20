BBCloneMail.module("MailRouter", function(MailRouter, App, Backbone, Marionette, $, _){

  // Mail Router
  // -----------

  var Router = Backbone.Router.extend({
    routes: {
      "": "showInbox",
      "categories/:id": "showMailByCategory",
      "inbox/mail/:id": "showMailById"
    },

    showInbox: function(id){
      App.startSubApp("MailApp");
      App.execute("show:inbox");
    },

    showMailByCategory: function(id){
      App.startSubApp("MailApp");
      App.execute("show:category", id);
    },

    showMailById: function(id){
      App.startSubApp("MailApp");
      App.execute("show:mail", id);
    }
  });

  // Initializer / Finalizer
  // -----------------------

  MailRouter.addInitializer(function(){
    console.log("starting the mail router");
    var router = new Router();
  });

});
