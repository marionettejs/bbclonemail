BBCloneMail.module("Inbox", function(Inbox, App, Backbone, Marionette, $, _){

  // Router
  // ------

  var Router = Marionette.AppRouter.extend({
    appRoutes: {
      "": "showInbox"
    }
  });

  // Controller
  // ----------

  var InboxController = function(mainRegion){
    this.mainRegion = mainRegion;
  };

  _.extend(InboxController.prototype, {

    showInbox: function(){
      var that = this;
      var whenEmail = App.Mail.getInbox();

      whenEmail.done(function(email){
        App.execute("show:mail:list", email);
      });
    },

    showEmail: function(email){
      //var emailView = new EmailView({
      //  model: email
      //});

      //this.mainRegion.show(emailView);
    }

  });

  // Initializers
  // ------------
  
  Inbox.addInitializer(function(){
    Inbox.controller = new InboxController(App.main);
    new Router({
      controller: Inbox.controller
    });
  });

  Inbox.addFinalizer(function(){
    delete Inbox.controller;
  });
});
