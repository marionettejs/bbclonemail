// Backbone.BBCloneMail
// A reference application for Backbone.Marionette
//
// Copyright (C)2011 Derick Bailey, Muted Solutions, LLC
// Distributed Under MIT License
//
// Documentation and Full License Available at:
// http://github.com/derickbailey/backbone.bbclonemail
// http://github.com/derickbailey/backbone.marionette

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
