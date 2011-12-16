BBCloneMail.MailApp = (function(BBCloneMail, Backbone){
  var MailApp = {};

  MailApp.Email = Backbone.Model.extend({});

  MailApp.EmailCollection = Backbone.Collection.extend({
    model: MailApp.Email
  });

  MailApp.show = function(){
    BBCloneMail.mainRegion.show(new BBCloneMail.MailApp.MailBox({
      collection: MailApp.emailList
    }));

    BBCloneMail.navigationRegion.show(new BBCloneMail.MailApp.Categories());

    BBCloneMail.showRoute("inbox");
    BBCloneMail.AppSelection.showSelection("mail");
  };

  BBCloneMail.addInitializer(function(options){
    MailApp.emailList = new MailApp.EmailCollection(options.email);
  });
  
  return MailApp;
})(BBCloneMail, Backbone);
