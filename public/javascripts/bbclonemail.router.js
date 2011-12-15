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

BBCloneMail.showRoute = function(route){
  BBCloneMail.router.navigate(route, false);
};


BBCloneMail.addInitializer(function(){
  BBCloneMail.router = new BBCloneMail.Router();
});
