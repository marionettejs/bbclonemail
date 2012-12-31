BBCloneMail = (function(Backbone, Marionette){
  "use strict";

  var App = new Marionette.Application();

  App.addRegions({
    nav: "#navigation",
    main: "#main"
  });

  App.on("initialize:after", function(){
    if (Backbone.history){
      Backbone.history.start();
    }
  });

  App.startSubApp = function(appName){
    var currentApp = App.module(appName);
    if (App.currentApp === currentApp){ return; }

    if (App.currentApp){
      App.currentApp.stop();
    }

    App.currentApp = currentApp;
    currentApp.start();
  };

  return App;
})(Backbone, Marionette);
