BBCloneMail.module("MailApp", { 
  startWithParent: false,
  define: function(MailApp, App){
    "use strict";

    // Controller
    // ----------

    MailApp.Controller = MailApp.Components.MailController.extend({
      
      showInbox: function(){
        console.log('show inbox');
      },

      showMailById: function(){
      },

      showMailByCategory: function(){
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
