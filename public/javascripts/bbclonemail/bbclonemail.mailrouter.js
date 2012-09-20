BBCloneMail.module("MailRouter", function(MailRouter, App, Backbone, Marionette, $, _){

  // Mail Router
  // -----------

  var Router = Marionette.AppRouter.extend({
    appRoutes: {
      "": "showInbox",
      "categories/:id": "showMailByCategory",
      "inbox/mail/:id": "showMailById"
    }
  });

  // Controller
  // ----------

  var Controller = function(){};

  _.extend(Controller.prototype, {
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
    var controller = new Controller(App.main);
    var router = new Router({
      controller: controller
    });
  });

});
