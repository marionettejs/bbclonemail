BBCloneMail.module("MailApp", { 
  startWithApp: false,
  define: function(MailApp, App){
    MailApp.addInitializer(function(){
      App.vent.trigger("app:started", "MailApp");
    });
  }
});
