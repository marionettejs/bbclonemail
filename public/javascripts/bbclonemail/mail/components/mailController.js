BBCloneMail.module("MailApp.Components", function(Components, App){
  "use strict";

  // Controller
  // ----------

  Components.MailController = Marionette.Controller.extend({
    
    constructor: function(options){
      options = options || {};

      this.mainRegion = options.mainRegion;
      this.navRegion = options.navRegion;
      this.appSelectorRegion = options.appSelectorRegion;

      _.bindAll(this, "showMail", "showMailList");

      Marionette.Controller.prototype.constructor.call(this, options);
    },

    // show this component in the app
    show: function(){
      this._showAppSelector("mail");
      this._showCategories();
    },

    // show a single email in the app
    showMail: function(email){
      var viewer = new App.MailApp.Mailboxes.MailViewer({
        region: this.mainRegion,
        email: email
      });

      this._showComponent(viewer);
    },

    // show a list of email in the apps - the inbox, 
    // or a category, for example
    showMailList: function(emailList){
      var inbox = new App.MailApp.Mailboxes.Inbox({
        region: this.mainRegion,
        email: emailList
      });

      // when an email is selected, show it
      inbox.on("email:selected", function(email){
        this.showMail(email);
      }, this);

      this._showComponent(inbox);
    },

    // show the specified component, closing any currently
    // displayed component before showing the new one
    _showComponent: function(component){
      if (this._currentComponent){
        this._currentComponent.close();
      }

      component.show();
      this._currentComponent = component;
    },

    // Show the app selector drop down list, which allows
    // the app to be changed from mail app to contacts app
    _showAppSelector: function(appName){
      var appSelector = new App.AppSelector({
        region: this.appSelectorRegion,
        currentApp: appName
      });

      appSelector.show();
    },

    // show the list of categories for the mail app
    _showCategories: function(){
      var categoryNav = new App.MailApp.Navigation.Menu({
        region: this.navRegion
      });

      categoryNav.show();
    }

  });

});

