BBCloneMail.module("MailApp", { 
  startWithParent: false,
  define: function(MailApp, App){
    "use strict";

    MailApp.addInitializer(function(){
      App.vent.trigger("app:started", "MailApp");
    });
  }
});
