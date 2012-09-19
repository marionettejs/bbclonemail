BBCloneMail.module("AppLayout", function(AppLayout, App, Backbone, Marionette, $, _){

  // Views
  // -----

  AppLayout.Layout = Marionette.Layout.extend({
    events: {
      "change #app-selector": "appSelected"
    },

    appSelected: function(e){
      e.preventDefault();
      var appName = $(e.currentTarget).val();
      this.trigger("app:selected", appName);
    }
  });

  // Controller
  // ---------
  
  var LayoutController = function(){};

  _.extend(LayoutController.prototype, {

    start: function(){
      this.layout = new AppLayout.Layout({
        el: "section.content"
      });

      this.layout.on("app:selected", this.appSelected, this);
    },

    appSelected: function(appName){
      if (appName === "mail"){
        App.execute("start:mailApp");
      }
    }

  });

  // Initializer
  // -----------

  AppLayout.addInitializer(function(){
    AppLayout.controller = new LayoutController();
    AppLayout.controller.start();
  });

});
