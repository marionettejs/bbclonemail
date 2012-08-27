BBCloneMail.module("MailApp.Inbox", function(Inbox, App, Backbone, Marionette, $, _){

  // Router
  // ------

  var Router = Marionette.AppRouter.extend({
    appRoutes: {
      "": "showInbox",
      "inbox/mail/:id": "showMailById"
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
      var whenEmail = App.MailApp.Mail.getInbox();

      whenEmail.done(function(email){
        App.execute("show:mail:list", email);
      });
    },

    showMailById: function(id){
      var that = this;
      var whenEmail = App.MailApp.Mail.getInbox();

      whenEmail.done(function(emailList){
        var emailItem = emailList.get(id);
        App.execute("show:mail:item", emailItem);
      });
    }

  });

  // Initializers
  // ------------
  
  Inbox.addInitializer(function(){
    var controller = new InboxController(App.main);

    var router = new Router({
      controller: controller
    });

    Inbox.controller = controller;
    Inbox.router = router;
  });

  Inbox.addFinalizer(function(){
    delete Inbox.controller;
    delete Inbox.router;
  });
});
