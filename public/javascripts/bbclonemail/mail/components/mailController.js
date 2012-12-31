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

      Marionette.Controller.prototype.constructor.call(this, options);
    },

    show: function(){
      this._showAppSelector("mail");
      this._showCategories();
    },

    _showAppSelector: function(appName){
      var appSelector = new App.AppSelector({
        region: this.appSelectorRegion,
        currentApp: appName
      });

      appSelector.show();
    },

    _showCategories: function(){
      var categoryNav = new App.MailApp.Navigation.Menu({
        region: this.navRegion
      });

      categoryNav.show();
    }

  });

});

