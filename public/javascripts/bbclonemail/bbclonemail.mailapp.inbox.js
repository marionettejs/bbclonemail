BBCloneMail.module("MailApp.Inbox", function(Inbox, App, Backbone, Marionette, $, _){
  "use strict";

  // Controller
  // ----------

  var InboxController = function(mainRegion){
    this.mainRegion = mainRegion;
    $.resolve(this);
  };

  _.extend(InboxController.prototype, {

    // EXPERIMENTAL: show use of `$.resolve` function here, to get the
    // email list that needs to be displayed.
    showInbox: {
      resolve: "getEmail", 
      run: function(emailList){
        App.execute("show:mail:list", emailList);
      }
    },

    // EXPERIMENTAL: show use of `$.resolve` function here, to get the
    // email list and filter it down to the one that is needed.
    showMailById: {
      resolve: "getEmail", 
      run: function(id, emailList){
        var emailItem = emailList.get(id);
        App.execute("show:mail:item", emailItem);
      }
    },

    // EXPERIMENTAL: show use of `$.resolve` function here, to get the
    // email list by category
    showMailByCategory: {
      resolve: "getEmailByCategory", 
      run: function(categoryName, emailList){
        App.execute("show:mail:list", emailList);
      }
    },

    getEmail: function(callback){
      return App.request("mail:inbox");
    },

    getEmailByCategory: function(categoryName, callback){
      return App.request("mail:category", categoryName);
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
