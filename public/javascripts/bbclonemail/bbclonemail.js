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

  App.startSubApp = function(appName){
    if (App.currentApp){
      App.currentApp.stop();
    }

    var currentApp = App.module(appName);
    App.currentApp = currentApp;
    currentApp.start();
  };

  App.registerCommand("start:app", App.startSubApp, App);

  return App;
})(Backbone);
