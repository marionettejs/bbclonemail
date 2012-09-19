BBCloneMail = (function(Backbone){
  var App = new Backbone.Marionette.Application();

  App.addRegions({
    nav: "#navigation",
    main: "#main"
  });

  App.on("initialize:after", function(){
    if (Backbone.history){
      Backbone.history.start();
    }
  });

  App.registerCommand("start:app", function(appName){
    if (App.currentApp){
      App.currentApp.stop();
    }

    var currentApp = App.module(appName);
    App.currentApp = currentApp;
    currentApp.start();
  });

  return App;
})(Backbone);
