BBCloneMail.Router = Backbone.Router.extend({
  routes: {
    "": "mail",
    "inbox": "mail",
    "contacts": "contacts",
  },

  mail: function(){
    BBCloneMail.MailApp.show();
  },

  contacts: function(){
    BBCloneMail.ContactsApp.show();
  }
});

BBCloneMail.addInitializer(function(){
  new BBCloneMail.Router();
});
