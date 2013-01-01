BBCloneMail.module("MailApp", function(MailApp, App){
  "use strict";

  // Controller
  // ----------

  MailApp.Controller = App.AppController.extend({
    initialize: function(){
      _.bindAll(this, "_showMail", "_showMailList");
    },
    
    showInbox: function(){
      var mailbox = new MailApp.Mail.Mailbox();
      $.when(mailbox.getAll())
        .then(this._showMailList);

      Backbone.history.navigate("#mail");
    },

    showMailById: function(id){
      var mailbox = new MailApp.Mail.Mailbox();
      $.when(mailbox.getById(id))
        .then(this._showMail);
    },

    showMailByCategory: function(category){
      var mailbox = new MailApp.Mail.Mailbox();
      $.when(mailbox.getByCategory(category))
        .then(this._showMailList);

      Backbone.history.navigate("#mail/categories/" + category);
    },

    onShow: function(){
      this._showCategories();
    },

    // show the list of categories for the mail app
    _showCategories: function(){
      var categoryNav = new App.MailApp.Navigation.Menu({
        region: this.navRegion
      });

      this.listenTo(categoryNav, "category:selected", this._categorySelected);

      categoryNav.show();
    },

    _categorySelected: function(category){
      if (category){
        this.showMailByCategory(category);
      } else {
        this.showInbox();
      }
    },

    // show a single email in the app
    _showMail: function(email){
      var viewer = new App.MailApp.Mailboxes.MailViewer({
        region: this.mainRegion,
        email: email
      });

      this.showComponent(viewer);

      Backbone.history.navigate("#mail/inbox/" + email.id);
    },

    // show a list of email in the apps - the inbox, 
    // or a category, for example
    _showMailList: function(emailList){
      var inbox = new App.MailApp.Mailboxes.Inbox({
        region: this.mainRegion,
        email: emailList
      });

      // when an email is selected, show it
      inbox.on("email:selected", function(email){
        this._showMail(email);
      }, this);

      this.showComponent(inbox);
    }
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
    App.vent.trigger("app:started", "mail");
  });

  MailApp.addFinalizer(function(){
    if (MailApp.controller){
      MailApp.controller.close();
      delete MailApp.controller;
    }
  });

});
