// AppController
// --------------
//
// A base controller object to hide a lot of the 
// guts and implementation detail of showing the
// lists and individual items

BBCloneMail.AppController = (function(App, Marionette){
  "use strict";

  var AppController = Marionette.Controller.extend({
    constructor: function(options){
      options = options || {};

      this.mainRegion = options.mainRegion;
      this.navRegion = options.navRegion;
      this.appSelectorRegion = options.appSelectorRegion;

      Marionette.Controller.prototype.constructor.call(this, options);
    },

    // show this component in the app
    show: function(){
      this._showAppSelector("mail");
      Marionette.triggerMethod.call(this, "show");
    },

    // show the specified component, closing any currently
    // displayed component before showing the new one
    showComponent: function(component){
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
    }
  });

  return AppController;
})(BBCloneMail, Marionette);
