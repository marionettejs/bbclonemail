BBCloneMail.module("MailApp.Inbox", {
  startWithApp: false,
  define: function(Inbox, App, Backbone, Marionette, $, _){

    // Controller
    // ----------

    var InboxController = function(mainRegion){
      this.mainRegion = mainRegion;
    };

    _.extend(InboxController.prototype, {

      showInbox: function(){
        var that = this;
        Backbone.history.navigate("");
        this.getEmail(function(emailList){
          App.execute("show:mail:list", emailList);
        });
      },

      showMailById: function(id){
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
      App.registerCommand("show:inbox", controller.showInbox, controller);
      App.registerCommand("show:mail", controller.showMailById, controller);
      App.registerCommand("show:category", controller.showMailByCategory, controller);

      controller.showInbox();
    });

    Inbox.addFinalizer(function(){
      App.removeCommand("show:inbox");
      App.removeCommand("show:mail");
      App.removeCommand("show:category");
    });

  }
});
