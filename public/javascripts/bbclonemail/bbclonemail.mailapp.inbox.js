BBCloneMail.module("MailApp.Inbox", function(Inbox, App, Backbone, Marionette, $, _){

  // Router
  // ------

  var Router = Marionette.AppRouter.extend({
    appRoutes: {
      "": "showInbox",
      "categories/:id": "showMailByCategory",
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
      Backbone.history.navigate("");
      this.getEmail(function(emailList){
        var emailItem = emailList.get(id);
        App.execute("show:mail:item", emailItem);
      });
    },

    showMailByCategory: function(categoryName){
      Backbone.history.navigate("categories/" + categoryName);
      this.getEmailByCategory(categoryName, function(emailList){
        App.execute("show:mail:list", emailList);
      });
    },

    getEmail: function(callback){
      var emailLoaded = App.request("mail:inbox");
      $.when(emailLoaded).then(callback);
    },

    getEmailByCategory: function(categoryName, callback){
      var emailLoaded = App.request("mail:category", categoryName);
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

    App.registerCommand("show:category", controller.showMailByCategory, controller);

    Inbox.controller = controller;
    Inbox.router = router;
  });

  Inbox.addFinalizer(function(){
    delete Inbox.controller;
    delete Inbox.router;
  });
});
