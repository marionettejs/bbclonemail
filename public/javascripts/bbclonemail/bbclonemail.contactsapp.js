BBCloneMail.module("ContactsApp", { 
  startWithApp: false,

  define: function(ContactsApp, App){
    "use strict";

    ContactsApp.addInitializer(function(){
      App.vent.trigger("app:started", "ContactsApp");
    });
  }
});
