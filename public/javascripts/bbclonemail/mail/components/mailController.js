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
      this.showAppSelector("mail");
    },

    // show the app selector component in the app selector region
    showAppSelector: function(appName){
      var appSelector = new App.AppSelector({
        region: this.appSelectorRegion,
        currentApp: appName
      });

      appSelector.show();
    }

  });

});

