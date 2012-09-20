BBCloneMail.module("ContactsApp", { 
  startWithApp: false,

  define: function(ContactsApp, App){
    ContactsApp.addInitializer(function(){
      App.vent.trigger("app:started", "ContactsApp");
    });
  }
});
