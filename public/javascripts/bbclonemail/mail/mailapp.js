BBCloneMail.module("MailApp", { 
  startWithParent: false,
  define: function(MailApp, App){
    "use strict";

    // Controller
    // ----------

    MailApp.Controller = MailApp.Components.MailController.extend({
      
      showInbox: function(){
        var mailbox = new MailApp.Mail.Mailbox();
        $.when(mailbox.getAll())
          .then(this.showMailList);
      },

      showMailById: function(id){
        var mailbox = new MailApp.Mail.Mailbox();
        $.when(mailbox.getById(id))
          .then(this.showMail);
      },

      showMailByCategory: function(category){
        var mailbox = new MailApp.Mail.Mailbox();
        $.when(mailbox.getByCategory(category))
          .then(this.showMailList);
      },

    });

    // Initializers
    // ------------

    MailApp.addInitializer(function(args){
      MailApp.controller = new MailApp.Controller({
        mainRegion: args.mainRegion,
        navRegion: args.navRegion,
        appSelectorRegion: args.appSelectorRegion
      });

      MailApp.controller.show();
    });

    MailApp.addFinalizer(function(){
      if (MailApp.controller){
        MailApp.controller.close();
        delete MailApp.controller;
      }
    });
  }
});
