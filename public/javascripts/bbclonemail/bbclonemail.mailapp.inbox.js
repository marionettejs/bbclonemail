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
      this.getEmail(function(emailList){
        App.execute("show:mail:list", emailList);
      });
    },

    showMailById: function(id){
      var that = this;
      this.getEmail(function(emailList){
        var emailItem = emailList.get(id);
        App.execute("show:mail:item", emailItem);
      });
    },

    getEmail: function(callback){
      var emailLoaded = App.request("mail:inbox");
      $.when(emailLoaded).then(callback);
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
