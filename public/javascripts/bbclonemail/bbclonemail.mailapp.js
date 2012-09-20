BBCloneMail.module("MailApp", { 
  startWithApp: false,
  define: function(MailApp, App){
    "use strict";

    MailApp.addInitializer(function(){
      App.vent.trigger("app:started", "MailApp");
    });
  }
});
