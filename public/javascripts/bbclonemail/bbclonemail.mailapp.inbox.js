BBCloneMail.module("MailApp.Inbox", function(Inbox, App, Backbone, Marionette, $, _){
  "use strict";

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
    Inbox.controller = new InboxController(App.main);
  });

  Inbox.addFinalizer(function(){
    delete Inbox.controller;
  });

});
