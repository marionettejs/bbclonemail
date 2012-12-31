BBCloneMail = (function(Backbone, Marionette){
  "use strict";

  var App = new Marionette.Application();

  App.addRegions({
    nav: "#navigation",
    main: "#main",
    appSelector: "#app-selector"
  });

  App.on("initialize:after", function(){
    if (Backbone.history){
      Backbone.history.start();
    }
  });

  App.startSubApp = function(appName, args){
    var currentApp = App.module(appName);
    if (App.currentApp === currentApp){ return; }

    if (App.currentApp){
      App.currentApp.stop();
    }

    App.currentApp = currentApp;
    currentApp.start(args);
  };

  return App;
})(Backbone, Marionette);
